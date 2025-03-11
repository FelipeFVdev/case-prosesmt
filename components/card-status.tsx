"use client";

import CardStatusContent from "./card-status-content";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

type CardStatusProps = {};
export const CardStatus = ({}: CardStatusProps) => {
  const [url, setUrl] = useState("");

  const [speficiState, setSpeficiState] = useState("");

  async function fetchStates() {
    console.log(`https://covid19-brazil-api.now.sh/api/report/v1/${url}`);
    const res = await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/${url}`
    );
    if (url) {
      const data = await res.json();
      return data;
    }
    const { data } = await res.json();
    return data;
  }

  function handleClick() {
    setUrl(`brazil/uf/${speficiState.toLowerCase()}`);

    refetch();
  }

  // refetch and caching
  const {
    data: dataStates = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
    retry: 1,
  });

  return (
    <Card className="max-w-screen-md h-auto">
      <CardHeader>
        <CardTitle>Status Atual</CardTitle>
        <CardDescription>
          Consulta onde podemos visualizar o status atual de todos os estados da
          federação ou de apenas um estado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardStatusContent
          dataStates={dataStates}
          isLoading={isLoading}
          isError={isError}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        {dataStates.length > 0 ? (
          <Select
            onValueChange={(value) => {
              const selectedState = dataStates.find(
                (item) => item.state === value
              );
              setSpeficiState(selectedState?.uf || "");
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
        ) : (
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estados</SelectLabel>

                <SelectItem value={dataStates.state}>
                  {dataStates.state}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <Button variant="default" onClick={handleClick}>
          Consultar
        </Button>
      </CardFooter>
    </Card>
  );
};
