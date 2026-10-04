export type TaskStatus = "Pending" | "In Progress" | "Done";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  statusBeforeDone?: Exclude<TaskStatus, "Done">;
  category: string;
  createdAt: string;
}

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finish React Hooks lesson",
    priority: "High",
    status: "In Progress",
    category: "React",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Submit Portfolio project",
    priority: "Medium",
    status: "Pending",
    category: "Project",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Review JavaScript ES6+",
    priority: "Low",
    status: "Done",
    category: "JavaScript",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Watch React Router video",
    priority: "Medium",
    status: "Pending",
    category: "Routing",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Prepare Dashboard wireframe",
    priority: "High",
    status: "Done",
    category: "Project",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Push code to GitHub",
    priority: "Low",
    status: "Pending",
    category: "Project",
    createdAt: new Date().toISOString(),
  },
];