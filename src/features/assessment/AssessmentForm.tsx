import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { assessmentQuestions } from "../../data/assessment/questions";
import { ROUTES } from "../../routes/paths";
import { useAssessmentStore } from "../../store/assessmentStore";

import AssessmentProgress from "./AssessmentProgress";
import QuestionCard from "./QuestionCard";
import AssessmentNavigation from "./AssessmentNavigation";

export default function AssessmentForm() {
  const {
    answers,
    currentQuestionIndex,
    status,
    setAnswer,
    nextQuestion,
    previousQuestion,
    startAssessment,
    completeAssessment,
    resetAssessment,
  } = useAssessmentStore();

  const currentQuestion =
    assessmentQuestions[
      currentQuestionIndex
    ];

  const currentAnswer = useMemo(
    () =>
      answers.find(
        (answer) =>
          answer.questionId ===
          currentQuestion?.id,
      )?.value,
    [answers, currentQuestion],
  );

  const hasAnswer =
    currentAnswer !== undefined &&
    currentAnswer !== "" &&
    (!Array.isArray(currentAnswer) ||
      currentAnswer.length > 0);

  const isFirstQuestion =
    currentQuestionIndex === 0;

  const isLastQuestion =
    currentQuestionIndex ===
    assessmentQuestions.length - 1;

  const handleStart = () => {
    startAssessment();
  };

  const handleAnswer = (
    value: string | string[],
  ) => {
    if (!currentQuestion) {
      return;
    }

    setAnswer(
      currentQuestion.id,
      value,
    );
  };

  const handleComplete = () => {
    if (!hasAnswer) {
      return;
    }

    completeAssessment();
  };

  const handleRetake = () => {
    resetAssessment();
    startAssessment();
  };

  if (
    status === "not-started"
  ) {
    return (
      <section className="assessment-intro">
        <div className="assessment-intro-icon">
          <CheckCircle2 size={22} />
        </div>
        <span className="assessment-kicker">CAREER DISCOVERY</span>
        <h2>Find a direction that fits.</h2>
        <p>
          Reflect on your interests, problem-solving style, and the kind of
          technology work you want to explore.
        </p>

        <div className="assessment-intro-meta">
          <span>{assessmentQuestions.length} questions</span>
          <span>Your answers save as you go</span>
        </div>

        <button
          type="button"
          className="assessment-primary-button"
          onClick={handleStart}
        >
          Start assessment
          <ArrowRight size={16} />
        </button>
      </section>
    );
  }

  if (
    status === "completed"
  ) {
    return (
      <section className="assessment-complete">
        <div className="assessment-complete-icon">
          <CheckCircle2 size={23} />
        </div>
        <span className="assessment-kicker">ASSESSMENT COMPLETE</span>
        <h2>Your answers are saved.</h2>
        <p className="assessment-complete-copy">
          Review what you selected, then explore careers that interest you.
        </p>

        <div className="assessment-answer-review">
          {assessmentQuestions.map((question) => {
            const answer = answers.find(
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
              <div className="assessment-answer-row" key={question.id}>
                <span>{question.question}</span>
                <strong>{labels.join(", ") || "No answer"}</strong>
              </div>
            );
          })}
        </div>

        <div className="assessment-complete-actions">
          <Link to={ROUTES.careers} className="assessment-primary-button">
            Explore careers
            <ArrowRight size={16} />
          </Link>
          <button
            type="button"
            className="assessment-secondary-button"
            onClick={handleRetake}
          >
            <RotateCcw size={15} />
            Retake assessment
          </button>
        </div>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="assessment-error" role="alert">
        <p>
          We could not find the current
          assessment question.
        </p>
        <button
          type="button"
          className="assessment-secondary-button"
          onClick={handleRetake}
        >
          <RotateCcw size={15} />
          Restart assessment
        </button>
      </section>
    );
  }

  return (
    <form
      className="assessment-question-flow"
      onSubmit={(event) =>
        event.preventDefault()
      }
    >
      <AssessmentProgress
        currentQuestion={
          currentQuestionIndex
        }
        totalQuestions={
          assessmentQuestions.length
        }
      />

      <QuestionCard
        question={currentQuestion}
        questionNumber={
          currentQuestionIndex + 1
        }
        totalQuestions={
          assessmentQuestions.length
        }
        value={currentAnswer}
        onChange={handleAnswer}
      />

      <AssessmentNavigation
        isFirstQuestion={
          isFirstQuestion
        }
        isLastQuestion={
          isLastQuestion
        }
        canContinue={hasAnswer}
        onPrevious={
          previousQuestion
        }
        onNext={nextQuestion}
        onComplete={handleComplete}
      />
    </form>
  );
}