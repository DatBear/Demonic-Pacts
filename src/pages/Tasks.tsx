import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Filter, Gem, MapPinned, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaguePageFrame } from "@/components/LeaguePageFrame";
import ragingEchoesRegions from "@/data/raging-echoes-regions";
import ragingEchoesTasks from "@/data/raging-echoes-tasks";
import type { TaskDifficulty, TaskRequirement } from "@/data/model/Task";
import { cn } from "@/lib/utils";

interface RegionTaskSummary {
  region: string;
  totalTasks: number;
  totalPoints: number;
  difficultyCounts: Record<TaskDifficulty, number>;
}

const difficultyColumns: TaskDifficulty[] = ["Easy", "Medium", "Hard", "Elite", "Master"];
const difficultyOptions: Array<TaskDifficulty | "All"> = ["All", ...difficultyColumns];
const difficultyOrder: Record<TaskDifficulty, number> = { Easy: 0, Medium: 1, Hard: 2, Elite: 3, Master: 4 };
const regionOrder = Object.fromEntries(ragingEchoesRegions.map((region, idx) => [region.name, idx]));
const regionBadgeImages = Object.fromEntries(ragingEchoesRegions.map(region => [region.name, region.badgeImage]));
const initialRegionEnabledState = Object.fromEntries(ragingEchoesRegions.map(region => [region.name, true])) as Record<string, boolean>;
const initialDifficultyEnabledState = Object.fromEntries(difficultyColumns.map(difficulty => [difficulty, true])) as Record<TaskDifficulty, boolean>;

interface RegionBadgeProps {
  region: string;
  className?: string;
}

function normalizeRequirement(requirement: TaskRequirement): TaskRequirement | null {
  if (requirement.type === "string") {
    const normalizedValue = requirement.value.trim().toLowerCase();

    if (normalizedValue === "or" || normalizedValue === "and") {
      return null;
    }

    return requirement;
  }

  if (requirement.type === "combo" || requirement.type === "any") {
    const nestedRequirements = requirement.requirements.map(normalizeRequirement).filter((nestedRequirement): nestedRequirement is TaskRequirement => nestedRequirement !== null);

    if (nestedRequirements.length === 0) {
      return null;
    }

    return {
      ...requirement,
      requirements: nestedRequirements,
    };
  }

  return requirement;
}

function joinRequirementText(parts: string[], conjunction: "and" | "or") {
  if (parts.length === 0) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} ${conjunction} ${parts[1]}`;
  }

  return `${parts.slice(0, -1).join(", ")}, ${conjunction} ${parts[parts.length - 1]}`;
}

function formatRequirementText(requirement: TaskRequirement, isNestedGroup = false): string {
  if (requirement.type === "skill") {
    return `${requirement.level} ${requirement.skill}`;
  }

  if (requirement.type === "item") {
    if (requirement.quantity === 1) {
      return requirement.item;
    }

    return `${requirement.quantity}x ${requirement.item}`;
  }

  if (requirement.type === "gold") {
    return `${requirement.amount.toLocaleString()} coins`;
  }

  if (requirement.type === "region") {
    return `${requirement.region}`;
  }

  if (requirement.type === "quest") {
    return `Quest: ${requirement.quest}`;
  }

  if (requirement.type === "relic") {
    return `Relic: ${requirement.relic}`;
  }

  if (requirement.type === "string") {
    return requirement.value;
  }

  if (requirement.type === "combo") {
    const formattedRequirements = requirement.requirements.map(nestedRequirement => formatRequirementText(nestedRequirement, true));
    const content = joinRequirementText(formattedRequirements, "and");

    if (isNestedGroup && formattedRequirements.length > 1) {
      return `(${content})`;
    }

    return content;
  }

  const formattedRequirements = requirement.requirements.map(nestedRequirement => formatRequirementText(nestedRequirement, true));
  const content = joinRequirementText(formattedRequirements, "or");

  if (isNestedGroup && formattedRequirements.length > 1) {
    return `(${content})`;
  }

  return content;
}

function RequirementList({ requirements }: { requirements: TaskRequirement[] }) {
  const meaningfulRequirements = requirements.map(normalizeRequirement).filter((requirement): requirement is TaskRequirement => requirement !== null);

  let content = <span className="text-sm text-muted-foreground">None</span>;

  if (meaningfulRequirements.length > 0) {
    content = <div className="space-y-2">
      {meaningfulRequirements.map((requirement, idx) => <div key={`${requirement.type}-${idx}`} className="text-sm text-muted-foreground">
        {formatRequirementText(requirement)}
      </div>)}
    </div>;
  }

  return <>{content}</>;
}

function getDifficultyPointsClassName(difficulty: TaskDifficulty) {
  if (difficulty === "Easy") {
    return "text-emerald-300";
  }

  if (difficulty === "Medium") {
    return "text-sky-300";
  }

  if (difficulty === "Hard") {
    return "text-amber-300";
  }

  if (difficulty === "Elite") {
    return "text-fuchsia-300";
  }

  return "text-rose-300";
}

function RegionBadge({ region, className }: RegionBadgeProps) {
  const badgeImage = regionBadgeImages[region];
  let content = <span className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground", className)}>{region}</span>;

  if (badgeImage.length > 0) {
    content = <img src={badgeImage} alt={`${region} badge`} className={cn("h-5 w-5 object-contain drop-shadow-[0_0_8px_rgba(15,23,42,0.25)]", className)} />;
  }

  return <>{content}</>;
}

export default function Tasks() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskDifficulty | "All">("All");
  const [enabledRegions, setEnabledRegions] = useState<Record<string, boolean>>(initialRegionEnabledState);
  const [enabledDifficulties, setEnabledDifficulties] = useState<Record<TaskDifficulty, boolean>>(initialDifficultyEnabledState);

  const regionSummaries: RegionTaskSummary[] = ragingEchoesRegions.map(region => {
    const regionTasks = ragingEchoesTasks.filter(task => task.region === region.name && (enabledDifficulties[task.difficulty] ?? true));
    const difficultyCounts: Record<TaskDifficulty, number> = { Easy: 0, Medium: 0, Hard: 0, Elite: 0, Master: 0 };

    regionTasks.forEach(task => {
      difficultyCounts[task.difficulty] += 1;
    });

    return {
      region: region.name,
      totalTasks: regionTasks.length,
      totalPoints: regionTasks.reduce((sum, task) => sum + task.points, 0),
      difficultyCounts,
    };
  });

  let filteredTasks = ragingEchoesTasks.filter(task => enabledRegions[task.region] ?? true);

  filteredTasks = filteredTasks.filter(task => enabledDifficulties[task.difficulty] ?? true);

  if (selectedRegion !== "All") {
    filteredTasks = filteredTasks.filter(task => task.region === selectedRegion);
  }

  if (selectedDifficulty !== "All") {
    filteredTasks = filteredTasks.filter(task => task.difficulty === selectedDifficulty);
  }

  filteredTasks = [...filteredTasks].sort((leftTask, rightTask) => {
    const regionDifference = (regionOrder[leftTask.region] ?? Number.MAX_SAFE_INTEGER) - (regionOrder[rightTask.region] ?? Number.MAX_SAFE_INTEGER);
    if (regionDifference !== 0) {
      return regionDifference;
    }

    const difficultyDifference = difficultyOrder[leftTask.difficulty] - difficultyOrder[rightTask.difficulty];
    if (difficultyDifference !== 0) {
      return difficultyDifference;
    }

    if (leftTask.points !== rightTask.points) {
      return leftTask.points - rightTask.points;
    }

    return leftTask.name.localeCompare(rightTask.name);
  });

  const visibleTaskPoints = filteredTasks.reduce((sum, task) => sum + task.points, 0);
  const enabledRegionCount = Object.values(enabledRegions).filter(Boolean).length;
  const allRegionsEnabled = enabledRegionCount === ragingEchoesRegions.length;
  const noRegionsEnabled = enabledRegionCount === 0;

  const handleRegionToggle = (regionName: string) => {
    setEnabledRegions(currentState => ({
      ...currentState,
      [regionName]: !currentState[regionName],
    }));
  };

  const handleAllRegionsToggle = (nextValue: boolean) => {
    const nextState = Object.fromEntries(ragingEchoesRegions.map(region => [region.name, nextValue])) as Record<string, boolean>;
    setEnabledRegions(nextState);
  };

  const handleDifficultyToggle = (difficulty: TaskDifficulty) => {
    setEnabledDifficulties(currentState => ({
      ...currentState,
      [difficulty]: !currentState[difficulty],
    }));
  };

  let taskTableBody = <tr>
    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
      No tasks match the current region, difficulty, and enabled-area filters.
    </td>
  </tr>;

  if (filteredTasks.length > 0) {
    taskTableBody = <>
      {filteredTasks.map(task => <tr key={task.id} className="border-b border-border/70 align-top transition-colors hover:bg-primary/5">
        <td className="w-5 align-middle">
          <RegionBadge region={task.region} className="h-5 w-5 ml-2" />
        </td>
        <td className="px-4 py-4">
          <p className="text-sm font-semibold text-foreground">{task.name}</p>
        </td>
        <td className="px-4 py-4 text-sm text-muted-foreground">{task.description}</td>
        <td className="min-w-[20rem] px-4 py-4"><RequirementList requirements={task.requirements} /></td>
        <td className={cn("px-4 py-4 text-right text-sm font-semibold", getDifficultyPointsClassName(task.difficulty))}>{task.points.toLocaleString()}</td>
      </tr>)}
    </>;
  }

  return <LeaguePageFrame
    eyebrow="Tasks"
    title="Raging Echoes Task Tracker"
    description="Filter the full Raging Echoes task pool by region, difficulty, and enabled areas, then use the regional command table to see how each unlock contributes points across the league."
    backTo="/info"
    backLabel="Back to League Info"
    actions={<>
      <Link to="/info#regions"><Button variant="outline">Region Overview</Button></Link>
      <Link to="/relics"><Button variant="outline">Relic Tracker</Button></Link>
    </>}
  >
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-[96rem] space-y-8">

        <section className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-primary">
              <MapPinned className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">Region Command Table</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => handleAllRegionsToggle(true)} disabled={allRegionsEnabled}>Enable All Regions</Button>
              <Button variant="secondary" onClick={() => handleAllRegionsToggle(false)} disabled={noRegionsEnabled}>Disable All Regions</Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 max-w-min">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="border-collapse text-left text-sm">
                  <thead className="bg-background/95">
                    <tr className="border-b border-border/80 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      <th className="px-4 py-4">Region</th>
                      <th className="px-4 py-4 text-right">Tasks</th>
                      {difficultyColumns.map(difficulty => <th key={difficulty} className="px-4 py-4 text-right">
                        <label className="inline-flex cursor-pointer items-center justify-end gap-2 select-none">
                          <input type="checkbox" checked={enabledDifficulties[difficulty]} onChange={() => handleDifficultyToggle(difficulty)} aria-label={`Filter ${difficulty} tasks`} className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary" />
                          <span className={getDifficultyPointsClassName(difficulty)}>{difficulty}</span>
                        </label>
                      </th>)}
                      <th className="px-4 py-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionSummaries.map(summary => <tr key={summary.region} onClick={() => handleRegionToggle(summary.region)} className={cn("border-b border-border/70 align-middle transition-colors hover:bg-primary/5 cursor-pointer", !enabledRegions[summary.region] && "opacity-50")}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 font-medium text-foreground">
                          <input type="checkbox" checked={enabledRegions[summary.region] ?? true} onClick={event => event.stopPropagation()} onChange={() => handleRegionToggle(summary.region)} aria-label={`Enable all tasks for ${summary.region}`} className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary" />
                          <RegionBadge region={summary.region} />
                          <span>{summary.region}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-foreground">{summary.totalTasks.toLocaleString()}</td>
                      {difficultyColumns.map(difficulty => <td key={difficulty} className={cn("px-4 py-4 text-right font-semibold", getDifficultyPointsClassName(difficulty))}>{summary.difficultyCounts[difficulty].toLocaleString()}</td>)}
                      <td className="px-4 py-4 text-right font-semibold text-foreground">{summary.totalPoints.toLocaleString()}</td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <CheckSquare className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Task Table</p>
          </div>

          <Card className="border-border bg-card/90">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-background/95 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <tr className="border-b border-border/80">
                      <th className=""></th>
                      <th className="px-4 py-4">Task</th>
                      <th className="px-4 py-4">Description</th>
                      <th className="px-4 py-4">Requirements</th>
                      <th className="px-4 py-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskTableBody}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/10">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Data Source</p>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">This page is driven directly from the generated Raging Echoes task dataset, including structured requirements and league point values.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/info"><Button variant="outline">League Info</Button></Link>
              <Link to="/relics"><Button variant="outline">Relics</Button></Link>
              <a href="https://oldschool.runescape.wiki/w/Raging_Echoes_League/Tasks" target="_blank" rel="noopener noreferrer"><Button>Wiki Task Source</Button></a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </LeaguePageFrame>;
}