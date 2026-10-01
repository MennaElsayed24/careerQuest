import type { AssessmentQuestion } from "../../types/assessment";
import QuestionOptions from "./QuestionOptions";

interface QuestionCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  value: string | string[] | number | undefined;
  onChange: (
    value: string | string[],
  ) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <section className="assessment-question-card" aria-labelledby="assessment-question-title">
      <span className="assessment-kicker">
        QUESTION {questionNumber} OF {totalQuestions}
      </span>

      <h2 id="assessment-question-title">{question.question}</h2>

      {question.description && (
        <p className="assessment-question-description">{question.description}</p>
      )}

      <QuestionOptions
        question={question}
        value={value}
        onChange={onChange}
      />
    </section>
  );
}