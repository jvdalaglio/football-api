import GetCompetitions from "@/services/competitions/GetCompetitions";
import GetCompetitionStandings from "@/services/competitions/standings/GetCompetitionStandings";
import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import { useCallback, useEffect } from "react";

export interface IUseCompetitions {
  getCompetitionStandings: (code: string) => void;
  getSeasonsDate: (startDate: string, endDate: string) => string;
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
      actions.setLoadingStandings(true);
      const response = await GetCompetitionStandings(code);
      if (!response) return;
      actions.setSelectedCompetition(response.competition);
      actions.setStandings(response.standings);
      actions.setSelectedSeason(response.season);
      actions.setLoadingStandings(false);
    },
    [state.selectedCompetition, actions]
  );

  const getSeasonsDate = (startDate: string, endDate: string) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const startDateFormatted = startDateObj.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    const endDateFormatted = endDateObj.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    return `${startDateFormatted} - ${endDateFormatted}`;
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  return { getCompetitionStandings, getSeasonsDate };
};
