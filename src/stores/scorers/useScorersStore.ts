import { Scorer } from "@/models/scorers";
import { create } from "zustand";

interface IScorersStoreState {
  scorers: Scorer[];
  loadingScorers: boolean;
}

interface IScorersStoreActions {
  setScorers: (scorers: Scorer[]) => void;
  setLoadingScorers: (loadingScorers: boolean) => void;
}

interface IScorersStore {
  state: IScorersStoreState;
  actions: IScorersStoreActions;
}

const useScorersStore = create<IScorersStore>((set) => ({
  state: {
    scorers: [],
    loadingScorers: false,
  },
  actions: {
    setScorers: (scorers) =>
      set((store) => ({
        state: { ...store.state, scorers },
      })),
    setLoadingScorers: (loadingScorers) =>
      set((store) => ({
        state: { ...store.state, loadingScorers },
      })),
  },
}));

export default useScorersStore;
