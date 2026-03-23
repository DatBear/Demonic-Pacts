import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Clock3, Compass, Flame, Gem, LockOpen, MapPinned, ScrollText, Skull, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaguePageFrame } from "@/components/LeaguePageFrame";
import { contentChangeGroups, initialSetupGroups, leagueQuickStats, leagueRules, tierOnePassives, unlockableRegions, varlamoreDrops, varlamoreGroups, varlamorePreparation, yamasLairNotes } from "@/data/league-data";

function BulletList({ items }: { items: string[] }) {
  return <ul className="grid gap-3 text-sm text-muted-foreground">
    {items.map(item => <li key={item} className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span className="leading-6">{item}</span>
    </li>)}
  </ul>;
}

function SectionGroupCard({ title, items }: { title: string; items: string[] }) {
  return <Card className="border-border bg-card/90">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <BulletList items={items} />
    </CardContent>
  </Card>;
}

export default function Info() {
  const statIcons = [Calendar, Clock3, Users, Compass];
  const autoCompletedQuestsGroup = initialSetupGroups[0];
  const startingCombatAchievementsGroup = initialSetupGroups[1];
  const startingStatsGroup = initialSetupGroups[2];
  const starterUtilityGroup = initialSetupGroups[3];

  return <LeaguePageFrame
    eyebrow="Leagues VI"
    title="Demonic Pacts"
    description="Updated from the March 23 official roundup: the revised start, Varlamore opening route, league-wide rule changes, unlockable region references, and the first revealed relic tier."
    actions={<>
      <a href="#regions"><Button>Unlockable Regions</Button></a>
      <Link to="/relics"><Button variant="outline">Relics</Button></Link>
      <a href="https://secure.runescape.com/m=news/get-ready-for-leagues-vi-demonic-pacts---april-15th?oldschool=1" target="_blank" rel="noopener noreferrer"><Button variant="outline">Official Post</Button></a>
    </>}
  >
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leagueQuickStats.map((stat, idx) => {
            const Icon = statIcons[idx];

            return <Card key={stat.label} className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="flex items-center gap-4 p-5">
                <Icon className="h-7 w-7 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>;
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ScrollText className="h-5 w-5 text-primary" /> Core Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <BulletList items={leagueRules} />
            </CardContent>
          </Card>

          <Card className="border-border bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />League-Wide Starting Passives</CardTitle>
            </CardHeader>
            <CardContent>
              <BulletList items={tierOnePassives} />
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Initial Setup</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <SectionGroupCard title={autoCompletedQuestsGroup.title} items={autoCompletedQuestsGroup.items} />
            <div className="grid gap-6">
              <SectionGroupCard title={startingCombatAchievementsGroup.title} items={startingCombatAchievementsGroup.items} />
              <SectionGroupCard title={startingStatsGroup.title} items={startingStatsGroup.items} />
            </div>
            <SectionGroupCard title={starterUtilityGroup.title} items={starterUtilityGroup.items} />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Flame className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">League-Wide Changes</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {contentChangeGroups.map(group => <SectionGroupCard key={group.title} title={group.title} items={group.items} />)}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Skull className="h-5 w-5 text-primary" /> Yama's Lair</CardTitle>
            </CardHeader>
            <CardContent>
              <BulletList items={yamasLairNotes} />
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPinned className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Starting Area: Varlamore</p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/10">
            <CardContent className="space-y-4 p-6 text-sm text-muted-foreground">
              <p>Varlamore is the opening region for every league account, replacing Misthalin and forcing an unfamiliar early route for everyone.</p>
              <p>The region is intentionally dense enough to support the opening phase on its own, with broad PvM, Slayer, skilling, and shop coverage before your first true unlock arrives.</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {varlamoreGroups.map(group => <SectionGroupCard key={group.title} title={group.title} items={group.items} />)}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <SectionGroupCard title="Early Routing Notes" items={varlamorePreparation} />
            <SectionGroupCard title="Key Varlamore Drops" items={varlamoreDrops} />
          </div>
        </section>

        <section id="regions" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-primary">
            <Compass className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Unlockable Regions</p>
          </div>

          <Card className="border-border bg-card/90">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Karamja is your forced first unlock once you hit the area-unlock threshold. After that, you choose three more regions yourself. Each page below breaks out the revealed overview, unlocks, and notable drop targets for that region.
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {unlockableRegions.map(region => <Card key={region.slug} className="h-full border-primary/20 bg-gradient-to-br from-card to-primary/5 transition-colors hover:border-primary/40">
              <CardContent className="flex h-full flex-col p-5">
                <div>
                  <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-primary">{region.name}</p>
                  <p className="mt-2 text-lg font-semibold leading-tight">{region.strapline}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{region.summary}</p>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {region.cardHighlights.map(highlight => <p key={highlight} className="rounded-md border border-border bg-background/60 px-3 py-2">{highlight}</p>)}
                </div>
                <Link to={`/regions/${region.slug}`} className="mt-auto pt-3">
                  <Button className="group w-full gap-2">More details <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></Button>
                </Link>
              </CardContent>
            </Card>)}
          </div>
        </section>

        <section id="relics" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 text-primary">
            <Gem className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Relics and Passive Tiers</p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle>Relic Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">The full relic tier breakdown, revealed choices, and unrevealed slots now live on the dedicated relic tracker page.</p>
              <Link to="/relics">
                <Button>Open Relic Tracker</Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <LockOpen className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Keep Following Reveals</p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/10">
            <CardContent className="p-6 text-center">
              <p className="mx-auto mb-4 max-w-3xl text-sm text-muted-foreground">Jagex said a new Leagues VI reveal will drop every day until launch. This hub now has the structure to keep layering those reveals in as the region, relic, and pact systems get clearer.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://discord.gg/4hM6AUpN" target="_blank" rel="noopener noreferrer"><Button variant="secondary">Leagues Discord</Button></a>
                <a href="https://secure.runescape.com/m=news/get-ready-for-leagues-vi-demonic-pacts---april-15th?oldschool=1" target="_blank" rel="noopener noreferrer"><Button variant="outline">Official Reveal Post</Button></a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  </LeaguePageFrame>;
}
