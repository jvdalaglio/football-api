import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import { colWidths } from "@/utils/colWidths";
import { motion } from "framer-motion";
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
          <motion.div
            className="overflow-x-auto flex flex-col gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {state.standings.map((standing, index) => (
              <div key={index} className="flex flex-col gap-4 divide-y-2">
                {standing.group && (
                  <TableCaption>{standing.group}</TableCaption>
                )}
                <div className="w-full min-w-[700px] md:min-w-0">
                  <Table className="table-fixed w-full">
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
                            state.seasonIsInProgress &&
                            !standing.group &&
                            teamIndex <= 3
                              ? "bg-green-500/20"
                              : teamIndex >= standing.table.length - 4 &&
                                state.selectedCompetition &&
                                state.selectedSeason &&
                                state.selectedSeason.currentMatchday &&
                                state.seasonIsInProgress &&
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
                          <TableCell className="font-medium text-xs md:text-sm">
                            {state.selectedSeason && state.seasonIsInProgress
                              ? team.position
                              : "-"}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                              <Image
                                width={20}
                                height={20}
                                alt={team.team.name}
                                src={team.team.crest}
                                priority
                              />
                              <span className="truncate max-w-[80px] md:max-w-none">
                                {team.team.shortName}
                              </span>
                              {state.selectedSeason &&
                                state.selectedSeason.winner &&
                                state.selectedSeason.winner.shortName ===
                                  team.team.shortName && (
                                  <Badge variant="secondary">Winner</Badge>
                                )}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.points}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.playedGames}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.won}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.draw}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.lost}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.goalsFor}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.goalsAgainst}
                          </TableCell>
                          <TableCell className="text-xs md:text-sm">
                            {team.goalDifference}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-muted-foreground">
            Nenhum dado de tabela disponível para esta competição.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
