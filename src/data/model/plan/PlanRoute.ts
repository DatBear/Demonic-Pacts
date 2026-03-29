type PlanRoute = {
  items: PlanRouteItem[];
};

type PlanRouteItem =
  (PlanRouteTask | PlanRouteSkill | PlanRouteQuest | PlanRouteRegionUnlock | PlanRouteRelicUnlock)
  & RouteTaskDetail;

type RouteTaskDetail = {
  order: number;
  note: string;
}

type PlanRouteTask = {
  type: 'task';
  taskId: number;
}

type PlanRouteSkill = {
  type: 'skill';
  skill: string;
  level: number;
}

type PlanRouteQuest = {
  type: 'quest';
  quest: string;
}

type PlanRouteRegionUnlock = {
  type: 'regionUnlock';
  code: string;
}

type PlanRouteRelicUnlock = {
  type: 'relicUnlock';
  code: string;
}

export default PlanRoute;