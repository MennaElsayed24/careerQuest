import {
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  History,
  LayoutDashboard,
  NotebookPen,
  Target,
} from "lucide-react";

export const WORKSPACE_NAVIGATION = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Career Explorer", path: "/careers", icon: Compass },
  { label: "My Assessment", path: "/assessment", icon: CheckCircle2 },
  { label: "Tasks", path: "/tasks", icon: CheckCircle2 },
  { label: "Notes", path: "/notes", icon: NotebookPen },
  { label: "Skill Gap", path: "/skill-gap", icon: Target },
  { label: "My Roadmap", path: "/roadmap", icon: BriefcaseBusiness },
  { label: "Resources", path: "/resources", icon: BookOpen },
  { label: "History", path: "/history", icon: History },
] as const;