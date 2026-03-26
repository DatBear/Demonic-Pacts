import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const fixedInputPath = "public/relics/image.png";
const [, , outputArg, sizeArg] = process.argv;

if (!outputArg) {
    throw new Error("Output path is required. Usage: node scripts/process-relic-image.mjs <output> [size]");
}

const inputPath = path.resolve(process.cwd(), fixedInputPath);
const outputPath = path.resolve(process.cwd(), outputArg);
const outputSize = Number.parseInt(sizeArg ?? "60", 10);

if (!Number.isInteger(outputSize) || outputSize <= 0) {
    throw new Error("Image size must be a positive integer.");
}

function getPixelOffset(width, x, y) {
    return (y * width + x) * 4;
}

function getPixel(buffer, width, x, y) {
    const pixelIndex = getPixelOffset(width, x, y);

    return {
        red: buffer[pixelIndex],
        green: buffer[pixelIndex + 1],
        blue: buffer[pixelIndex + 2],
        alpha: buffer[pixelIndex + 3],
    };
}

function isEdgeMattePixel(buffer, width, x, y) {
    const { red, green, blue, alpha } = getPixel(buffer, width, x, y);
    const average = (red + green + blue) / 3;
    const channelRange = Math.max(red, green, blue) - Math.min(red, green, blue);

    return alpha > 0 && average >= 180 && channelRange <= 14;
}

function getDominantEdgePixels(buffer, width, height) {
    const samples = new Map();

    const samplePixel = pixel => {
        if (pixel.alpha === 0) {
            return;
        }

        const key = [pixel.red, pixel.green, pixel.blue].map(channel => Math.round(channel / 16) * 16).join(",");
        const existing = samples.get(key);

        if (existing) {
            existing.count += 1;
            existing.red += pixel.red;
            existing.green += pixel.green;
            existing.blue += pixel.blue;
            return;
        }

        samples.set(key, {
            count: 1,
            red: pixel.red,
            green: pixel.green,
            blue: pixel.blue,
        });
    };

    for (let x = 0; x < width; x += 1) {
        samplePixel(getPixel(buffer, width, x, 0));
        samplePixel(getPixel(buffer, width, x, height - 1));
    }

    for (let y = 1; y < height - 1; y += 1) {
        samplePixel(getPixel(buffer, width, 0, y));
        samplePixel(getPixel(buffer, width, width - 1, y));
    }

    return [...samples.values()]
        .sort((leftSample, rightSample) => rightSample.count - leftSample.count)
        .slice(0, 6)
        .map(sample => ({
            red: Math.round(sample.red / sample.count),
            green: Math.round(sample.green / sample.count),
            blue: Math.round(sample.blue / sample.count),
            alpha: 255,
        }));
}

function colorDistance(leftPixel, rightPixel) {
    return Math.abs(leftPixel.red - rightPixel.red)
        + Math.abs(leftPixel.green - rightPixel.green)
        + Math.abs(leftPixel.blue - rightPixel.blue);
}

function isNeutralPixel(pixel) {
    const channelRange = Math.max(pixel.red, pixel.green, pixel.blue) - Math.min(pixel.red, pixel.green, pixel.blue);
    return channelRange <= 28;
}

function isBackgroundLikePixel(pixel, referencePixels) {
    if (pixel.alpha === 0 || referencePixels.length === 0) {
        return false;
    }

    const averageBrightness = (pixel.red + pixel.green + pixel.blue) / 3;
    const bestReferenceDistance = Math.min(...referencePixels.map(referencePixel => colorDistance(pixel, referencePixel)));

    if (bestReferenceDistance <= 42) {
        return true;
    }

    if (bestReferenceDistance <= 72 && averageBrightness >= 30 && isNeutralPixel(pixel)) {
        return true;
    }

    return false;
}

function clearSmallOpaqueComponents(buffer, width, height) {
    const visited = new Uint8Array(width * height);
    const components = [];
    const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const index = y * width + x;
            if (visited[index]) {
                continue;
            }

            visited[index] = 1;

            if (getPixel(buffer, width, x, y).alpha === 0) {
                continue;
            }

            const queue = [[x, y]];
            const pixels = [];

            while (queue.length > 0) {
                const [currentX, currentY] = queue.shift();
                pixels.push([currentX, currentY]);

                for (const [offsetX, offsetY] of neighbors) {
                    const nextX = currentX + offsetX;
                    const nextY = currentY + offsetY;

                    if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
                        continue;
                    }

                    const nextIndex = nextY * width + nextX;
                    if (visited[nextIndex]) {
                        continue;
                    }

                    visited[nextIndex] = 1;

                    if (getPixel(buffer, width, nextX, nextY).alpha === 0) {
                        continue;
                    }

                    queue.push([nextX, nextY]);
                }
            }

            components.push(pixels);
        }
    }

    if (components.length <= 1) {
        return buffer;
    }

    const largestComponent = components.reduce((largestPixels, currentPixels) => currentPixels.length > largestPixels.length ? currentPixels : largestPixels, []);
    const keep = new Set(largestComponent.map(([x, y]) => `${x},${y}`));

    for (const pixels of components) {
        for (const [x, y] of pixels) {
            if (keep.has(`${x},${y}`)) {
                continue;
            }

            const pixelIndex = getPixelOffset(width, x, y);
            buffer[pixelIndex + 3] = 0;
        }
    }

    return buffer;
}

function clearEdgeMatte(buffer, width, height) {
    const queue = [];
    const visited = new Uint8Array(width * height);
    const backgroundReferencePixels = getDominantEdgePixels(buffer, width, height);

    const enqueue = (x, y) => {
        const index = y * width + x;

        if (visited[index]) {
            return;
        }

        visited[index] = 1;
        queue.push([x, y]);
    };

    for (let x = 0; x < width; x += 1) {
        enqueue(x, 0);
        enqueue(x, height - 1);
    }

    for (let y = 1; y < height - 1; y += 1) {
        enqueue(0, y);
        enqueue(width - 1, y);
    }

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        const pixel = getPixel(buffer, width, x, y);

        if (pixel.alpha === 0) {
            continue;
        }

        if (!isEdgeMattePixel(buffer, width, x, y) && !isBackgroundLikePixel(pixel, backgroundReferencePixels)) {
            continue;
        }

        const pixelIndex = getPixelOffset(width, x, y);
        buffer[pixelIndex + 3] = 0;

        if (x > 0) {
            enqueue(x - 1, y);
        }
        if (x < width - 1) {
            enqueue(x + 1, y);
        }
        if (y > 0) {
            enqueue(x, y - 1);
        }
        if (y < height - 1) {
            enqueue(x, y + 1);
        }
    }

    return clearSmallOpaqueComponents(buffer, width, height);
}

const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

const processedImageBuffer = await sharp(clearEdgeMatte(data, info.width, info.height), {
    raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
    },
})
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(outputSize, outputSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

await writeFile(outputPath, processedImageBuffer);

console.log(`Processed ${inputPath} -> ${outputPath} (${outputSize}x${outputSize})`);