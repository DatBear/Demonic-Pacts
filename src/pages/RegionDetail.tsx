import { Link, useParams } from "react-router-dom";
import { Gem, LockOpen, MapPinned, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaguePageFrame } from "@/components/LeaguePageFrame";
import { getRegionBySlug, unlockableRegions } from "@/data/league-data";

function RegionListCard({ title, items }: { title: string; items: string[] }) {
  return <Card className="border-border bg-card/90">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="grid gap-3 text-sm text-muted-foreground">
        {items.map(item => <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="leading-6">{item}</span>
        </li>)}
      </ul>
    </CardContent>
  </Card>;
}

export default function RegionDetail() {
  const { regionSlug } = useParams();
  const region = getRegionBySlug(regionSlug);

  const regionButtons = unlockableRegions.map(regionOption => {
    const isCurrentRegion = regionOption.slug === regionSlug;

    if (isCurrentRegion) {
      return <Button key={regionOption.slug} className="justify-start" aria-current="page" disabled>
        {regionOption.name}
      </Button>;
    }

    return <Button key={regionOption.slug} variant="outline" className="justify-start" asChild>
      <Link to={`/regions/${regionOption.slug}`}>{regionOption.name}</Link>
    </Button>;
  });

  if (!region) {
    return <LeaguePageFrame
      eyebrow="Unlockable Regions"
      title="Region Not Found"
      description="That region page does not exist. Use the league info hub to jump into one of the revealed unlockable regions."
      backTo="/info"
      backLabel="Back to League Info"
      actions={<Link to="/info#regions"><Button>Open Region Index</Button></Link>}
    >
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/10">
            <CardContent className="p-6 text-center text-muted-foreground">
              Pick a region from the league info page to view the revealed overview, unlocks, and drop targets.
            </CardContent>
          </Card>
        </div>
      </section>
    </LeaguePageFrame>;
  }

  return <LeaguePageFrame
    eyebrow="Unlockable Regions"
    title={region.name}
    description={region.summary}
    backTo="/info"
    backLabel="Back to League Info"
    actions={<>
      <Link to="/relics"><Button variant="outline">View Relics</Button></Link>
      <Link to="/info#regions"><Button>All Region Pages</Button></Link>
    </>}
  >
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {region.cardHighlights.map(highlight => <Card key={highlight} className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Focus</p>
              <p className="mt-2 text-lg font-semibold">{highlight}</p>
            </CardContent>
          </Card>)}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="flex h-full flex-col border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ScrollText className="h-5 w-5 text-primary" /> Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              {region.overview.map(note => <p key={note} className="text-sm leading-6 text-muted-foreground">{note}</p>)}
              <p className="mt-auto rounded-lg border border-primary/20 bg-background/60 p-4 text-sm text-muted-foreground">{region.strapline}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPinned className="h-5 w-5 text-primary" /> Travel Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm text-muted-foreground">
                {region.travelRestrictions.length === 0 && <li className="rounded-lg border border-border bg-background/60 p-4">No extra travel blockers were called out beyond the league-wide transport restrictions for this region.</li>}
                {region.travelRestrictions.map(item => <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-6">{item}</span>
                </li>)}
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPinned className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Key Details</p>
          </div>
          <div className="grid gap-6 md:grid-cols-1">
            {region.keyDetails.map(group => <RegionListCard key={group.title} title={group.title} items={group.items} />)}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <LockOpen className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Unlocks</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {region.unlocks.map(group => <RegionListCard key={group.title} title={group.title} items={group.items} />)}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Gem className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Drops</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {region.drops.map(group => <RegionListCard key={group.title} title={group.title} items={group.items} />)}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPinned className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Browse Regions</p>
          </div>
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Other Available Regions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">Jump directly to any other revealed region page. The current region stays highlighted so you can keep your place while comparing routes.</p>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {regionButtons}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  </LeaguePageFrame>;
}