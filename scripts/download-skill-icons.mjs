import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const skillsFilePath = path.resolve(process.cwd(), "src/data/model/Skills.ts");
const outputDirectoryArg = process.argv[2] ?? "public/skills";
const outputDirectoryPath = path.resolve(process.cwd(), outputDirectoryArg);

function parseSkills(fileContents) {
    const skillsBlockMatch = fileContents.match(/const skills = \[([\s\S]*?)\] as const;/);

    if (!skillsBlockMatch) {
        throw new Error("Could not find the skills array in src/data/model/Skills.ts.");
    }

    const skills = [...skillsBlockMatch[1].matchAll(/"([^"]+)"/g)].map(([, skillName]) => skillName);

    if (skills.length === 0) {
        throw new Error("No skills were found in src/data/model/Skills.ts.");
    }

    return skills;
}

function getSkillSlug(skillName) {
    return skillName.replace(/\s+/g, "_");
}

function getSkillImageUrl(skillName) {
    return `https://oldschool.runescape.wiki/images/${encodeURIComponent(getSkillSlug(skillName))}_icon_%28detail%29.png`;
}

async function downloadSkillIcon(skillName) {
    const response = await fetch(getSkillImageUrl(skillName));

    if (!response.ok) {
        throw new Error(`Received ${response.status} ${response.statusText}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const outputFilePath = path.join(outputDirectoryPath, `${getSkillSlug(skillName)}.png`);

    await writeFile(outputFilePath, imageBuffer);

    return outputFilePath;
}

async function main() {
    const skillsFileContents = await readFile(skillsFilePath, "utf8");
    const skills = parseSkills(skillsFileContents);

    await mkdir(outputDirectoryPath, { recursive: true });

    const failures = [];

    for (const skillName of skills) {
        try {
            const outputFilePath = await downloadSkillIcon(skillName);
            console.log(`Downloaded ${skillName} -> ${path.relative(process.cwd(), outputFilePath)}`);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            failures.push({ skillName, message });
            console.error(`Failed ${skillName}: ${message}`);
        }
    }

    if (failures.length > 0) {
        throw new Error(`Failed to download ${failures.length} skill icon(s).`);
    }

    console.log(`Downloaded ${skills.length} skill icon(s) to ${path.relative(process.cwd(), outputDirectoryPath)}`);
}

await main();