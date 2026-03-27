import PlanRegion from "./PlanRegion";
import PlanRelic from "./PlanRelic";
import PlanTask from "./PlanTask";

type Plan = {
  regions: PlanRegion[];
  relics: PlanRelic[];
  tasks: PlanTask[];
}

export default Plan;