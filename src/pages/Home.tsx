import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ChevronRight, Compass, Calendar, Flame, Volume2, VolumeX, Skull } from "lucide-react";

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
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />

        <div className="container relative mx-auto px-4 py-16 md:py-10">
          <div className="mx-auto max-w-4exl text-center">

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master Your<br /> League Strategy
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              The ultimate planning tool for Old School RuneScape's <span className="bg-gradient-to-b from-red-400 to-red-900 bg-clip-text text-transparent font-bold">Demonic Pacts</span> League. <br />
              Full planning features will be added before the league launch.<br />
              Get ready to dominate the point leaderboards.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/info">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
                  <Skull className="h-5 w-5" />
                  View League Info
                </Button>
              </Link>

              <Link to="/relics">
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 bg-background/70 text-foreground hover:bg-primary/10">
                  <Flame className="h-5 w-5 text-primary" />
                  Browse Relics
                </Button>
              </Link>

              {/* <Link to="/plan">
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 bg-background/70 text-foreground hover:bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Open Planner
                </Button>
              </Link> */}

              <Link to="/info#regions">
                <Button size="lg" variant="outline" className="gap-2 border-primary/30 bg-background/70 text-foreground hover:bg-primary/10">
                  <Compass className="h-5 w-5 text-primary" />
                  Regions
                </Button>
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
              <img
                src="/Splash.webp"
                alt="Leagues VI: Demonic Pacts"
                className="object-cover w-full h-full"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              Coming Soon
            </div>

            <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">League Launches April 15, 2026</h2>

            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Check back here before league launch so you can optimize your strategy!
            </p>

            <div className="mb-8 grid gap-6 text-left sm:grid-cols-2">
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
                  <p className="mb-1 text-2xl font-bold"><span className="bg-gradient-to-b from-red-400 to-red-900 bg-clip-text text-transparent font-bold">Demonic Pacts</span></p>
                  <p className="text-sm text-muted-foreground">April 15, 2026</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 text-left md:grid-cols-3">
              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-5">
                  <BookOpen className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-semibold">Expanded League Hub</p>
                  <p className="mt-2 text-sm text-muted-foreground">Updated rules, starting setup, Varlamore notes, and league-wide modifiers from the March 23 reveal post.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-5">
                  <Compass className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-semibold">Unlockable Region Pages</p>
                  <p className="mt-2 text-sm text-muted-foreground">Every unlockable region now has its own detailed page with key details, unlocks, and drop targets.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-5">
                  <Flame className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-semibold">Relic Tracker</p>
                  <p className="mt-2 text-sm text-muted-foreground">Tier 1, Tier 6, and Tier 8 relics have been revealed. <br />Check back there as Jagex reveals the details for the remaining tiers!</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-5">
                  <BookOpen className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-semibold">Plan Builder</p>
                  <p className="mt-2 text-sm text-muted-foreground">Pick your flexible regions, spend combat mastery points, and lock in revealed relics in the new Demonic Pacts planner.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
        >
          {isPlaying && <Volume2 className="h-6 w-6 text-primary" />}
          {!isPlaying && <VolumeX className="h-6 w-6 text-muted-foreground" />}
        </Button>
      </div>
    </div>
  );
}
