import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NextGames() {
  return (
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
  );
}
