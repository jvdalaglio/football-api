import useScorersStore from "@/stores/scorers/useScorersStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { PiSoccerBallDuotone } from "react-icons/pi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Artillery() {
  const {
    state: { scorers, loadingScorers },
  } = useScorersStore();
  console.log("scorers", scorers);
  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm">
      <CardHeader>
        <CardTitle>Artilheiros</CardTitle>
      </CardHeader>
      <CardContent>
        {loadingScorers ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : scorers.length > 0 ? (
          <ul className="space-y-2">
            {scorers.map((scorer, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <Image
                  src={scorer.team.crest}
                  alt={scorer.team.name}
                  width={32}
                  height={32}
                  priority
                />
                <span>{scorer.player.name}</span>
                <span className="font-semibold flex gap-2 items-center">
                  <PiSoccerBallDuotone />
                  {scorer.goals} Gols
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            Nenhum dado de artilheiros disponível para esta competição.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
