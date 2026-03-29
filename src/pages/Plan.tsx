import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Gem, RotateCcw, Swords, WandSparkles } from "lucide-react";
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

function PlannerBoardRow({ label, children, isLast = false }: { label: string; children: React.ReactNode; isLast?: boolean }) {
  return <div className={cn("grid gap-3 px-3 py-4 sm:px-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-0 md:px-0 md:py-0", !isLast && "border-b border-primary/20")}>
    <div className="px-2 pt-1 md:border-r md:border-primary/20 md:bg-background/40 md:px-5 md:py-5">
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
      "relative flex h-full min-h-[6.6rem] flex-col items-center justify-center rounded-xl border bg-background/70 px-2 py-3 transition-all duration-200 sm:min-h-[7.2rem] sm:px-3 sm:py-4",
      selected && "border-primary/50 bg-primary/10 opacity-100 shadow-[0_0_18px_rgba(220,38,38,0.18)]",
      !selected && !blocked && !fixed && "border-primary/20 opacity-45 hover:border-primary/40 hover:opacity-100",
      blocked && "border-border opacity-20",
      fixed && "border-primary/20 opacity-35",
      isClickable && "cursor-pointer",
    )}>
      {selected && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(220,38,38,0.8)]" />}
      {fixed && <span className="absolute right-1.5 top-1.5 rounded-full border border-primary/20 bg-background/90 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:right-2 sm:top-2 sm:px-2">Fixed</span>}
      <img src={badgeImage} alt={`${name} badge`} className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(15,23,42,0.25)] sm:h-10 sm:w-10" />
      <p className="mt-2 text-balance text-xs font-semibold leading-tight text-foreground sm:mt-3 sm:text-sm">{name === "Kourend and Kebos" && "Kourend"}{name !== "Kourend and Kebos" && name}</p>
    </div>
  </button>;
}

function MasteryNode({
  label,
  level,
  selected,
  blocked,
  onClick,
}: {
  label: string;
  level: number;
  selected: boolean;
  blocked: boolean;
  onClick: () => void;
}) {
  return <button
    type="button"
    onClick={onClick}
    disabled={blocked}
    aria-pressed={selected}
    className={cn(
      "flex min-h-[4rem] flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition-all duration-200",
      selected && "border-primary/50 bg-primary/10 opacity-100 shadow-[0_0_18px_rgba(220,38,38,0.18)]",
      !selected && !blocked && "border-primary/20 bg-background/70 opacity-45 hover:border-primary/40 hover:opacity-100",
      blocked && "border-border bg-background/50 opacity-20",
    )}
  >
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    <span className="mt-1 text-lg font-black text-foreground">{masteryRomanNumerals[level - 1]}</span>
  </button>;
}

function RelicNode({
  tier,
  name,
  selected,
  blocked,
  onClick,
}: {
  tier: number;
  name: string;
  selected: boolean;
  blocked: boolean;
  onClick?: () => void;
}) {
  const isClickable = onClick !== undefined && !blocked;

  return <button
    type="button"
    onClick={onClick}
    disabled={!isClickable}
    aria-pressed={selected}
    className="w-full text-center"
  >
    <div className={cn(
      "flex min-h-[7.75rem] flex-col items-center justify-center rounded-xl border bg-background/70 px-2 py-3 transition-all duration-200 sm:min-h-[8.25rem]",
      selected && "border-primary/50 bg-primary/10 opacity-100 shadow-[0_0_18px_rgba(220,38,38,0.18)]",
      !selected && !blocked && "border-primary/20 opacity-45 hover:border-primary/40 hover:opacity-100",
      blocked && "border-border opacity-20",
      isClickable && "cursor-pointer",
    )}>
      <img src={getRelicImageSrc(tier, name)} alt={`${name} relic icon`} className="h-[48px] w-[48px] shrink-0 sm:h-[52px] sm:w-[52px]" onError={event => {
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
                <div className="flex flex-wrap items-start gap-3 sm:gap-4">
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
                  const styleShortLabel = styleMetadata.label === "Ranged" ? "Rng" : styleMetadata.label === "Magic" ? "Mag" : "Melee";

                  return <div key={style} className="space-y-3 rounded-2xl border border-primary/20 bg-background/35 p-3 sm:p-4">
                    <div className="flex items-center justify-center gap-2 text-center text-lg font-semibold text-foreground sm:text-xl">
                      {style === CombatStyle.Melee && <Swords className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                      {style === CombatStyle.Ranged && <Compass className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                      {style === CombatStyle.Magic && <WandSparkles className={cn("h-5 w-5", styleMetadata.accentClassName)} />}
                      <span>{styleMetadata.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {styleMasteries.map(mastery => {
                        const isSelected = mastery.level === currentLevel;
                        const pointsWithoutStyle = totalCombatMasteryPoints - currentLevel;
                        const isBlocked = !isSelected && pointsWithoutStyle + mastery.level > maxCombatMasteryPoints;

                        return <MasteryNode
                          key={mastery.name}
                          label={styleShortLabel}
                          level={mastery.level}
                          selected={isSelected}
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
                  {plannerRelicTiers.map(tier => <div key={tier.tier} className="relative rounded-2xl border border-primary/20 px-3 pb-3 pt-6 sm:px-4">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-background px-3 py-1 text-sm font-semibold text-foreground">
                      Tier {tier.tier}
                    </div>

                    {!tier.isSelectable && <div className="flex min-h-[7.75rem] items-center justify-center rounded-xl border border-dashed border-primary/20 bg-background/60 px-3 py-4 text-center text-sm font-semibold text-muted-foreground opacity-45 sm:min-h-[8.25rem]">
                      Pending
                    </div>}

                    {tier.isSelectable && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {tier.relics.map(relic => <RelicNode
                        key={relic.code}
                        tier={tier.tier}
                        name={relic.name}
                        selected={selectedRelicsByTier[tier.tier] === relic.code}
                        blocked={false}
                        onClick={() => handleRelicToggle(tier.tier, relic.code)}
                      />)}
                    </div>}
                  </div>)}
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