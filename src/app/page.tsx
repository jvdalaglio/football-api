"use client";
import Artillery from "@/components/artillery";
import Header from "@/components/header";
import NextGames from "@/components/next-games";
import StandingsTable from "@/components/standings-table";
import Welcome from "@/components/welcome";
import { useCompetitions } from "@/hooks/competitions/useCompetitions";
import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";

export default function Home() {
  const { getCompetitionStandings, getSeasonsDate } = useCompetitions();
  const {
    state: { selectedCompetition },
  } = useCompetitionsStore();

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <Header handleSelectCompetition={getCompetitionStandings} />
      {!selectedCompetition ? (
        <Welcome />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <StandingsTable getSeasonsDate={getSeasonsDate} />
          <div className="flex flex-col gap-4">
            <Artillery />
            <NextGames />
          </div>
        </div>
      )}
    </div>
  );
}
