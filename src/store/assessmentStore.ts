import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AssessmentAnswer,
  AssessmentResult,
  AssessmentStatus,
} from "../types/assessment";

interface AssessmentState {
  answers: AssessmentAnswer[];
  results: AssessmentResult[];

  currentQuestionIndex: number;
  status: AssessmentStatus;

  setAnswer: (
    questionId: string,
    value: string | string[] | number,
  ) => void;

  removeAnswer: (questionId: string) => void;

  setCurrentQuestion: (index: number) => void;

  nextQuestion: () => void;
  previousQuestion: () => void;

  setResults: (results: AssessmentResult[]) => void;

  startAssessment: () => void;
  completeAssessment: () => void;

  resetAssessment: () => void;
}

const initialState = {
  answers: [],
  results: [],
  currentQuestionIndex: 0,
  status: "not-started" as AssessmentStatus,
};

export const useAssessmentStore =
  create<AssessmentState>()(
    persist(
      (set) => ({
        ...initialState,

        setAnswer: (questionId, value) =>
          set((state) => {
            const existingAnswer =
              state.answers.find(
                (answer) =>
                  answer.questionId === questionId,
              );

            if (existingAnswer) {
              return {
                answers: state.answers.map(
                  (answer) =>
                    answer.questionId ===
                    questionId
                      ? {
                          ...answer,
                          value,
                        }
                      : answer,
                ),
              };
            }

            return {
              answers: [
                ...state.answers,
                {
                  questionId,
                  value,
                },
              ],
            };
          }),

        removeAnswer: (questionId) =>
          set((state) => ({
            answers: state.answers.filter(
              (answer) =>
                answer.questionId !==
                questionId,
            ),
          })),

        setCurrentQuestion: (index) =>
          set({
            currentQuestionIndex: Math.max(
              0,
              index,
            ),
          }),

        nextQuestion: () =>
          set((state) => ({
            currentQuestionIndex:
              state.currentQuestionIndex + 1,
          })),

        previousQuestion: () =>
          set((state) => ({
            currentQuestionIndex:
              Math.max(
                0,
                state.currentQuestionIndex - 1,
              ),
          })),

        setResults: (results) =>
          set({
            results,
          }),

        startAssessment: () =>
          set({
            status: "in-progress",
            currentQuestionIndex: 0,
          }),

        completeAssessment: () =>
          set({
            status: "completed",
          }),

        resetAssessment: () =>
          set(initialState),
      }),
      {
        name: "careerquest-assessment",
      },
    ),
  );