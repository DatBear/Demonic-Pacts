import PlanCombatMastery from "./PlanCombatMastery";
import PlanRegion from "./PlanRegion";
import PlanRelic from "./PlanRelic";
import PlanRoute from "./PlanRoute";

type Plan = {
  regions: PlanRegion[];
  relics: PlanRelic[];
  combatMasteries: PlanCombatMastery[];
  route: PlanRoute[];
}

export default Plan;