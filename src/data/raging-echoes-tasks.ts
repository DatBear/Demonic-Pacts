import taskPayload from "@/data/raging-echoes-tasks.json?raw";
import type Task from "@/data/model/Task";

const ragingEchoesTasks = JSON.parse(taskPayload) as Task[];

export default ragingEchoesTasks;
