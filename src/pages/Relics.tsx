import { Link } from "react-router-dom";
import { Flame, Layers3, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaguePageFrame } from "@/components/LeaguePageFrame";
import { relicTiers } from "@/data/league-data";
import { cn } from "@/lib/utils";

function PassiveList({ items }: { items: string[] }) {
  return <ul className="grid gap-3 text-sm text-muted-foreground">
    {items.map(item => <li key={item} className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span className="leading-6">{item}</span>
    </li>)}
  </ul>;
}

function getRelicImageSrc(tierNumber: number, relicName?: string) {
  if (!relicName) {
    return "/relics/Unknown.png";
  }

  const normalizedName = relicName.replace(/[’']/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return `/relics/T${tierNumber}_${normalizedName}.png`;
}

function getTierSlotCount(tierNumber: number) {
  if (tierNumber === 7) {
    return 2;
  }

  return 3;
}

function getTierRevealLabel(revealedCount: number, slotCount: number) {
  if (revealedCount === 0) {
    return "None revealed";
  }

  return `${revealedCount}/${slotCount} revealed`;
}

function getTierRevealLabelClassName(revealedCount: number, slotCount: number) {
  if (revealedCount === 0) {
    return "text-red-400";
  }

  if (revealedCount === slotCount) {
    return "text-green-400";
  }

  return "text-yellow-400";
}

export default function Relics() {
  return <LeaguePageFrame
    eyebrow="Relics"
    title="Relic Tracker"
    description="Tier 1, Tier 6, and Tier 8 relics have been revealed. Check back here as Jagex reveals the details for the remaining tiers!"
    backTo="/info"
    backLabel="Back to League Info"
    actions={<>
      <Link to="/info#regions"><Button variant="outline">Browse Regions</Button></Link>
      <a href="https://secure.runescape.com/m=news/get-ready-for-leagues-vi-demonic-pacts---april-15th?oldschool=1" target="_blank" rel="noopener noreferrer"><Button>Official Reveal Post</Button></a>
    </>}
  >
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Quick Navigation</p>
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max justify-center gap-3">
              {relicTiers.map(tier => <a key={tier.tier} href={`#T${tier.tier}`} className="shrink-0">
                <Button variant="outline" className="h-auto py-3">
                  <span className="flex flex-col items-center leading-tight">
                    <span>Tier {tier.tier}</span>
                    <span className={cn("mt-1 text-xs font-normal", getTierRevealLabelClassName(tier.relics.length, getTierSlotCount(tier.tier)))}>{getTierRevealLabel(tier.relics.length, getTierSlotCount(tier.tier))}</span>
                  </span>
                </Button>
              </a>)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {relicTiers.map(tier => {
            const slotCount = getTierSlotCount(tier.tier);
            const relicGridClassName = cn(
              "grid gap-4 md:grid-cols-2",
              slotCount === 3 && "xl:grid-cols-3",
              slotCount === 2 && "xl:grid-cols-2",
            );

            let relicContent = <div className={relicGridClassName}>
              {Array.from({ length: slotCount }, (_, idx) => <Card key={`${tier.tier}-${idx + 1}`} className="border-dashed border-primary/20 bg-background/50">
                <CardContent className="flex min-h-48 flex-col justify-between p-5">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-primary">Unknown Relic</p>
                    <div className="flex items-center gap-3">
                      <img src={getRelicImageSrc(tier.tier)} alt="Unknown relic icon" className="h-[60px] w-[60px] shrink-0" />
                      <p className="text-lg font-semibold">Tier {tier.tier} relic pending</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Awaiting Jagex Reveal</p>
                </CardContent>
              </Card>)}
            </div>;

            if (tier.relics.length > 0) {
              relicContent = <div className={relicGridClassName}>
                {tier.relics.map(relic => <Card key={relic.name} className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <img src={getRelicImageSrc(tier.tier, relic.name)} alt={`${relic.name} relic icon`} className="h-[60px] w-[60px] shrink-0" />
                      <span>{relic.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{relic.summary}</p>
                    {relic.toggleableEffect && <div className="rounded-lg border border-primary/20 bg-background/60 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-primary">Toggleable Effect</p>
                      <p className="mt-2 text-sm text-foreground">{relic.toggleableEffect}</p>
                    </div>}
                    <div>
                      <p className="mb-3 text-sm font-semibold">Active Effects</p>
                      <PassiveList items={relic.activeEffects} />
                    </div>
                    {relic.notes.length > 0 && <div>
                      <p className="mb-3 text-sm font-semibold">Notes</p>
                      <PassiveList items={relic.notes} />
                    </div>}
                  </CardContent>
                </Card>)}
                {Array.from({ length: Math.max(slotCount - tier.relics.length, 0) }, (_, idx) => <Card key={`${tier.tier}-pending-${idx + 1}`} className="border-dashed border-primary/20 bg-background/50">
                  <CardContent className="flex min-h-48 flex-col justify-between p-5">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-primary">Unknown Relic</p>
                      <div className="flex items-center gap-3">
                        <img src={getRelicImageSrc(tier.tier)} alt="Unknown relic icon" className="h-[60px] w-[60px] shrink-0" />
                        <p className="text-lg font-semibold">Tier {tier.tier} relic pending</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Awaiting Jagex Reveal</p>
                  </CardContent>
                </Card>)}
              </div>;
            }

            return <Card key={tier.tier} id={`T${tier.tier}`} className="scroll-mt-24 border-border bg-card/90">
              <CardHeader className="border-b border-border/80">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-primary">Tier {tier.tier}</p>
                    <CardTitle className="mt-2 text-2xl">{tier.title}</CardTitle>
                  </div>
                  <p className="max-w-xl text-sm text-muted-foreground">{tier.status}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div>
                    <p className="mb-3 text-sm font-semibold">Passive Effects</p>
                    <PassiveList items={tier.passiveEffects} />
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-sm font-semibold">Relics</p>
                  {relicContent}
                </div>
              </CardContent>
            </Card>;
          })}
        </div>
      </div>
    </section>
  </LeaguePageFrame>;
}