import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Artillery() {
  return (
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
  );
}
