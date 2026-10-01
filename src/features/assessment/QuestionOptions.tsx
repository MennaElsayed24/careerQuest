import type { AssessmentQuestion } from "../../types/assessment";

interface QuestionOptionsProps {
  question: AssessmentQuestion;
  value: string | string[] | number | undefined;
  onChange: (value: string | string[]) => void;
}

export default function QuestionOptions({
  question,
  value,
  onChange,
}: QuestionOptionsProps) {
  const selectedValues = Array.isArray(value)
    ? value
    : value !== undefined
      ? [String(value)]
      : [];

  const handleSingleChange = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultipleChange = (
    optionValue: string,
    checked: boolean,
  ) => {
    const currentValues = Array.isArray(value)
      ? value
      : [];

    if (checked) {
      onChange([
        ...currentValues,
        optionValue,
      ]);
      return;
    }

    onChange(
      currentValues.filter(
        (item) => item !== optionValue,
      ),
    );
  };

  return (
    <div className="assessment-options">
      {question.options.map((option) => {
        const isSelected =
          selectedValues.includes(option.value);
        const className = `assessment-option ${
          isSelected ? "assessment-option-selected" : ""
        }`;

        if (question.type === "multiple") {
          return (
            <label key={option.id} className={className}>
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                onChange={(event) =>
                  handleMultipleChange(
                    option.value,
                    event.target.checked,
                  )
                }
              />

              <span>{option.label}</span>
            </label>
          );
        }

        return (
          <label key={option.id} className={className}>
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={isSelected}
              onChange={() =>
                handleSingleChange(
                  option.value,
                )
              }
            />

            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}