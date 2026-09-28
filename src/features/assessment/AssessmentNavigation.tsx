interface AssessmentNavigationProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  canContinue: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export default function AssessmentNavigation({
  isFirstQuestion,
  isLastQuestion,
  canContinue,
  onPrevious,
  onNext,
  onComplete,
}: AssessmentNavigationProps) {
  return (
    <nav>
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        Previous
      </button>

      {!isLastQuestion ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={onComplete}
          disabled={!canContinue}
        >
          Complete Assessment
        </button>
      )}
    </nav>
  );
}