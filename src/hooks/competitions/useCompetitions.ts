import GetCompetitions from "@/services/competitions/GetCompetitions";
import GetCompetitionStandings from "@/services/competitions/standings/GetCompetitionStandings";
import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import { useCallback, useEffect } from "react";

export interface IUseCompetitions {
  getCompetitionStandings: (code: string) => void;
  getSeasonsDate: (startDate: string, endDate: string) => string;
}

export const useCompetitions = (): IUseCompetitions => {
  const {
    actions: {
      setCompetitions,
      setLoadingCompetitions,
      setLoadingStandings,
      setSelectedCompetition,
      setStandings,
      setSelectedSeason,
    },
    state,
  } = useCompetitionsStore();

  const getCompetitions = useCallback(async () => {
    if (state.competitions.length > 0) return;
    setLoadingCompetitions(true);
    const response = await GetCompetitions();
    setLoadingCompetitions(false);
    if (!response) return;
    setCompetitions(response.competitions);
  }, [state.competitions, setCompetitions, setLoadingCompetitions]);

  const getCompetitionStandings = useCallback(
    async (code: string) => {
      if (state.selectedCompetition?.id?.toString() === code) return;
      setLoadingStandings(true);
      const response = await GetCompetitionStandings(code);
      if (!response) return;
      setSelectedCompetition(response.competition);
      setStandings(response.standings);
      setSelectedSeason(response.season);
      setLoadingStandings(false);
    },
    [
      state.selectedCompetition,
      setLoadingStandings,
      setSelectedCompetition,
      setStandings,
      setSelectedSeason,
    ]
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
  }, [getCompetitions]);

  return { getCompetitionStandings, getSeasonsDate };
};
