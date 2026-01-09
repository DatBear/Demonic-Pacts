import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronRight, Target, Sword, Trophy, BookOpen, Calendar, Map, Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; // Set volume to 5%
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="/bg.wav" loop />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />

        <div className="container relative mx-auto px-4 py-16 md:py-10">
          <div className="mx-auto max-w-4exl text-center">

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master Your<br /> League Strategy
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              The ultimate planning tool for Old School RuneScape Leagues. <br />
              Full planning features will be added soon after the January 25th reveal.<br />
              Get ready to dominate the point leaderboards.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
              <img src="/Splash.png" alt="Leagues VI: Demonic Pacts" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {/* <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Everything You Need to Conquer Leagues</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Powerful planning tools designed for competitive OSRS players
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Region Planning</h3>
              <p className="text-muted-foreground">
                Compare all unlockable regions and plan your optimal progression path based on your playstyle and goals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Relic Optimizer</h3>
              <p className="text-muted-foreground">
                Explore all relic tiers and build the perfect loadout for maximum power and efficiency throughout the
                league.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Task Tracker</h3>
              <p className="text-muted-foreground">
                Track your league points progress and prioritize high-value tasks to unlock regions and relics faster.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sword className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Combat Masteries</h3>
              <p className="text-muted-foreground">
                Plan your combat mastery progression and optimize your build for PvM dominance in your chosen style.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trophy Calculator</h3>
              <p className="text-muted-foreground">
                Set your trophy tier goals and calculate the exact point requirements to achieve your target rank.
              </p>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* League Timeline */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              Coming Soon
            </div>

            <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">More Details Revealed January 25, 2026</h2>

            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Full details about Demonic Pacts including regions, relics, and new mechanics will be revealed on January
              25th. Check back here soon after the reveal so you can optimize your strategy before league start!
            </p>

            <div className="grid gap-6 text-left sm:grid-cols-2">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">Previous League</h3>
                  <p className="mb-1 text-2xl font-bold">Raging Echoes</p>
                  <p className="text-sm text-muted-foreground">Nov 27, 2024 - Jan 22, 2025</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">Next League</h3>
                  <p className="mb-1 text-2xl font-bold">Demonic Pacts</p>
                  <p className="text-sm text-muted-foreground">Reveal: January 25, 2026</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">Ready to Dominate the Leaderboards?</h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Join thousands of players using our planner to optimize their <br />league strategy and achieve their dragon trophy dreams.
          </p>
          <Button size="lg" disabled>
            Get Started <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>This is a community-built tool for Old School RuneScape Leagues. Not affiliated with Jagex Ltd.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50"
          onClick={toggleAudio}
        >
          {isPlaying && <Volume2 className="h-6 w-6 text-primary" />}
          {!isPlaying && <VolumeX className="h-6 w-6 text-muted-foreground" />}
        </Button>
      </div>
    </div>
  )
}
