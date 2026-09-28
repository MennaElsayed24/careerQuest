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
    <div>
      <div>
        <span>Progress</span>

        <span>{progress}%</span>
      </div>

      <progress
        value={progress}
        max={100}
      />
    </div>
  );
}