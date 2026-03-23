import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaguePageFrameProps {
  eyebrow: string;
  title: string;
  description: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function LeaguePageFrame({
  eyebrow,
  title,
  description,
  backTo = "/",
  backLabel = "Back to Home",
  actions,
  children,
}: LeaguePageFrameProps) {
  let actionsBlock = null;

  if (actions) {
    actionsBlock = <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>;
  }

  return <>
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,24,24,0.16),_transparent_45%)] league-embers" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.03)_0%,_transparent_20%,_transparent_80%,_rgba(255,255,255,0.02)_100%)]" />

      <header className="relative border-b border-primary/20 bg-gradient-to-b from-primary/10 via-background/95 to-background">
        <div className="container mx-auto px-4 py-6">
          <Link to={backTo} className="inline-flex items-center">
            <Button variant="ghost" size="default" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Button>
          </Link>

          <div className="mx-auto max-w-4xl pt-6 text-center md:pt-2">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-primary">
              <Flame className="h-4 w-4" />
              {eyebrow}
              <Flame className="h-4 w-4" />
            </div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              <span className="bg-gradient-to-b from-red-300 via-red-500 to-red-900 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(220,38,38,0.22)]">
                {title}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
              {description}
            </p>

            {actionsBlock}
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="relative border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>This is a community-built tool for Old School RuneScape Leagues. Not affiliated with Jagex Ltd.</p>
        </div>
      </footer>
    </div>
  </>;
}