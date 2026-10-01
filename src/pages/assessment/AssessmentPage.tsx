import AssessmentForm from "../../features/assessment/AssessmentForm";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import "./AssessmentPage.css";

export default function AssessmentPage() {
  return (
    <WorkspaceShell title="Career Assessment">
      <section className="assessment-page">
        <AssessmentForm />
      </section>
    </WorkspaceShell>
  );
}