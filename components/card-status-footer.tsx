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

  // Update input value when date changes from calendar
  useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"));
    }
  }, [date]);

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Try to parse the date
    if (value.length === 10) {
      // Complete date format (dd/MM/yyyy)
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());

        setDate(parsedDate);
      } catch (error) {
        // Invalid date format, do nothing
        console.log(error);
      }
    }
  };

  // Format input as user types
  const formatInput = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format as dd/MM/yyyy
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
      //novo
      router.push(`/specified/date?datetime=${format(date, "yyyyMMdd")}`);
      //antigo
      //router.push(`/status/date?params=${format(date, "yyyyMMdd")}`);
    } else if (region === "countries") {
      //novo
      router.push(`/world?region=${region}`);
      //antigo
      // router.push(`/status/world?params=${region}`);
    } else {
      //novo
      router.push(`/${speficState}`);
      //antigo
      //router.push(`/status/${speficState}`);
    }
  };

  return (
    <CardFooter className="lg:flex grid gap-2">
      <Select
        onValueChange={(value) => {
          const selectedState = statesFetch.find(
            (item) => item.state === value
          );
          setSpeficState(`specified/state/${selectedState?.uf}` || "");
        }}
        disabled={!!inputValue || region !== "brazil"} // Disable Select if inputValue has a value
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
          disabled={!!speficState || region !== "brazil"} // Disable Input if speficState has a value
        />
        <div className="absolute right-0 top-0.5 h-full px-3 py-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <Select
        value={region} // Control the Select value with region
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
      {/* NOVO */}
      <Button variant="secondary" onClick={() => router.replace("/")}>
        Voltar
      </Button>
      {/* ANTIGO */}
      {/* <Button variant="secondary" onClick={() => router.replace("/status")}>
        Voltar
      </Button> */}
    </CardFooter>
  );
};
