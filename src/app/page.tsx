"use client";
import Artillery from "@/components/artillery";
import Header from "@/components/header";
import NextGames from "@/components/next-games";
import StandingsTable from "@/components/standings-table";
import { useCompetitions } from "@/hooks/competitions/useCompetitions";

export default function Home() {
  const { getCompetitionStandings, getSeasonsDate } = useCompetitions();

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <Header handleSelectCompetition={getCompetitionStandings} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <StandingsTable getSeasonsDate={getSeasonsDate} />
        <Artillery />
      </div>
      <NextGames />
    </div>
  );
}
