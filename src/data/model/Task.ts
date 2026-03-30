import type { Skill } from "@/data/model/Skills";

type Task = {
  id: number;
  name: string;
  description: string;
  region: string;
  points: number;
  requirements: TaskRequirement[];
  difficulty: TaskDifficulty;
};

type TaskDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Elite' | 'Master';

type TaskSkillRequirement = {
  type: 'skill';
  skill: Skill;
  level: number;
}

type TaskItemRequirement = {
  type: 'item';
  item: string;
  quantity: number;
}

type TaskGoldRequirement = {
  type: 'gold';
  amount: number;
}

type TaskRegionRequirement = {
  type: 'region';
  region: string;
}

type TaskQuestRequirement = {
  type: 'quest';
  quest: string;
}

type TaskRelicRequirement = {
  type: 'relic';
  relic: string;
}

type TaskStringRequirement = {
  type: 'string';
  value: string;
}

type TaskComboRequirement = {
  type: 'combo';
  requirements: TaskRequirement[];
}

type TaskAnyRequirement = {
  type: 'any';
  requirements: TaskRequirement[];
}

type TaskRequirement = TaskSkillRequirement | TaskItemRequirement | TaskGoldRequirement | TaskRegionRequirement | TaskQuestRequirement | TaskRelicRequirement | TaskStringRequirement | TaskComboRequirement | TaskAnyRequirement;

export type { TaskDifficulty, TaskRequirement, TaskSkillRequirement, TaskItemRequirement, TaskGoldRequirement, TaskRegionRequirement, TaskQuestRequirement, TaskRelicRequirement, TaskStringRequirement, TaskComboRequirement, TaskAnyRequirement };
export default Task;