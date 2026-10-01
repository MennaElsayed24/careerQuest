import { ArrowLeft, Compass, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import WorkspaceShell from "../components/workspace/WorkspaceShell";
import { ROUTES } from "../routes/paths";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <WorkspaceShell title="Page not found">
      <section className="not-found-panel">
        <div className="not-found-icon"><SearchX size={23} /></div>
        <span>404 / UNAVAILABLE PAGE</span>
        <h2>This page isn’t in your workspace.</h2>
        <p>Check the address, or return to a CareerQuest screen.</p>
        <div className="not-found-actions">
          <Link to={ROUTES.dashboard} className="not-found-primary-link">
            <ArrowLeft size={15} />
            Back to dashboard
          </Link>
          <Link to={ROUTES.careers} className="not-found-secondary-link">
            <Compass size={15} />
            Explore careers
          </Link>
        </div>
      </section>
    </WorkspaceShell>
  );
}