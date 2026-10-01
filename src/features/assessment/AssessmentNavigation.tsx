import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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
    <nav className="assessment-navigation" aria-label="Assessment questions">
      <button
        type="button"
        className="assessment-secondary-button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        <ArrowLeft size={15} />
        Previous
      </button>

      {!isLastQuestion ? (
        <button
          type="button"
          className="assessment-primary-button"
          onClick={onNext}
          disabled={!canContinue}
        >
          Next
          <ArrowRight size={15} />
        </button>
      ) : (
        <button
          type="button"
          className="assessment-primary-button"
          onClick={onComplete}
          disabled={!canContinue}
        >
          Complete assessment
          <Check size={15} />
        </button>
      )}
    </nav>
  );
}