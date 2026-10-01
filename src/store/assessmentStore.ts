import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AssessmentAnswer,
  AssessmentHistoryEntry,
  AssessmentResult,
  AssessmentStatus,
} from "../types/assessment";

interface AssessmentState {
  answers: AssessmentAnswer[];
  results: AssessmentResult[];
  history: AssessmentHistoryEntry[];

  currentQuestionIndex: number;
  status: AssessmentStatus;
  startedAt: string | null;

  setAnswer: (
    questionId: string,
    value: string | string[] | number,
  ) => void;

  removeAnswer: (questionId: string) => void;

  setCurrentQuestion: (index: number) => void;

  nextQuestion: () => void;
  previousQuestion: () => void;

  setResults: (results: AssessmentResult[]) => void;
  removeHistoryEntry: (entryId: string) => void;

  startAssessment: () => void;
  completeAssessment: () => void;

  resetAssessment: () => void;
}

const initialState = {
  answers: [],
  results: [],
  history: [],
  currentQuestionIndex: 0,
  status: "not-started" as AssessmentStatus,
  startedAt: null as string | null,
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

        removeHistoryEntry: (entryId) =>
          set((state) => ({
            history: state.history.filter((entry) => entry.id !== entryId),
          })),

        startAssessment: () =>
          set({
            status: "in-progress",
            currentQuestionIndex: 0,
            startedAt: new Date().toISOString(),
          }),

        completeAssessment: () =>
          set((state) => {
            if (state.status === "completed") return state;

            const completedAt = new Date().toISOString();
            const entry: AssessmentHistoryEntry = {
              id: crypto.randomUUID(),
              startedAt: state.startedAt ?? undefined,
              completedAt,
              answers: state.answers.map((answer) => ({
                ...answer,
                value: Array.isArray(answer.value)
                  ? [...answer.value]
                  : answer.value,
              })),
              questionCount: state.answers.length,
            };

            return {
              status: "completed",
              history: [entry, ...state.history],
            };
          }),

        resetAssessment: () =>
          set((state) => ({
            ...initialState,
            history: state.history,
          })),
      }),
      {
        name: "careerquest-assessment",
      },
    ),
  );