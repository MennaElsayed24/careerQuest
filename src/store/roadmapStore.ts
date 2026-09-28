import { create } from "zustand";
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

export const useRoadmapStore =
  create<RoadmapState>((set) => ({
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

            items: state.roadmap.items.map(
              (item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status,
                    }
                  : item,
            ),
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

            items: state.roadmap.items.map(
              (item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: "completed",
                    }
                  : item,
            ),
          },
        };
      }),

    resetRoadmap: () =>
      set({
        roadmap: null,
      }),
  }));