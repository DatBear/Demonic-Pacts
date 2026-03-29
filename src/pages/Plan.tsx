import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, RotateCcw, Swords, WandSparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type PlanModel from "@/data/model/plan/Plan";
import type PlanCombatMastery from "@/data/model/plan/PlanCombatMastery";
import type PlanRegion from "@/data/model/plan/PlanRegion";
import type PlanRelic from "@/data/model/plan/PlanRelic";
import CombatStyle from "@/data/model/CombatStyle";
import { combatStyleMetadata, combatStyles, fixedPlannerRegions, getRelicImageSrc, plannerCombatMasteries, plannerRegions, plannerRelicTiers } from "@/data/plan-page-data";
import { cn } from "@/lib/utils";

const maxSelectableRegions = 3;
const maxCombatMasteryPoints = 10;
const masteryRomanNumerals = ["I", "II", "III", "IV", "V", "VI"];
const regionDisplayOrder = ["Varlamore", "Karamja", "Asgarnia", "Wilderness", "Fremennik", "Kandarin", "Desert", "Morytania", "Kourend and Kebos", "Tirannwn"];

interface DisplayRelicOption {
  code: string;
  name: string;
  tier: number;
  pending: boolean;
}

function getRelicSlotCount(tierNumber: number) {
  if (tierNumber === 7) {
    return 2;
  }

  return 3;
}

function getDisplayRelics(tierNumber: number, relics: Array<{ code: string; name: string; tier: number }>): DisplayRelicOption[] {
  const relicSlots = relics.map(relic => ({
    code: relic.code,
    name: relic.name,
    tier: relic.tier,
    pending: false,
  }));
  const slotCount = Math.max(getRelicSlotCount(tierNumber), relicSlots.length);
  const pendingSlots = Array.from({ length: slotCount - relicSlots.length }, (_, idx) => ({
    code: `T${tierNumber}_PENDING_${idx + 1}`,
    name: "?",
    tier: tierNumber,
    pending: true,
  }));

  return [...relicSlots, ...pendingSlots];
}

function PlannerBoardRow({ label, children, isLast = false }: { label: string; children: React.ReactNode; isLast?: boolean }) {
  return <div className={cn("grid gap-3 px-3 py-4 sm:px-4 md:grid-cols-[11rem_minmax(0,1fr)] md:items-center md:gap-4 md:px-0 md:py-0", !isLast && "border-b border-primary/20")}>
    <div className="flex items-center px-2 md:px-5 md:py-5">
      <p className="text-base font-semibold leading-tight text-foreground sm:text-lg md:text-xl">{label}</p>
    </div>
    <div className="min-w-0 px-1 pb-1 md:px-5 md:py-5">{children}</div>
  </div>;
}

function RegionNode({
  name,
  badgeImage,
  selected,
  blocked,
  fixed,
  onClick,
}: {
  name: string;
  badgeImage: string;
  selected: boolean;
  blocked: boolean;
  fixed: boolean;
  onClick?: () => void;
}) {
  const isClickable = onClick !== undefined && !blocked && !fixed;

  return <button
    type="button"
    onClick={onClick}
    disabled={!isClickable}
    aria-pressed={selected}
    className="w-[5.4rem] text-center sm:w-[6.1rem]"
  >
    <div className={cn(
      "relative flex h-full min-h-[6.6rem] flex-col items-center justify-center rounded-xl bg-background/60 px-2 py-3 transition-all duration-200 sm:min-h-[7.2rem] sm:px-3 sm:py-4",
      selected && "bg-emerald-500/12 opacity-100 shadow-[0_0_24px_rgba(52,211,153,0.22)]",
      !selected && !blocked && !fixed && "opacity-50 hover:bg-background/85 hover:opacity-100",
      blocked && "opacity-20",
      fixed && "bg-background/45 opacity-55",
      isClickable && "cursor-pointer",
    )}>
      {selected && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.85)]" />}
      {fixed && <span className="absolute right-1.5 top-1.5 rounded-full bg-background/90 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:right-2 sm:top-2 sm:px-2">Fixed</span>}
      <img src={badgeImage} alt={`${name} badge`} className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(15,23,42,0.25)] sm:h-10 sm:w-10" />
      <p className="mt-2 text-balance text-xs font-semibold leading-tight text-foreground sm:mt-3 sm:text-sm">{name === "Kourend and Kebos" && "Kourend"}{name !== "Kourend and Kebos" && name}</p>
    </div>
  </button>;
}

function MasteryNode({
  level,
  selected,
  current,
  blocked,
  onClick,
}: {
  level: number;
  selected: boolean;
  current: boolean;
  blocked: boolean;
  onClick: () => void;
}) {
  return <button
    type="button"
    onClick={onClick}
    disabled={blocked}
    aria-pressed={selected}
    className={cn(
      "relative flex min-h-[4rem] flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-all duration-200",
      selected && "bg-primary/12 opacity-100 shadow-[0_0_18px_rgba(220,38,38,0.18)]",
      current && "-translate-y-0.5 bg-primary/22 shadow-[0_0_28px_rgba(220,38,38,0.28)]",
      !selected && !blocked && "bg-background/60 opacity-45 hover:bg-background/85 hover:opacity-100",
      blocked && "bg-background/40 opacity-20",
    )}
  >
    {selected && <span className={cn("absolute inset-x-2 bottom-1 h-1 rounded-full bg-primary/35", current && "bg-primary")} />}
    <span className={cn("text-lg font-black text-foreground", current && "text-primary")}>{masteryRomanNumerals[level - 1]}</span>
  </button>;
}

function RelicNode({
  name,
  imageSrc,
  selected,
  pending,
  tierHasSelection,
  onClick,
}: {
  name: string;
  imageSrc: string;
  selected: boolean;
  pending: boolean;
  tierHasSelection: boolean;
  onClick?: () => void;
}) {
  const isClickable = onClick !== undefined && !pending;

  return <button
    type="button"
    onClick={onClick}
    disabled={!isClickable}
    aria-pressed={selected}
    className="w-full text-center"
  >
    <div className={cn(
      "plan-relic-node flex min-h-[7.75rem] transform-gpu flex-col items-center justify-center rounded-xl bg-background/60 px-2 py-3 transition-[background-color,opacity,box-shadow] duration-200 sm:min-h-[8.25rem]",
      selected && "plan-relic-node-selected bg-primary/12 opacity-100 shadow-[0_0_18px_rgba(220,38,38,0.18)]",
      tierHasSelection && !selected && !pending && "plan-relic-node-unselected opacity-55 hover:bg-background/85 hover:opacity-85",
      !tierHasSelection && !selected && !pending && "opacity-50 hover:bg-background/85 hover:opacity-100",
      pending && "bg-background/45 opacity-35",
      isClickable && "cursor-pointer",
    )}>
      {pending && <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pending</span>}
      <img src={imageSrc} alt={pending ? "Pending relic icon" : `${name} relic icon`} className="h-[48px] w-[48px] shrink-0 sm:h-[52px] sm:w-[52px]" onError={event => {
        event.currentTarget.src = "/relics/Unknown.png";
      }} />
      <p className="mt-2 text-balance text-sm font-black leading-tight text-foreground sm:text-[0.95rem]">{name}</p>
    </div>
  </button>;
}

export default function Plan() {
  const [selectedRegionCodes, setSelectedRegionCodes] = useState<string[]>([]);
  const [selectedMasteryLevels, setSelectedMasteryLevels] = useState<Record<CombatStyle, number>>({
    [CombatStyle.Melee]: 0,
    [CombatStyle.Ranged]: 0,
    [CombatStyle.Magic]: 0,
  });
  const [selectedRelicsByTier, setSelectedRelicsByTier] = useState<Record<number, string>>({});

  const totalCombatMasteryPoints = Object.values(selectedMasteryLevels).reduce((sum, level) => sum + level, 0);

  const planRegions: PlanRegion[] = selectedRegionCodes.map(code => ({ code }));
  const planCombatMasteries: PlanCombatMastery[] = combatStyles
    .filter(style => selectedMasteryLevels[style] > 0)
    .map(style => ({
      style,
      level: selectedMasteryLevels[style],
    }));
  const planRelics: PlanRelic[] = Object.values(selectedRelicsByTier).map(code => ({ code }));

  const currentPlan: PlanModel = {
    regions: planRegions,
    relics: planRelics,
    combatMasteries: planCombatMasteries,
    route: [],
  };

  const regionLookup = Object.fromEntries([...plannerRegions, ...fixedPlannerRegions].map(region => [region.name, region]));
  const orderedRegions = regionDisplayOrder.map(regionName => regionLookup[regionName]).filter(region => region !== undefined);

  const handleReset = () => {
    setSelectedRegionCodes([]);
    setSelectedMasteryLevels({
      [CombatStyle.Melee]: 0,
      [CombatStyle.Ranged]: 0,
      [CombatStyle.Magic]: 0,
    });
    setSelectedRelicsByTier({});
  };

  const handleRegionToggle = (code: string) => {
    setSelectedRegionCodes(currentCodes => {
      if (currentCodes.includes(code)) {
        return currentCodes.filter(regionCode => regionCode !== code);
      }

      if (currentCodes.length >= maxSelectableRegions) {
        return currentCodes;
      }

      return [...currentCodes, code];
    });
  };

  const handleMasteryToggle = (style: CombatStyle, nextLevel: number) => {
    setSelectedMasteryLevels(currentLevels => {
      const currentLevel = currentLevels[style];

      if (currentLevel === nextLevel) {
        return {
          ...currentLevels,
          [style]: 0,
        };
      }

      const pointsWithoutStyle = Object.values(currentLevels).reduce((sum, level) => sum + level, 0) - currentLevel;

      if (pointsWithoutStyle + nextLevel > maxCombatMasteryPoints) {
        return currentLevels;
      }

      return {
        ...currentLevels,
        [style]: nextLevel,
      };
    });
  };

  const handleRelicToggle = (tier: number, relicCode: string) => {
    setSelectedRelicsByTier(currentRelics => {
      if (currentRelics[tier] === relicCode) {
        const nextRelics = { ...currentRelics };
        delete nextRelics[tier];
        return nextRelics;
      }

      return {
        ...currentRelics,
        [tier]: relicCode,
      };
    });
  };

  return <>
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,24,24,0.16),_transparent_45%)] league-embers" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.03)_0%,_transparent_20%,_transparent_80%,_rgba(255,255,255,0.02)_100%)]" />

      <main className="relative w-full px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
                <span className="text-primary">Regions</span> {currentPlan.regions.length}/{maxSelectableRegions}
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
                <span className="text-primary">Mastery</span> {totalCombatMasteryPoints}/{maxCombatMasteryPoints}
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
                <span className="text-primary">Relics</span> {currentPlan.relics.length}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/info"><Button variant="outline">Back</Button></Link>
              <Link to="/relics"><Button variant="outline">Relics</Button></Link>
              <Link to="/tasks"><Button variant="outline">Tasks</Button></Link>
              <Button variant="secondary" onClick={handleReset}><RotateCcw className="h-4 w-4" /> Reset</Button>
            </div>
          </div>

          <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground">
            <span className="text-primary">Plan Board</span> Varlamore and Karamja stay fixed. Everything else toggles directly into the in-memory plan.
          </div>

          <Card className="overflow-hidden border-primary/20 bg-card/95 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <CardContent className="p-0">
              <PlannerBoardRow label="Regions">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {orderedRegions.map(region => {
                    const isFixed = fixedPlannerRegions.some(fixedRegion => fixedRegion.code === region.code);
                    const isSelected = selectedRegionCodes.includes(region.code);
                    const isBlocked = !isSelected && !isFixed && selectedRegionCodes.length >= maxSelectableRegions;

                    return <RegionNode
                      key={region.code}
                      name={region.name}
                      badgeImage={region.badgeImage}
                      selected={isSelected}
                      blocked={isBlocked}
                      fixed={isFixed}
                      onClick={!isFixed ? () => handleRegionToggle(region.code) : undefined}
                    />;
                  })}
                </div>
              </PlannerBoardRow>

              <PlannerBoardRow label="Combat Masteries">
                <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
                  {combatStyles.map(style => {
                    const styleMetadata = combatStyleMetadata[style];
                    const currentLevel = selectedMasteryLevels[style];
                    const styleMasteries = plannerCombatMasteries.filter(mastery => mastery.style === style);

                    return <div key={style} className="space-y-3 rounded-2xl bg-background/35 p-3 sm:p-4">
                      <div className="flex items-center justify-center gap-2 text-center text-lg font-semibold text-foreground sm:text-xl">
                        {style === CombatStyle.Melee && <Swords className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                        {style === CombatStyle.Ranged && <Compass className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                        {style === CombatStyle.Magic && <WandSparkles className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                        <span>{styleMetadata.label}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {styleMasteries.map(mastery => {
                          const isSelected = mastery.level <= currentLevel;
                          const isCurrent = mastery.level === currentLevel;
                          const pointsWithoutStyle = totalCombatMasteryPoints - currentLevel;
                          const isBlocked = !isSelected && pointsWithoutStyle + mastery.level > maxCombatMasteryPoints;

                          return <MasteryNode
                            key={mastery.name}
                            level={mastery.level}
                            selected={isSelected}
                            current={isCurrent}
                            blocked={isBlocked}
                            onClick={() => handleMasteryToggle(style, mastery.level)}
                          />;
                        })}
                      </div>
                    </div>;
                  })}
                </div>
              </PlannerBoardRow>

              <PlannerBoardRow label="Relics" isLast>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {plannerRelicTiers.map(tier => {
                    const relicSlots = getDisplayRelics(tier.tier, tier.relics);
                    const tierHasSelection = selectedRelicsByTier[tier.tier] !== undefined;
                    const gridClassName = relicSlots.length === 2 ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-3 sm:grid-cols-3";

                    return <div key={tier.tier} className="relative rounded-2xl border border-primary/20 bg-background/35 px-3 pb-3 pt-6 sm:px-4">
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-3 py-1 text-sm font-semibold text-foreground shadow-[0_10px_30px_rgba(15,23,42,0.28)]">
                        Tier {tier.tier}
                      </div>

                      <div className={gridClassName}>
                        {relicSlots.map(relic => <RelicNode
                          key={relic.code}
                          name={relic.name}
                          imageSrc={relic.pending ? "/relics/Unknown.png" : getRelicImageSrc(relic.tier, relic.name)}
                          selected={!relic.pending && selectedRelicsByTier[tier.tier] === relic.code}
                          pending={relic.pending}
                          tierHasSelection={tierHasSelection}
                          onClick={!relic.pending ? () => handleRelicToggle(tier.tier, relic.code) : undefined}
                        />)}
                      </div>
                    </div>;
                  })}
                </div>
              </PlannerBoardRow>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <div className="rounded-full border border-border bg-background/70 px-3 py-2">Up to 3 flexible regions</div>
            <div className="rounded-full border border-border bg-background/70 px-3 py-2">Up to 10 mastery points</div>
            <div className="rounded-full border border-border bg-background/70 px-3 py-2">1 relic per revealed tier</div>
          </div>
        </div>
      </main>

      <footer className="relative border-t border-border py-6">
        <div className="px-3 text-center text-sm text-muted-foreground sm:px-4 md:px-6 lg:px-8">
          <p>This is a community-built tool for Old School RuneScape Leagues. Not affiliated with Jagex Ltd.</p>
        </div>
      </footer>
    </div>
  </>;
}