import { ArrowRight, Clock3, History, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { assessmentQuestions } from "../../data/assessment/questions";
import { ROUTES } from "../../routes/paths";
import { useAssessmentStore } from "../../store/assessmentStore";
import "./HistoryPage.css";

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const history = useAssessmentStore((state) => state.history);
  const removeHistoryEntry = useAssessmentStore(
    (state) => state.removeHistoryEntry,
  );

  return (
    <WorkspaceShell
      title="Assessment History"
      description="Review completed assessment attempts and the answers you gave."
      action={
        history.length > 0 ? (
          <Link to={ROUTES.assessment} className="history-new-button">
            Take assessment again
            <ArrowRight size={15} />
          </Link>
        ) : undefined
      }
    >
      {history.length === 0 ? (
        <section className="history-empty">
          <div className="history-empty-icon"><History size={22} /></div>
          <span className="history-eyebrow">YOUR ACTIVITY</span>
          <h2>No completed assessments yet.</h2>
          <p>
            Completed assessment attempts will appear here with their saved
            answers and completion date.
          </p>
          <Link to={ROUTES.assessment} className="history-new-button">
            Start assessment
            <ArrowRight size={15} />
          </Link>
        </section>
      ) : (
        <section className="history-list" aria-label="Completed assessments">
          {history.map((entry, index) => {
            const answeredCount = entry.answers.length;

            return (
              <article
                className="history-entry"
                key={entry.id}
                style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
              >
                <div className="history-entry-top">
                  <div className="history-entry-icon"><History size={17} /></div>
                  <div className="history-entry-heading">
                    <span className="history-eyebrow">COMPLETED ASSESSMENT</span>
                    <h2>Career discovery</h2>
                    <span className="history-date">{formatDate(entry.completedAt)}</span>
                  </div>
                  <button
                    type="button"
                    className="history-delete-button"
                    onClick={() => removeHistoryEntry(entry.id)}
                    aria-label="Remove assessment from history"
                    title="Remove from history"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="history-entry-meta">
                  <span><Clock3 size={14} /> {answeredCount} answers saved</span>
                  {entry.startedAt && (
                    <span>Started {formatDate(entry.startedAt)}</span>
                  )}
                </div>

                <details className="history-answer-details">
                  <summary>Review answers</summary>
                  <div className="history-answer-list">
                    {assessmentQuestions.map((question) => {
                      const answer = entry.answers.find(
                        (item) => item.questionId === question.id,
                      )?.value;
                      const values = Array.isArray(answer)
                        ? answer.map(String)
                        : answer === undefined
                          ? []
                          : [String(answer)];
                      const labels = question.options
                        .filter((option) => values.includes(option.value))
                        .map((option) => option.label);

                      return (
                        <div className="history-answer-row" key={question.id}>
                          <span>{question.question}</span>
                          <strong>{labels.join(", ") || "No answer recorded"}</strong>
                        </div>
                      );
                    })}
                  </div>
                </details>
              </article>
            );
          })}
        </section>
      )}
    </WorkspaceShell>
  );
}