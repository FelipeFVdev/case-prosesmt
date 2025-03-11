"use client";
import CardStatusContent from "@/components/card-status-content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const States = () => {
  // refetch and caching
  const {
    data: dataStates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await fetch(
        "https://covid19-brazil-api.now.sh/api/report/v1/"
      );
      const { data } = await res.json();
      return data;
    },
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

        <Button variant="default">Consultar</Button>
      </CardFooter>
    </Card>
  );
};

export default States;
