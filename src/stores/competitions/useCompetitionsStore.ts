import { ICompetition, ISeason } from "@/models/competitions";
import { IStanding } from "@/models/standings";
import { create } from "zustand";

interface ICompetitionsStoreState {
  competitions: ICompetition[];
  standings: IStanding[];
  selectedCompetition: ICompetition | null;
  selectedSeason: ISeason | null;
  seasonIsInProgress: boolean;
  loadingCompetitions: boolean;
  loadingStandings: boolean;
}

interface ICompetitionsStoreActions {
  setCompetitions: (competitions: ICompetition[]) => void;
  setStandings: (standings: IStanding[]) => void;
  setSelectedCompetition: (competition: ICompetition) => void;
  setSelectedSeason: (season: ISeason) => void;
  setSeasonIsInProgress: () => void;
  setLoadingCompetitions: (loading: boolean) => void;
  setLoadingStandings: (loading: boolean) => void;
}

interface ICompetitionStore {
  actions: ICompetitionsStoreActions;
  state: ICompetitionsStoreState;
}

const useCompetitionsStore = create<ICompetitionStore>((set) => ({
  actions: {
    setCompetitions: (competitions) =>
      set((store) => ({
        state: { ...store.state, competitions },
      })),
    setSelectedCompetition: (competition) =>
      set((store) => ({
        state: { ...store.state, selectedCompetition: competition },
      })),
    setStandings: (standings) =>
      set((store) => ({
        state: { ...store.state, standings },
      })),
    setLoadingCompetitions: (state) =>
      set((store) => ({
        state: { ...store.state, loadingCompetitions: state },
      })),
    setLoadingStandings: (state) =>
      set((store) => ({
        state: { ...store.state, loadingStandings: state },
      })),
    setSelectedSeason: (season) =>
      set((store) => ({
        state: { ...store.state, selectedSeason: season },
      })),
    setSeasonIsInProgress: () =>
      set((store) => ({
        state: {
          ...store.state,
          seasonIsInProgress:
            store.state.selectedSeason &&
            store.state.selectedSeason.currentMatchday
              ? store.state.selectedSeason.currentMatchday > 1
              : false,
        },
      })),
  },
  state: {
    competitions: [],
    selectedCompetition: null,
    standings: [],
    loadingCompetitions: false,
    loadingStandings: false,
    selectedSeason: null,
    seasonIsInProgress: false,
  },
}));

export default useCompetitionsStore;
