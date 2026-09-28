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
    <section>
      <p>
        Question {questionNumber} of{" "}
        {totalQuestions}
      </p>

      <h2>{question.question}</h2>

      {question.description && (
        <p>{question.description}</p>
      )}

      <QuestionOptions
        question={question}
        value={value}
        onChange={onChange}
      />
    </section>
  );
}