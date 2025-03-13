"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { useStatesContext } from "@/app/context/states-context";

export const CardStatusFooter = () => {
  const router = useRouter();

  const { statesFetch } = useStatesContext();

  const [speficState, setSpeficState] = useState("");

  const [date, setDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState<string>("");

  // Estado para controlar o Select de Brasil ou Global
  const [region, setRegion] = useState<string>("brazil");

  // Atualiza o valor do input quando a data muda
  useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"));
    }
  }, [date]);

  // Lida com a entrada manual do input de data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Verifica se existe data válida no formato ddMMyyyy
    if (value.length === 10) {
      // Formato completo de data (dd/MM/yyyy)
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());

        setDate(parsedDate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Formata a entrada conforme o usuário digita
  const formatInput = (value: string) => {
    // Remove qualquer caractere não numérico
    const digits = value.replace(/\D/g, "");

    // Formata como dd/MM/yyyy
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
        4,
        8
      )}`;
    }
  };

  const handleButton = () => {
    if (date) {
      router.push(`/specified/date?datetime=${format(date, "yyyyMMdd")}`);
    } else if (region === "countries") {
      router.push(`/world?region=${region}`);
    } else {
      router.push(`/${speficState}`);
    }
  };

  return (
    <CardFooter className="lg:flex grid gap-2">
      <Select
        onValueChange={(value) => {
          const state = statesFetch.find((item) => item.state === value);
          setSpeficState(state ? `specified/state/${state.uf}` : "");
        }}
        // Desabilita o Select se inputValue tiver um valor ou se a região não for "brazil"
        disabled={!!inputValue || region !== "brazil"}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Selecione um Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estados</SelectLabel>
            {statesFetch.map((item, index) => (
              <SelectItem key={index} value={item.state || ""}>
                {item.state}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="relative ">
        <Input
          id="date"
          value={inputValue}
          onChange={(e) => {
            const formatted = formatInput(e.target.value);
            if (formatted.length <= 10) {
              handleInputChange({
                ...e,
                target: { ...e.target, value: formatted },
              } as React.ChangeEvent<HTMLInputElement>);
            }
          }}
          placeholder="dd / mm / aaaa"
          className="w-full"
          // Desabilita o Input se speficState tiver um valor ou se a região não for "brazil"
          disabled={!!speficState || region !== "brazil"}
        />
        <div className="absolute right-0 top-0.5 h-full px-3 py-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <Select
        value={region} // Controla o valor do Select com region
        onValueChange={(value) => setRegion(value)}
      >
        <SelectTrigger className="w-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Escolha Brasil ou Global</SelectLabel>
            <SelectItem value="brazil">Brasil</SelectItem>
            <SelectItem value="countries">Global</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="default" onClick={handleButton}>
        Consultar
      </Button>
      <Button variant="secondary" onClick={() => router.replace("/")}>
        Voltar
      </Button>
    </CardFooter>
  );
};
