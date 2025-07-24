import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import StandingsTableSkeleton from "./skeleton";

export default function StandingsTable({
  getSeasonsDate,
}: {
  getSeasonsDate: (startDate: string, endDate: string) => string;
}) {
  const { state } = useCompetitionsStore();

  return (
    <Card className="lg:col-span-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm">
      <CardHeader>
        {state.loadingStandings || state.loadingCompetitions ? (
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div>
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ) : (
          state.selectedCompetition &&
          state.selectedSeason && (
            <div className="flex items-center gap-4 dark:bg-gradient-to-br dark:from-slate-100 dark:to-slate-600 rounded p-4">
              <Image
                src={state.selectedCompetition.emblem}
                alt={state.selectedCompetition.name}
                draggable={true}
                width={60}
                height={60}
                priority
              />
              <div>
                <h2 className="text-lg dark:text-secondary font-semibold">
                  {state.selectedCompetition.name}
                </h2>
                <p className="text-sm text-gray-900 capitalize">
                  {getSeasonsDate(
                    state.selectedSeason.startDate,
                    state.selectedSeason.endDate
                  )}
                </p>
              </div>
            </div>
          )
        )}
      </CardHeader>
      <CardContent>
        {state.loadingStandings ? (
          <StandingsTableSkeleton />
        ) : state.standings.length > 0 ? (
          <div className="overflow-x-auto flex flex-col gap-8">
            {state.standings.map((standing, index) => (
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
                          state.selectedSeason &&
                          state.selectedSeason.currentMatchday &&
                          !standing.group &&
                          teamIndex <= 3
                            ? "bg-green-500/20"
                            : teamIndex >= standing.table.length - 4 &&
                              state.selectedCompetition &&
                              state.selectedSeason &&
                              state.selectedSeason.currentMatchday &&
                              !standing.group
                            ? "bg-red-500/20"
                            : state.selectedCompetition &&
                              state.selectedSeason &&
                              state.selectedSeason.winner &&
                              state.selectedSeason.winner.shortName ===
                                team.team.shortName
                            ? "bg-green-500/20"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          {state.selectedSeason && state.seasonIsInProgress
                            ? team.position
                            : "-"}
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
                            {state.selectedSeason &&
                              state.selectedSeason.winner &&
                              state.selectedSeason.winner.shortName ===
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
  );
}
