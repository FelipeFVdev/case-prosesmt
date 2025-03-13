"use client";

import { useEffect, useState } from "react";
import { BiohazardIcon, SkullIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { useParams, useSearchParams } from "next/navigation";

export const CardStatusContent = () => {
  const searchParams = useSearchParams();
  const params: { slug: string } = useParams();

  const { slug } = params;

  const searchDate = searchParams.get("datetime");
  const searchRegion = searchParams.get("region");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  interface StateData {
    state?: string;
    country?: string;
    deaths: number;
    cases: number;
    suspects: number;
    confirmed?: number;
  }

  const [statesFetch, setStatesFetch] = useState<StateData[] | StateData>([]);

  // RETORNA TODOS OS ESTADOS DO BRAZIL
  const getStates = async () => {
    try {
      const res = await fetch(
        "https://covid19-brazil-api.now.sh/api/report/v1/"
      );
      const { data } = await res.json();
      setStatesFetch(data);
    } catch (error) {
      setIsError(true);
      console.log("[states_GET]: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // RETORNA UM ESTADO ESPEFICO DO BRAZIL
  const getSpecifiedState = async () => {
    try {
      const res = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${slug.toLowerCase()}`
      );
      const data = await res.json();
      setStatesFetch(data);
    } catch (error) {
      setIsError(true);
      console.log("[specifiedState_GET]: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  // RETORNA TODOS OS ESTADOS DO BRAZIL NESTE PERIODO EM UMA DATA ESPEFICA
  const getSpecifiedDate = async () => {
    try {
      const res = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${searchDate}`
      );
      const { data } = await res.json();
      setStatesFetch(data);
    } catch (error) {
      setIsError(true);
      console.log("[specifiedDate_GET]: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  // RETORNA TODOS OS PAISES DO MUNDO
  const getGlobal = async () => {
    try {
      const res = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/${searchRegion}`
      );
      const { data } = await res.json();
      setStatesFetch(data);
    } catch (error) {
      setIsError(true);
      console.log("[specifiedDate_GET]: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (slug) {
      getSpecifiedState();
    } else if (searchDate) {
      getSpecifiedDate();
    } else if (searchRegion) {
      getGlobal();
    } else {
      getStates();
    }
  }, []);

  const handleNumberFormat = (number: number) => {
    return new Intl.NumberFormat("pt-BR").format(number);
  };

  if (isError) {
    return (
      <div className="col-span-3">
        <div className="flex items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">
            Alguma coisa deu errao. Por favor tente novamente mais tarde!
          </p>
        </div>
      </div>
    );
  }

  if (Array.isArray(statesFetch) && statesFetch.length > 0) {
    return isLoading ? (
      <>
        {statesFetch.map((data, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Skeleton className="h-35 w-50" />
          </div>
        ))}
      </>
    ) : (
      <>
        {statesFetch.map((item, index) => (
          <Card key={index} className=" gap-4 py-4 max-w-56">
            <CardHeader>
              <CardTitle className="line-clamp-1">
                {item.state || item.country}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-center gap-2 hover:cursor-default hover:font-semibold">
                      <SkullIcon className="size-4" color="red" />
                      {handleNumberFormat(item.deaths)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Mortes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex items-center gap-2 hover:cursor-default hover:font-semibold">
                      <BiohazardIcon className="size-4" />
                      {handleNumberFormat(
                        item.cases +
                          item.deaths +
                          (item.suspects || item.confirmed || 0)
                      )}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Total (Casos + Mortes + Suspeitos)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else if (!Array.isArray(statesFetch)) {
    return (
      <Card className="gap-4 py-4 w-52 h-fit">
        <CardHeader>
          <CardTitle>{statesFetch.state}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="flex items-center gap-2 hover:cursor-default hover:font-semibold">
                  <SkullIcon className="size-4" color="red" />
                  {handleNumberFormat(statesFetch.deaths)}
                </p>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Mortes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="flex items-center gap-2 hover:cursor-default hover:font-semibold">
                  <BiohazardIcon className="size-4" />
                  {handleNumberFormat(
                    statesFetch.cases +
                      statesFetch.deaths +
                      statesFetch.suspects
                  )}
                </p>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Total (Casos + Mortes + Suspeitos)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="col-span-3">
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Dados indisponíveis</p>
      </div>
    </div>
  );
};
