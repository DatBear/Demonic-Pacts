import type CombatMastery from "@/data/model/CombatMastery";
import CombatStyle from "@/data/model/CombatStyle";
import type { RelicData } from "@/data/league-data";
import { relicTiers, unlockableRegions } from "@/data/league-data";
import ragingEchoesRegions from "@/data/raging-echoes-regions";

export interface PlannerRegion {
  code: string;
  name: string;
  badgeImage: string;
  summary: string;
  strapline: string;
  slug?: string;
  isFixed: boolean;
  fixedLabel?: string;
}

export interface PlannerRelicOption {
  code: string;
  name: string;
  summary: string;
  tier: number;
  isRevealed: boolean;
}

export interface PlannerRelicTier {
  tier: number;
  title: string;
  status: string;
  passiveEffects: string[];
  isSelectable: boolean;
  relics: PlannerRelicOption[];
}

const regionBadgeByCode = Object.fromEntries(ragingEchoesRegions.map(region => [region.code, region.badgeImage]));

const plannerRegionCodeByName: Record<string, string> = {
  Asgarnia: "ASG",
  Desert: "DES",
  Fremennik: "FRE",
  Kandarin: "KAN",
  Karamja: "KAR",
  "Kourend and Kebos": "KOU",
  Morytania: "MOR",
  Tirannwn: "TIR",
  Wilderness: "WIL",
  Varlamore: "VAR",
};

const combatMasteryCatalog: CombatMastery[] = [
  {
    name: "Melee I",
    image: "",
    style: CombatStyle.Melee,
    level: 1,
    description: "Commit your first point to melee routing.",
  },
  {
    name: "Melee II",
    image: "",
    style: CombatStyle.Melee,
    level: 2,
    description: "Deepen the melee path with a second mastery point.",
  },
  {
    name: "Melee III",
    image: "",
    style: CombatStyle.Melee,
    level: 3,
    description: "Unlock the midpoint of the melee progression.",
  },
  {
    name: "Melee IV",
    image: "",
    style: CombatStyle.Melee,
    level: 4,
    description: "Push melee further toward endgame specialization.",
  },
  {
    name: "Melee V",
    image: "",
    style: CombatStyle.Melee,
    level: 5,
    description: "Reserve more of your total mastery budget for melee.",
  },
  {
    name: "Melee VI",
    image: "",
    style: CombatStyle.Melee,
    level: 6,
    description: "Cap the melee branch at the current revealed maximum.",
  },
  {
    name: "Ranged I",
    image: "",
    style: CombatStyle.Ranged,
    level: 1,
    description: "Commit your first point to ranged routing.",
  },
  {
    name: "Ranged II",
    image: "",
    style: CombatStyle.Ranged,
    level: 2,
    description: "Deepen the ranged path with a second mastery point.",
  },
  {
    name: "Ranged III",
    image: "",
    style: CombatStyle.Ranged,
    level: 3,
    description: "Unlock the midpoint of the ranged progression.",
  },
  {
    name: "Ranged IV",
    image: "",
    style: CombatStyle.Ranged,
    level: 4,
    description: "Push ranged further toward endgame specialization.",
  },
  {
    name: "Ranged V",
    image: "",
    style: CombatStyle.Ranged,
    level: 5,
    description: "Reserve more of your total mastery budget for ranged.",
  },
  {
    name: "Ranged VI",
    image: "",
    style: CombatStyle.Ranged,
    level: 6,
    description: "Cap the ranged branch at the current revealed maximum.",
  },
  {
    name: "Magic I",
    image: "",
    style: CombatStyle.Magic,
    level: 1,
    description: "Commit your first point to magic routing.",
  },
  {
    name: "Magic II",
    image: "",
    style: CombatStyle.Magic,
    level: 2,
    description: "Deepen the magic path with a second mastery point.",
  },
  {
    name: "Magic III",
    image: "",
    style: CombatStyle.Magic,
    level: 3,
    description: "Unlock the midpoint of the magic progression.",
  },
  {
    name: "Magic IV",
    image: "",
    style: CombatStyle.Magic,
    level: 4,
    description: "Push magic further toward endgame specialization.",
  },
  {
    name: "Magic V",
    image: "",
    style: CombatStyle.Magic,
    level: 5,
    description: "Reserve more of your total mastery budget for magic.",
  },
  {
    name: "Magic VI",
    image: "",
    style: CombatStyle.Magic,
    level: 6,
    description: "Cap the magic branch at the current revealed maximum.",
  },
];

function toRelicCode(relicName: string) {
  return relicName.replace(/[’']/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function toPlannerRelic(tier: number, relic: RelicData): PlannerRelicOption {
  return {
    code: `T${tier}_${toRelicCode(relic.name)}`,
    name: relic.name,
    summary: relic.summary,
    tier,
    isRevealed: true,
  };
}

export const fixedPlannerRegions: PlannerRegion[] = [
  {
    code: "VAR",
    name: "Varlamore",
    badgeImage: regionBadgeByCode.VAR,
    summary: "Every run begins here. It is shown for planning context but is not stored in the plan output.",
    strapline: "League starting area.",
    isFixed: true,
    fixedLabel: "Starting Area",
  },
  {
    code: "KAR",
    name: "Karamja",
    badgeImage: regionBadgeByCode.KAR,
    summary: "Your first area unlock is forced into Karamja before the three flexible picks begin.",
    strapline: "Forced first unlock.",
    slug: "karamja",
    isFixed: true,
    fixedLabel: "Forced Unlock",
  },
];

export const plannerRegions: PlannerRegion[] = unlockableRegions
  .filter(region => region.name !== "Karamja")
  .map(region => {
    const code = plannerRegionCodeByName[region.name];

    return {
      code,
      name: region.name,
      badgeImage: regionBadgeByCode[code],
      summary: region.summary,
      strapline: region.strapline,
      slug: region.slug,
      isFixed: false,
    };
  });

export const plannerRelicTiers: PlannerRelicTier[] = relicTiers.map(tier => ({
  tier: tier.tier,
  title: tier.title,
  status: tier.status,
  passiveEffects: tier.passiveEffects,
  isSelectable: tier.relics.length > 0,
  relics: tier.relics.map(relic => toPlannerRelic(tier.tier, relic)),
}));

export const plannerCombatMasteries = combatMasteryCatalog;

export const combatStyles = [CombatStyle.Melee, CombatStyle.Ranged, CombatStyle.Magic];

export const combatStyleMetadata: Record<CombatStyle, { label: string; accentClassName: string }> = {
  [CombatStyle.Melee]: {
    label: "Melee",
    accentClassName: "text-amber-300",
  },
  [CombatStyle.Ranged]: {
    label: "Ranged",
    accentClassName: "text-emerald-300",
  },
  [CombatStyle.Magic]: {
    label: "Magic",
    accentClassName: "text-sky-300",
  },
};

export function getRelicImageSrc(tierNumber: number, relicName?: string) {
  if (!relicName) {
    return "/relics/Unknown.png";
  }

  const normalizedName = relicName.replace(/[’']/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return `/relics/T${tierNumber}_${normalizedName}.png`;
}