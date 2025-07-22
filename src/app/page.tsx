"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICompetition } from "@/models/competitions";
import GetCompetitions from "@/services/competitions/GetCompetitions";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [selectedCompetitionCode, setSelectedCompetitionCode] = useState<
    string | null
  >(null);

  const getCompetitions = useCallback(async () => {
    const response = await GetCompetitions();
    if (!response) return;
    setCompetitions(response.competitions);
  }, []);

  useEffect(() => {
    getCompetitions();
  }, [getCompetitions]);

  const handleSelectCompetition = (competitionCode: string) => {};

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
    <div className="container grid grid-cols-4">
      <Select onValueChange={handleSelectCompetition}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a competition" />
        </SelectTrigger>
        <SelectContent>
          {competitions.map((competition) => (
            <SelectItem key={competition.id} value={competition.code}>
              {competition.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
