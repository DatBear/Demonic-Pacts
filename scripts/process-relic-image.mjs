import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const defaultInputPath = "public/relics/T6_Culling_Spree.png";
const [, , inputArg, outputArg, sizeArg] = process.argv;

const inputPath = path.resolve(process.cwd(), inputArg ?? defaultInputPath);
const outputPath = path.resolve(process.cwd(), outputArg ?? inputArg ?? defaultInputPath);
const outputSize = Number.parseInt(sizeArg ?? "60", 10);

if (!Number.isInteger(outputSize) || outputSize <= 0) {
    throw new Error("Image size must be a positive integer.");
}

function isEdgeMattePixel(buffer, width, x, y) {
    const pixelIndex = (y * width + x) * 4;
    const red = buffer[pixelIndex];
    const green = buffer[pixelIndex + 1];
    const blue = buffer[pixelIndex + 2];
    const alpha = buffer[pixelIndex + 3];
    const average = (red + green + blue) / 3;
    const channelRange = Math.max(red, green, blue) - Math.min(red, green, blue);

    return alpha > 0 && average >= 180 && channelRange <= 14;
}

function clearEdgeMatte(buffer, width, height) {
    const queue = [];
    const visited = new Uint8Array(width * height);

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

        if (!isEdgeMattePixel(buffer, width, x, y)) {
            continue;
        }

        const pixelIndex = (y * width + x) * 4;
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

    return buffer;
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