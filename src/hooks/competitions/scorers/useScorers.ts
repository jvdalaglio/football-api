import GetCompetitionScorers from "@/services/competitions/scorers/GetCompetitionScorers";
import useScorersStore from "@/stores/scorers/useScorersStore";
import { useCallback } from "react";

interface IUseScorers {
  getCompetitionScorers: (competitionCode: string) => Promise<void>;
}

export default function useScorers(): IUseScorers {
  const {
    actions: { setScorers, setLoadingScorers },
  } = useScorersStore();
  const getCompetitionScorers = useCallback(
    async (competitionCode: string): Promise<void> => {
      setLoadingScorers(true);
      const response = await GetCompetitionScorers(competitionCode);
      setLoadingScorers(false);
      if (!response) {
        throw new Error("Failed to fetch scorers");
      }
      setScorers(response.scorers);
    },
    [setLoadingScorers, setScorers]
  );

  return {
    getCompetitionScorers,
  };
}
