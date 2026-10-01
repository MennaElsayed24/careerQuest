import { Routes, Route } from "react-router-dom";

import { ROUTES } from "./paths";

import HomePage from "../pages/public/HomePage";
import AssessmentPage from "../pages/assessment/AssessmentPage";
import CareersPage from "../pages/careers/CareersPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RoadmapPage from "../pages/roadmap/RoadmapPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import SignUpPage from "../pages/auth/SignUpPage";
import SignInPage from "../pages/auth/SignInPage";
import NotesPage from "../pages/notes/NotesPage";
import ResourcesPage from "../pages/resources/ResourcesPage";
import TasksPage from "../pages/tasks/TasksPage";
import SettingsPage from "../pages/settings/SettingsPage";
import SkillGapPage from "../pages/skill-gap/SkillGapPage";
import HistoryPage from "../pages/history/HistoryPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={<HomePage />}
      />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />
      <Route path={ROUTES.signIn} element={<SignInPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.assessment} element={<AssessmentPage />} />
        <Route path={ROUTES.careers} element={<CareersPage />} />
        <Route path={ROUTES.careerDetails} element={<CareersPage />} />
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.tasks} element={<TasksPage />} />
        <Route path={ROUTES.notes} element={<NotesPage />} />
        <Route path={ROUTES.skillGap} element={<SkillGapPage />} />
        <Route path={ROUTES.roadmap} element={<RoadmapPage />} />
        <Route path={ROUTES.resources} element={<ResourcesPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.settings} element={<SettingsPage />} />
      </Route>

      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
    </Routes>
  );
}