import { writeFile } from "node:fs/promises";

const taskSourceUrl = "https://oldschool.runescape.wiki/api.php?action=parse&page=Raging_Echoes_League/Tasks&prop=wikitext&format=json";

const difficultyPoints = {
    easy: 10,
    medium: 40,
    hard: 80,
    elite: 200,
    master: 400,
};

const regionShortCodes = {
    General: "GEN",
    Asgarnia: "ASG",
    Desert: "DES",
    Fremennik: "FRE",
    Kandarin: "KAN",
    Karamja: "KAR",
    Kourend: "KOU",
    Misthalin: "MIS",
    Morytania: "MOR",
    Tirannwn: "TIR",
    Varlamore: "VAR",
    Wilderness: "WIL",
};

const knownRegions = Object.keys(regionShortCodes);

const validSkills = new Set([
    "Attack",
    "Strength",
    "Defence",
    "Ranged",
    "Prayer",
    "Magic",
    "Runecraft",
    "Construction",
    "Hitpoints",
    "Agility",
    "Herblore",
    "Thieving",
    "Crafting",
    "Fletching",
    "Slayer",
    "Hunter",
    "Mining",
    "Smithing",
    "Fishing",
    "Cooking",
    "Firemaking",
    "Woodcutting",
    "Farming",
]);

const extractTemplates = (source, prefix) => {
    const templates = [];
    let searchIndex = 0;

    while (searchIndex < source.length) {
        const startIndex = source.indexOf(prefix, searchIndex);
        if (startIndex === -1) {
            break;
        }

        let depth = 0;
        let cursor = startIndex;

        while (cursor < source.length) {
            const pair = source.slice(cursor, cursor + 2);
            if (pair === "{{") {
                depth += 1;
                cursor += 2;
                continue;
            }

            if (pair === "}}") {
                depth -= 1;
                cursor += 2;
                if (depth === 0) {
                    templates.push(source.slice(startIndex, cursor));
                    searchIndex = cursor;
                    break;
                }
                continue;
            }

            cursor += 1;
        }

        if (cursor >= source.length) {
            throw new Error(`Unclosed template starting at index ${startIndex}`);
        }
    }

    return templates;
};

const splitTopLevel = value => {
    const parts = [];
    let current = "";
    let templateDepth = 0;
    let linkDepth = 0;

    for (let idx = 0; idx < value.length; idx += 1) {
        const pair = value.slice(idx, idx + 2);

        if (pair === "{{") {
            templateDepth += 1;
            current += pair;
            idx += 1;
            continue;
        }

        if (pair === "}}") {
            templateDepth = Math.max(0, templateDepth - 1);
            current += pair;
            idx += 1;
            continue;
        }

        if (pair === "[[") {
            linkDepth += 1;
            current += pair;
            idx += 1;
            continue;
        }

        if (pair === "]]") {
            linkDepth = Math.max(0, linkDepth - 1);
            current += pair;
            idx += 1;
            continue;
        }

        if (value[idx] === "|" && templateDepth === 0 && linkDepth === 0) {
            parts.push(current.trim());
            current = "";
            continue;
        }

        current += value[idx];
    }

    parts.push(current.trim());

    return parts;
};

const toTitleCase = value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const normalizeSkill = value => {
    if (value === "Range") {
        return "Ranged";
    }

    if (value === "Runecrafting") {
        return "Runecraft";
    }

    return value;
};

const cleanWikiText = value => {
    let cleaned = value.trim();

    cleaned = cleaned.replace(/<br\s*\/?>/gi, "; ");
    cleaned = cleaned.replace(/''+/g, "");
    cleaned = cleaned.replace(/^\d+=\s*/, "");
    cleaned = cleaned.replace(/\{\{SCP\|([^|}]+)\|(\d+)(?:\|[^}]*)?\}\}/g, (_, skill, level) => `${normalizeSkill(skill)} ${level}`);
    cleaned = cleaned.replace(/\{\{SCP\|([^|}]+)(?:\|[^}]*)?\}\}/g, "$1");
    cleaned = cleaned.replace(/\{\{RE\|([^}]+)\}\}/g, (_, regionValue) => regionValue.replaceAll("&", " and "));
    cleaned = cleaned.replace(/\{\{Coins\|([\d,]+)\}\}/g, "$1 coins");
    cleaned = cleaned.replace(/\{\{bug\|([^}]+)\}\}/g, " ($1)");
    cleaned = cleaned.replace(/\{\{NA(?:\|[^}]*)?\}\}/g, "");
    cleaned = cleaned.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2");
    cleaned = cleaned.replace(/\[\[([^\]]+)\]\]/g, "$1");
    cleaned = cleaned.replace(/\{\{[^}]+\}\}/g, "");
    cleaned = cleaned.replace(/&amp;/g, "&");
    cleaned = cleaned.replace(/&nbsp;/g, " ");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    cleaned = cleaned.replace(/\s+([,.;:!?)])/g, "$1");
    cleaned = cleaned.replace(/([({])\s+/g, "$1");

    return cleaned;
};

const dedupeRequirements = requirements => {
    const uniqueRequirements = [];
    const seen = new Set();

    for (const requirement of requirements) {
        const key = JSON.stringify(requirement);
        if (seen.has(key)) {
            continue;
        }

        seen.add(key);
        uniqueRequirements.push(requirement);
    }

    return uniqueRequirements;
};

const wrapRequirementGroup = (type, requirements) => {
    const flattenedRequirements = [];

    for (const requirement of requirements) {
        if (!requirement) {
            continue;
        }

        if (requirement.type === type) {
            flattenedRequirements.push(...requirement.requirements);
            continue;
        }

        flattenedRequirements.push(requirement);
    }

    const uniqueRequirements = dedupeRequirements(flattenedRequirements);
    if (uniqueRequirements.length === 0) {
        return null;
    }

    if (uniqueRequirements.length === 1) {
        return uniqueRequirements[0];
    }

    return {
        type,
        requirements: uniqueRequirements,
    };
};

const splitOnTopLevelDelimiters = (value, delimiters) => {
    const parts = [];
    let current = "";
    let parenthesisDepth = 0;

    for (let idx = 0; idx < value.length; idx += 1) {
        const character = value[idx];

        if (character === "(") {
            parenthesisDepth += 1;
            current += character;
            continue;
        }

        if (character === ")") {
            parenthesisDepth = Math.max(0, parenthesisDepth - 1);
            current += character;
            continue;
        }

        if (parenthesisDepth === 0) {
            const matchingDelimiter = delimiters.find(delimiter => value.slice(idx, idx + delimiter.length).toLowerCase() === delimiter.toLowerCase());
            if (matchingDelimiter) {
                parts.push(current.trim());
                current = "";
                idx += matchingDelimiter.length - 1;
                continue;
            }
        }

        current += character;
    }

    parts.push(current.trim());

    return parts.filter(Boolean);
};

const hasContextText = value => /\b(access|alternatively|bypass|completion|complete|either|friend|gives|if|must|note|partial|requires?|see|substitute|unlocked|without|worst case)\b/i.test(value);

const isComplexRequirementText = value => value.includes(".") || value.includes(":") || /\balternatively\b|\bfriend who\b|\beasier access\b|\bworst case\b/i.test(value);

const hasRequirementContext = value => /\b(access|alternatively|and|completion|complete|friend|if|must|note|or|partial|requires?|see|substitute|to|unlocked|with|without)\b/i.test(value);

const isSimpleItemText = value => {
    const trimmedValue = value.trim();
    if (!trimmedValue || /\d/.test(trimmedValue)) {
        return false;
    }

    if (/[.;:]/.test(trimmedValue)) {
        return false;
    }

    if (trimmedValue.split(/\s+/).length > 5) {
        return false;
    }

    return !hasRequirementContext(trimmedValue);
};

const isSimpleQuantityItemText = value => {
    const quantityItemMatch = value.match(/^(\d[\d,]*)\s+(.+)$/);
    if (!quantityItemMatch) {
        return false;
    }

    const itemText = quantityItemMatch[2].trim();
    if (/coins?$/i.test(itemText)) {
        return false;
    }

    if (/[.;:]/.test(itemText)) {
        return false;
    }

    if (itemText.split(/\s+/).length > 5) {
        return false;
    }

    return !hasRequirementContext(itemText);
};

const parseRequirementList = (value, type) => {
    const normalizedValue = value.replace(/,\s*or\s+/gi, ", ").replace(/\s+or\s+/gi, ", ");
    const parts = splitOnTopLevelDelimiters(normalizedValue, [", "]);
    if (parts.length <= 1) {
        return null;
    }

    const requirements = parts.map(part => parseRequirementText(part)).filter(Boolean);
    if (requirements.length !== parts.length) {
        return null;
    }

    return wrapRequirementGroup(type, requirements);
};

const parseAtomicRequirement = value => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
        return null;
    }

    const skillMatch = trimmedValue.match(/^([A-Za-z]+)\s+(\d+)$/);
    if (skillMatch) {
        const skill = normalizeSkill(skillMatch[1]);
        if (validSkills.has(skill)) {
            return {
                type: "skill",
                skill,
                level: Number(skillMatch[2]),
            };
        }
    }

    const goldMatch = trimmedValue.match(/^(\d[\d,]*)\s+coins?$/i);
    if (goldMatch) {
        return {
            type: "gold",
            amount: Number(goldMatch[1].replaceAll(",", "")),
        };
    }

    if (knownRegions.includes(trimmedValue)) {
        return {
            type: "region",
            region: trimmedValue,
        };
    }

    const questMatch = trimmedValue.match(/^(?:completion of|complete)\s+Quest\s+(.+)$/i) ?? trimmedValue.match(/^Quest\s+(.+)$/i);
    if (questMatch && !/^partial completion of\s+/i.test(trimmedValue)) {
        return {
            type: "quest",
            quest: questMatch[1].trim(),
        };
    }

    const relicMatch = trimmedValue.match(/^(?:the\s+)?(.+?)\s+relic(?:\s+to\b.*)?$/i);
    if (relicMatch) {
        return {
            type: "relic",
            relic: relicMatch[1].trim(),
        };
    }

    const itemMatch = trimmedValue.match(/^(\d[\d,]*)\s+(.+)$/);
    if (itemMatch && isSimpleQuantityItemText(trimmedValue)) {
        return {
            type: "item",
            item: itemMatch[2].trim(),
            quantity: Number(itemMatch[1].replaceAll(",", "")),
        };
    }

    if (isSimpleItemText(trimmedValue)) {
        return {
            type: "item",
            item: trimmedValue,
            quantity: 1,
        };
    }

    return null;
};

const parseRequirementText = value => {
    const trimmedValue = value.trim().replace(/^Either\s+/i, "").replace(/^Requires\s+/i, "");
    if (!trimmedValue) {
        return null;
    }

    const andOneOfSegments = splitOnTopLevelDelimiters(trimmedValue, [" and one of "]);
    if (andOneOfSegments.length === 2) {
        const leftRequirement = parseRequirementText(andOneOfSegments[0]);
        const rightRequirement = parseRequirementList(andOneOfSegments[1], "any");
        if (leftRequirement && rightRequirement) {
            return wrapRequirementGroup("combo", [leftRequirement, rightRequirement]);
        }
    }

    const oneOfMatch = trimmedValue.match(/^one of\s+(.+)$/i);
    if (oneOfMatch) {
        return parseRequirementList(oneOfMatch[1], "any");
    }

    if (!/\sand\s/i.test(trimmedValue) && trimmedValue.includes(",") && /,\s*or\s+/i.test(trimmedValue)) {
        const listedAlternativeRequirements = parseRequirementList(trimmedValue, "any");
        if (listedAlternativeRequirements) {
            return listedAlternativeRequirements;
        }
    }

    const alternatives = splitOnTopLevelDelimiters(trimmedValue, [" or "]);
    if (alternatives.length > 1) {
        const requirements = alternatives.map(parseRequirementText).filter(Boolean);
        if (requirements.length === alternatives.length) {
            return wrapRequirementGroup("any", requirements);
        }
    }

    if (trimmedValue.includes(",")) {
        const commaSeparatedRequirements = parseRequirementList(trimmedValue, "combo");
        if (commaSeparatedRequirements) {
            return commaSeparatedRequirements;
        }
    }

    const simultaneousSegments = splitOnTopLevelDelimiters(trimmedValue, ["; ", ";", " and "]);
    if (simultaneousSegments.length > 1) {
        const requirements = simultaneousSegments.map(parseRequirementText).filter(Boolean);
        if (requirements.length === simultaneousSegments.length) {
            return wrapRequirementGroup("combo", requirements);
        }
    }

    const exactRequirement = parseAtomicRequirement(trimmedValue);
    if (exactRequirement) {
        return exactRequirement;
    }

    const parentheticalMatch = trimmedValue.match(/^(.+?)\s*\((.+)\)$/);
    if (parentheticalMatch) {
        const outerRequirement = parseAtomicRequirement(parentheticalMatch[1]);
        const innerRequirement = parseRequirementText(parentheticalMatch[2]) ?? {
            type: "string",
            value: parentheticalMatch[2].trim(),
        };
        if (outerRequirement && innerRequirement) {
            return wrapRequirementGroup("combo", [outerRequirement, innerRequirement]);
        }
    }

    for (const region of knownRegions) {
        if (trimmedValue === region) {
            return {
                type: "region",
                region,
            };
        }

        if (trimmedValue.startsWith(`${region} for `)) {
            return {
                type: "region",
                region,
            };
        }

        if (trimmedValue.startsWith(`${region} with `)) {
            const regionRequirement = {
                type: "region",
                region,
            };
            const remainder = trimmedValue.slice(region.length + 6).trim();
            const remainderRequirement = parseRequirementText(remainder) ?? {
                type: "string",
                value: remainder,
            };

            return wrapRequirementGroup("combo", [regionRequirement, remainderRequirement]);
        }
    }

    return null;
};

const extractLooseRequirements = value => {
    const requirements = [];
    const cleanedText = cleanWikiText(value);

    for (const match of value.matchAll(/\{\{SCP\|([^|}]+)\|(\d+)(?:\|[^}]*)?\}\}/g)) {
        const skill = normalizeSkill(match[1]);
        if (!validSkills.has(skill)) {
            continue;
        }

        requirements.push({
            type: "skill",
            skill,
            level: Number(match[2]),
        });
    }

    for (const match of value.matchAll(/\{\{Coins\|([\d,]+)\}\}/g)) {
        requirements.push({
            type: "gold",
            amount: Number(match[1].replaceAll(",", "")),
        });
    }

    for (const match of value.matchAll(/\{\{RE\|([^}]+)\}\}/g)) {
        const regionNames = match[1].split("&").map(region => region.trim()).filter(Boolean);
        for (const regionName of regionNames) {
            requirements.push({
                type: "region",
                region: regionName,
            });
        }
    }

    const itemMatch = value.trim().match(/^(\d[\d,]*)\s+\[\[([^|\]]+)(?:\|([^\]]+))?\]\]$/);
    if (itemMatch) {
        requirements.push({
            type: "item",
            item: itemMatch[3] ?? itemMatch[2],
            quantity: Number(itemMatch[1].replaceAll(",", "")),
        });
    }

    for (const match of cleanedText.matchAll(/(?:^|\b)(?:completion of|complete)\s+Quest\s+([^.;]+)/gi)) {
        requirements.push({
            type: "quest",
            quest: match[1].trim(),
        });
    }

    for (const match of cleanedText.matchAll(/(?:^|\b)Quest\s+([^.;]+)/gi)) {
        if (/^partial completion of\s+/i.test(match[0])) {
            continue;
        }

        requirements.push({
            type: "quest",
            quest: match[1].trim(),
        });
    }

    for (const match of cleanedText.matchAll(/(?:^|\b)(?:the\s+)?(.+?)\s+relic\b/gi)) {
        requirements.push({
            type: "relic",
            relic: match[1].trim(),
        });
    }

    return dedupeRequirements(requirements);
};

const parseRequirementField = value => {
    if (!value || !value.trim()) {
        return null;
    }

    const cleanedText = cleanWikiText(value);

    const exactRegionTemplateMatch = value.trim().match(/^\{\{RE\|([^}]+)\}\}$/);
    if (exactRegionTemplateMatch) {
        const regionRequirements = exactRegionTemplateMatch[1].split("&").map(region => region.trim()).filter(Boolean).map(region => ({
            type: "region",
            region,
        }));
        return wrapRequirementGroup("any", regionRequirements);
    }

    const parsedRequirement = parseRequirementText(cleanedText);
    if (parsedRequirement) {
        return parsedRequirement;
    }

    const looseRequirements = extractLooseRequirements(value);
    if (looseRequirements.length === 0) {
        return {
            type: "string",
            value: cleanedText,
        };
    }

    const groupType = /\beither\b|\bor\b/i.test(cleanedText) ? "any" : "combo";
    const structuredRequirement = wrapRequirementGroup(groupType, looseRequirements);
    if (!hasContextText(cleanedText)) {
        return structuredRequirement;
    }

    return wrapRequirementGroup("combo", [
        structuredRequirement,
        {
            type: "string",
            value: cleanedText,
        },
    ]);
};

const parseTaskRow = template => {
    const content = template.slice("{{RELTaskRow|".length, -2);
    const parts = splitTopLevel(content);

    const [name, description, ...fieldParts] = parts;
    const fields = {};

    for (const fieldPart of fieldParts) {
        if (!fieldPart) {
            continue;
        }

        const separatorIndex = fieldPart.indexOf("=");
        if (separatorIndex === -1) {
            continue;
        }

        const key = fieldPart.slice(0, separatorIndex).trim();
        const fieldValue = fieldPart.slice(separatorIndex + 1).trim();
        fields[key] = fieldValue;
    }

    const difficulty = toTitleCase(fields.tier);
    const fieldRequirements = [parseRequirementField(fields.s ?? ""), parseRequirementField(fields.other ?? "")].filter(Boolean);
    const requirements = fieldRequirements.length === 0 ? [] : [wrapRequirementGroup("combo", fieldRequirements)];

    return {
        id: Number(fields.id),
        name: cleanWikiText(name),
        description: cleanWikiText(description),
        region: cleanWikiText(fields.region),
        points: difficultyPoints[fields.tier],
        difficulty,
        requirements,
    };
};

const renderTypeScriptModule = (importPath, typeName, constName, values) => {
    const payload = JSON.stringify(values, null, 2);
    return `import type ${typeName} from "${importPath}";\n\nconst ${constName}: ${typeName}[] = ${payload};\n\nexport default ${constName};\n`;
};

const renderJsonTaskWrapperModule = (importPath, typeName, jsonImportPath, constName) => {
    return `import taskPayload from "${jsonImportPath}?raw";\nimport type ${typeName} from "${importPath}";\n\nconst ${constName} = JSON.parse(taskPayload) as ${typeName}[];\n\nexport default ${constName};\n`;
};

const main = async () => {
    const response = await fetch(taskSourceUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch task source: ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();
    const taskRows = extractTemplates(payload.parse.wikitext["*"], "{{RELTaskRow|");
    const tasks = taskRows.map(parseTaskRow);
    const regions = [];
    const seenRegions = new Set();

    for (const task of tasks) {
        if (seenRegions.has(task.region)) {
            continue;
        }

        seenRegions.add(task.region);
        regions.push({
            name: task.region,
            shortCode: regionShortCodes[task.region] ?? task.region.slice(0, 3).toUpperCase(),
        });
    }

    await writeFile(new URL("../src/data/raging-echoes-tasks.json", import.meta.url), `${JSON.stringify(tasks, null, 2)}\n`);
    await writeFile(new URL("../src/data/raging-echoes-tasks.ts", import.meta.url), renderJsonTaskWrapperModule("@/data/model/Task", "Task", "@/data/raging-echoes-tasks.json", "ragingEchoesTasks"));
    await writeFile(new URL("../src/data/raging-echoes-regions.ts", import.meta.url), renderTypeScriptModule("@/data/model/Region", "Region", "ragingEchoesRegions", regions));

    console.log(`Generated ${tasks.length} tasks across ${regions.length} regions.`);
};

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});