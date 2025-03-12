"use client";
import { useState } from "react";
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

export const CardStatusFooter = () => {
  const router = useRouter();

  const [uidState, setUidState] = useState(0);

  const [speficState, setSpeficState] = useState("");

  const queryClient = useQueryClient();

  const dataStates: any[] = queryClient.getQueryData(["states"]) || [];

  return (
    <CardFooter className="flex gap-2">
      <Select
        onValueChange={(value) => {
          const selectedState = dataStates.find((item) => item.state === value);
          setSpeficState(selectedState?.uf || "");
          setUidState(selectedState?.uid || "");
          console.log(uidState);
        }}
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
      <Button
        variant="default"
        onClick={() => router.push(`/states/${speficState}`)}
      >
        Consultar
      </Button>
    </CardFooter>
  );
};
