"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICompetition, ISeason } from "@/models/competitions";
import { IStanding } from "@/models/standings";
import GetCompetitions from "@/services/competitions/GetCompetitions";
import GetCompetitionStandings from "@/services/competitions/standings/GetCompetitionStandings";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [selectedCompetition, setSelectedCompetition] =
    useState<ICompetition>();
  const [standings, setStandings] = useState<IStanding[]>([]);
  const [standingsLoading, setStandingsLoading] = useState(false);
  const [seasonIsInProgress, setSeasonInProgress] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<ISeason>({} as ISeason);

  const getCompetitions = useCallback(async () => {
    const response = await GetCompetitions();
    if (!response) return;
    setCompetitions(response.competitions);
  }, []);

  const getCompetitionStandings = async (competitionCode: string) => {
    if (!competitionCode) return;
    setStandingsLoading(true);
    const response = await GetCompetitionStandings(competitionCode);
    if (!response) return;
    setStandingsLoading(false);
    console.log("response", response);
    setStandings(response.standings);
    setSelectedCompetition(response.competition);
    setSeasonInProgress(
      response.season.currentMatchday
        ? response.season.currentMatchday > 1
        : false
    );
    setSelectedSeason(response.season);
    console.log(response);
  };

  useEffect(() => {
    getCompetitions();
  }, [getCompetitions]);

  const handleSelectCompetition = (competitionCode: string) => {
    getCompetitionStandings(competitionCode);
  };

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

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Dashboard de Futebol
        </h1>
        <div className="flex items-center gap-4">
          <label htmlFor="competition-select" className="sr-only">
            Selecione a Competição
          </label>
          <Select onValueChange={handleSelectCompetition}>
            <SelectTrigger
              id="competition-select"
              className="w-[240px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50"
            >
              <SelectValue placeholder="Selecione a Competição" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
              {competitions.map((comp) => (
                <SelectItem key={comp.id} value={comp.id.toString()}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Tabela da Competição */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm">
          <CardHeader>
            {standingsLoading ? (
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div>
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              selectedCompetition && (
                <div className="flex items-center gap-4 dark:bg-gradient-to-br dark:from-slate-100 dark:to-slate-600 rounded p-4">
                  <Image
                    src={selectedCompetition.emblem}
                    alt={selectedCompetition.name}
                    draggable={true}
                    width={60}
                    height={60}
                    priority
                  />
                  <div>
                    <h2 className="text-lg dark:text-secondary font-semibold">
                      {selectedCompetition.name}
                    </h2>
                    <p className="text-sm text-gray-900 capitalize">
                      {getSeasonsDate(
                        selectedSeason.startDate,
                        selectedSeason.endDate
                      )}
                    </p>
                  </div>
                </div>
              )
            )}
          </CardHeader>
          <CardContent>
            {standingsLoading ? (
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Pos.</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Pts</TableHead>
                      <TableHead>J</TableHead>
                      <TableHead>V</TableHead>
                      <TableHead>E</TableHead>
                      <TableHead>D</TableHead>
                      <TableHead>GP</TableHead>
                      <TableHead>GC</TableHead>
                      <TableHead>SG</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 20 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : standings.length > 0 ? (
              <div className="overflow-x-auto flex flex-col gap-8">
                {standings.map((standing, index) => (
                  <div key={index} className="flex flex-col gap-4 divide-y-2">
                    {standing.group && (
                      <TableCaption>{standing.group}</TableCaption>
                    )}
                    <Table className="divider-y-2">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Pos.</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Pts</TableHead>
                          <TableHead>J</TableHead>
                          <TableHead>V</TableHead>
                          <TableHead>E</TableHead>
                          <TableHead>D</TableHead>
                          <TableHead>GP</TableHead>
                          <TableHead>GC</TableHead>
                          <TableHead>SG</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {standing.table.map((team, teamIndex) => (
                          <TableRow
                            key={team.team.id}
                            className={
                              seasonIsInProgress &&
                              !standing.group &&
                              teamIndex <= 3
                                ? "bg-green-500/20"
                                : teamIndex >= standing.table.length - 4 &&
                                  seasonIsInProgress &&
                                  !standing.group
                                ? "bg-red-500/20"
                                : selectedSeason.winner &&
                                  selectedSeason.winner.shortName ===
                                    team.team.shortName
                                ? "bg-green-500/20"
                                : ""
                            }
                          >
                            <TableCell className="font-medium">
                              {seasonIsInProgress ? team.position : "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Image
                                  width={20}
                                  height={20}
                                  alt={team.team.name}
                                  src={team.team.crest}
                                  priority
                                />
                                {team.team.shortName}
                                {selectedSeason.winner &&
                                  selectedSeason.winner.shortName ===
                                    team.team.shortName && (
                                    <Badge variant="secondary">Winner</Badge>
                                  )}
                              </div>
                            </TableCell>
                            <TableCell>{team.points}</TableCell>
                            <TableCell>{team.playedGames}</TableCell>
                            <TableCell>{team.won}</TableCell>
                            <TableCell>{team.draw}</TableCell>
                            <TableCell>{team.lost}</TableCell>
                            <TableCell>{team.goalsFor}</TableCell>
                            <TableCell>{team.goalsAgainst}</TableCell>
                            <TableCell>{team.goalDifference}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Nenhum dado de tabela disponível para esta competição.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Artilheiros do Campeonato */}
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm">
          <CardHeader>
            <CardTitle>Artilheiros</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Nenhum dado de artilheiros disponível para esta competição.
            </p>
            {/* {currentTopScorers.length > 0 ? (
              <ul className="space-y-2">
                {currentTopScorers.map((scorer, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{scorer.name}</span>
                    <span className="font-semibold">{scorer.goals} Gols</span>
                  </li>
                ))}
              </ul>
            ) : (
            )} */}
          </CardContent>
        </Card>
      </div>

      {/* Próximos Jogos */}
      <Card className="mt-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm">
        <CardHeader>
          <CardTitle>Próximos Jogos</CardTitle>
        </CardHeader>
        <CardContent>
          {/* {currentUpcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUpcomingMatches.map((match, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
                >
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {match.homeTeam} vs {match.awayTeam}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(match.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}{" "}
                    - {match.time}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum jogo futuro disponível para esta competição.
            </p>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
