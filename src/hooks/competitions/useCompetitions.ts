import GetCompetitions from "@/services/competitions/GetCompetitions";
import GetCompetitionStandings from "@/services/competitions/standings/GetCompetitionStandings";
import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import { useCallback, useEffect } from "react";

export interface IUseCompetitions {
  getCompetitionStandings: (code: string) => void;
}

export const useCompetitions = (): IUseCompetitions => {
  const { actions, state } = useCompetitionsStore();

  const getCompetitions = useCallback(async () => {
    if (state.competitions.length > 0) return;
    actions.setLoadingCompetitions(true);
    const response = await GetCompetitions();
    actions.setLoadingCompetitions(false);
    if (!response) return;
    actions.setCompetitions(response.competitions);
  }, [state.competitions, actions]);

  const getCompetitionStandings = useCallback(
    async (code: string) => {
      if (state.selectedCompetition?.id?.toString() === code) return;
      actions.setLoadingCompetitions(true);
      const response = await GetCompetitionStandings(code);
      if (!response) return;
      actions.setSelectedCompetition(response.competition);
      actions.setStandings(response.standings);
      actions.setSelectedSeason(response.season);
      actions.setSeasonIsInProgress();
      actions.setLoadingCompetitions(false);
    },
    [state.selectedCompetition, actions]
  );

  useEffect(() => {
    getCompetitions();
  }, []);

  return { getCompetitionStandings };
};
