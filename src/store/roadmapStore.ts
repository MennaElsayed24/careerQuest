import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Roadmap,
  RoadmapItemStatus,
} from "../types/roadmap";

interface RoadmapState {
  roadmap: Roadmap | null;

  setRoadmap: (roadmap: Roadmap) => void;

  updateItemStatus: (
    itemId: string,
    status: RoadmapItemStatus,
  ) => void;

  completeItem: (itemId: string) => void;

  resetRoadmap: () => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      roadmap: null,

      setRoadmap: (roadmap) =>
        set({
          roadmap,
        }),

      updateItemStatus: (itemId, status) =>
        set((state) => {
          if (!state.roadmap) {
            return state;
          }

          return {
            roadmap: {
              ...state.roadmap,

              items: state.roadmap.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status,
                    }
                  : item,
              ),
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      completeItem: (itemId) =>
        set((state) => {
          if (!state.roadmap) {
            return state;
          }

          return {
            roadmap: {
              ...state.roadmap,

              items: state.roadmap.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: "completed",
                    }
                  : item,
              ),
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      resetRoadmap: () =>
        set({
          roadmap: null,
        }),
    }),
    { name: "careerquest-roadmap" },
  ),
);