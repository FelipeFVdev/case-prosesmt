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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";

export const CardStatusFooter = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const dataStates: any[] = queryClient.getQueryData(["states"]) || [];

  const [speficState, setSpeficState] = useState("");

  const [date, setDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState<string>("");

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
      router.push(`/states/date?params=${format(date, "yyyyMMdd")}`);
    } else {
      router.push(`/states/${speficState}`);
    }
  };

  return (
    <CardFooter className="flex gap-2">
      <div className="relative">
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
          disabled={!!speficState} // Disable Input if speficState has a value
        />
        <div className="absolute right-0 top-0.5 h-full px-3 py-2">
          <CalendarIcon className="size-4" />
        </div>
      </div>
      <Select
        onValueChange={(value) => {
          const selectedState = dataStates.find((item) => item.state === value);
          setSpeficState(selectedState?.uf || "");
        }}
        disabled={!!inputValue} // Disable Select if inputValue has a value
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione um Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estados</SelectLabel>
            {dataStates.map((item, index) => (
              <SelectItem key={index} value={item.state}>
                {item.state}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="default" onClick={handleButton}>
        Consultar
      </Button>
    </CardFooter>
  );
};
