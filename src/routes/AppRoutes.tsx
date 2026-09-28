import { Routes, Route } from "react-router-dom";

import { ROUTES } from "./paths";

import AssessmentPage from "../pages/assessment/AssessmentPage";
import CareersPage from "../pages/careers/CareersPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RoadmapPage from "../pages/roadmap/RoadmapPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ApiTestPage from "../pages/ApiTestPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
       path="/api-test"
        element={<ApiTestPage />}
       />
      <Route
        path={ROUTES.assessment}
        element={<AssessmentPage />}
      />

      <Route
        path={ROUTES.careers}
        element={<CareersPage />}
      />

      <Route
        path={ROUTES.careerDetails}
        element={<CareersPage />}
      />

      <Route
        path={ROUTES.dashboard}
        element={<DashboardPage />}
      />

      <Route
        path={ROUTES.skillGap}
        element={<div>Skill Gap</div>}
      />

      <Route
        path={ROUTES.roadmap}
        element={<RoadmapPage />}
      />

      <Route
        path={ROUTES.resources}
        element={<div>Resources</div>}
      />

      <Route
        path={ROUTES.history}
        element={<div>Assessment History</div>}
      />

      <Route
        path={ROUTES.profile}
        element={<ProfilePage />}
      />

      <Route
        path={ROUTES.settings}
        element={<div>Settings</div>}
      />

      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
    </Routes>
  );
}