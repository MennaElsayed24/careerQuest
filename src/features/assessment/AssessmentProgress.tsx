interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function AssessmentProgress({
  currentQuestion,
  totalQuestions,
}: AssessmentProgressProps) {
  const progress =
    totalQuestions === 0
      ? 0
      : Math.round(
          ((currentQuestion + 1) /
            totalQuestions) *
            100,
        );

  return (
    <div className="assessment-progress">
      <div className="assessment-progress-heading">
        <span>
          QUESTION {currentQuestion + 1} OF {totalQuestions}
        </span>
        <strong>{progress}% complete</strong>
      </div>

      <div
        className="assessment-progress-track"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}