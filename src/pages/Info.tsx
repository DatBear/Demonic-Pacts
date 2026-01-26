import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Skull, Map, Swords, Gift, Flame, Users, Crown } from "lucide-react";

export default function Info() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />

        <div className="container relative mx-auto px-4 py-6">
          <Link to="/" className="absolute left-4 top-6">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>

          <div className="mx-auto max-w-4xl text-center pt-12 md:pt-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Skull className="h-4 w-4" />
              Official Announcement Summary
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Leagues VI: <span className="bg-gradient-to-b from-red-400 to-red-900 bg-clip-text text-transparent">Demonic Pacts</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Yama has taken interest in Leagues. Commit to a deadly entity for power beyond all normal possibility.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="flex items-center gap-4 p-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Release</p>
                  <p className="font-bold">April 2026</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="flex items-center gap-4 p-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-bold">8 Weeks</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="flex items-center gap-4 p-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Mode</p>
                  <p className="font-bold">Ironman</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Core Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Everyone plays as Ironman (no trading/GE)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Starting XP rate of 5x (increases with relics)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Unlimited run energy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Some quests auto-completed (Rune Mysteries, Druidic Ritual)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Choose from 3 starter relics (permanent choice)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Tasks range from Easy to Master tier</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Area-Locking Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-semibold text-primary">New Starting Region</p>
                <p className="text-muted-foreground">For the first time, you will NOT start in Misthalin. The new starting region is TBA.</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-semibold text-primary">Karamja: Free Unlock</p>
                <p className="text-muted-foreground">Karamja is still free but won't auto-unlock during tutorial. You'll be able to unlock it within the first few hours.</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-semibold text-primary">Yama's Lair</p>
                <p className="text-muted-foreground">Tutorial takes place in a special version of Yama's lair with The Sage imprisoned. Accessible anytime.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-primary" />
                New Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 font-semibold">Echo Bosses Return</p>
                  <p className="text-sm text-muted-foreground">More powerful, mechanically different boss variants. New rewards replacing some from last league.</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="mb-2 font-semibold">Demonic Pacts</p>
                  <p className="text-sm text-muted-foreground">Reworked Combat Masteries system with less linear progression and new unique boosts.</p>
                </div>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="font-semibold text-destructive">No Sailing</p>
                <p className="text-sm text-muted-foreground">Sailing excluded to let players experience it as intended first. Will be in 2027+ game modes.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Demonic Pacts Outfit</p>
                    <p className="text-xs text-muted-foreground">3-tier corruption transformation + cane</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Flame className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Home Teleport Animation</p>
                    <p className="text-xs text-muted-foreground">Demonic minions open a hellfire portal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Skull className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Demon Skin Colour</p>
                    <p className="text-xs text-muted-foreground">Transform your character's appearance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Swords className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Weapon Ornament Kits</p>
                    <p className="text-xs text-muted-foreground">Trident, Iban's Staff, Soulreaper Axe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Demonic Thralls</p>
                    <p className="text-xs text-muted-foreground">Yama's minions as thrall overrides</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Yama's Throne</p>
                    <p className="text-xs text-muted-foreground">POH throne cosmetic override</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Skull className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Oathplate Slayer Helm</p>
                    <p className="text-xs text-muted-foreground">Slayer helm variant with Oathplate look</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Demon Butler Override</p>
                    <p className="text-xs text-muted-foreground">Upgraded refined butler appearance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/10">
            <CardContent className="p-6 text-center">
              <p className="mb-4 text-lg font-semibold">Join the Community</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://discord.gg/4hM6AUpN" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2">
                    Leagues Discord
                  </Button>
                </a>
                <a href="https://secure.runescape.com/m=news/a=97/leagues-vi-demonic-pacts---announcement?oldschool=1" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    Full Announcement
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>This is a community-built tool for Old School RuneScape Leagues. Not affiliated with Jagex Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
