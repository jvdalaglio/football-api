import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import { colWidths } from "@/utils/colWidths";
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
                <Table className="divider-y-2 table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead className={colWidths[0]}>Pos.</TableHead>
                      <TableHead className={colWidths[1]}>Time</TableHead>
                      <TableHead className={colWidths[2]}>Pts</TableHead>
                      <TableHead className={colWidths[3]}>J</TableHead>
                      <TableHead className={colWidths[4]}>V</TableHead>
                      <TableHead className={colWidths[5]}>E</TableHead>
                      <TableHead className={colWidths[6]}>D</TableHead>
                      <TableHead className={colWidths[7]}>GP</TableHead>
                      <TableHead className={colWidths[8]}>GC</TableHead>
                      <TableHead className={colWidths[9]}>SG</TableHead>
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
                        <TableCell className={`font-medium ${colWidths[0]}`}>
                          {state.selectedSeason && state.seasonIsInProgress
                            ? team.position
                            : "-"}
                        </TableCell>
                        <TableCell className={colWidths[1]}>
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
                        <TableCell className={colWidths[2]}>
                          {team.points}
                        </TableCell>
                        <TableCell className={colWidths[3]}>
                          {team.playedGames}
                        </TableCell>
                        <TableCell className={colWidths[4]}>
                          {team.won}
                        </TableCell>
                        <TableCell className={colWidths[5]}>
                          {team.draw}
                        </TableCell>
                        <TableCell className={colWidths[6]}>
                          {team.lost}
                        </TableCell>
                        <TableCell className={colWidths[7]}>
                          {team.goalsFor}
                        </TableCell>
                        <TableCell className={colWidths[8]}>
                          {team.goalsAgainst}
                        </TableCell>
                        <TableCell className={colWidths[9]}>
                          {team.goalDifference}
                        </TableCell>
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
