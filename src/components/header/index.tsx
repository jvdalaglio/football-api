import useCompetitionsStore from "@/stores/competitions/useCompetitionsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Header({
  handleSelectCompetition,
}: {
  handleSelectCompetition: (value: string) => void;
}) {
  const { state } = useCompetitionsStore();
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
        Dashboard de Campeonatos de Futebol
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
            {state.competitions.map((comp) => (
              <SelectItem key={comp.id} value={comp.id.toString()}>
                {comp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
