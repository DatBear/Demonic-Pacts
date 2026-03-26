import PlanRegion from "./PlanRegion";
import PlanRelic from "./PlanRelic";
import PlanTask from "./PlanTask";

type Plan = {
  regions: PlanRegion[];
  //combatMasteries: Plan[];
  relics: PlanRelic[];
  tasks: PlanTask[];
}