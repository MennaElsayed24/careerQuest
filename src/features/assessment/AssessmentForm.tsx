import {
  useMemo,
} from "react";

import {
  assessmentQuestions,
} from "../../data/assessment/questions";

import {
  useAssessmentStore,
} from "../../store/assessmentStore";

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

  if (
    status === "not-started"
  ) {
    return (
      <section>
        <h1>Career Assessment</h1>

        <p>
          Answer the questions to help
          CareerQuest understand your
          interests and identify relevant
          career paths.
        </p>

        <p>
          You will answer{" "}
          {assessmentQuestions.length}{" "}
          questions.
        </p>

        <button
          type="button"
          onClick={handleStart}
        >
          Start Assessment
        </button>
      </section>
    );
  }

  if (
    status === "completed"
  ) {
    return (
      <section>
        <h1>Assessment Completed</h1>

        <p>
          Your assessment has been
          completed successfully.
        </p>

        <p>
          Your answers are ready for
          career matching.
        </p>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section>
        <h1>Assessment Error</h1>

        <p>
          We could not find the current
          assessment question.
        </p>
      </section>
    );
  }

  return (
    <form
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