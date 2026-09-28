export type RoadmapItemStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "completed";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  skillId?: string;
  resourceIds: string[];
  status: RoadmapItemStatus;
}

export interface Roadmap {
  id: string;
  careerId: string;
  items: RoadmapItem[];
  createdAt?: string;
  updatedAt?: string;
}