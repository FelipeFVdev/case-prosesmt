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
import { toast } from "sonner";

// Define a interface para os dados do estado
interface StateData {
  state?: string;
  country?: string;
  deaths: number;
  cases: number;
  suspects: number;
  confirmed?: number;
}

// URL base da API
const API_BASE_URL = "https://covid19-brazil-api.now.sh/api/report/v1";
const LOADING_DELAY_MS = 3000; // Define o tempo de atraso para exibição do carregamento

export const CardStatusContent = () => {
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const searchDate = searchParams.get("datetime");
  const searchRegion = searchParams.get("region");

  const [statesFetch, setStatesFetch] = useState<StateData[] | StateData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      let endpoint: string = "";
      let shouldDelay: boolean = false;

      try {
        // Define o endpoint com base nos parâmetros
        if (slug) {
          endpoint = `${API_BASE_URL}/brazil/uf/${slug.toLowerCase()}`;
          shouldDelay = true;
        } else if (searchDate) {
          endpoint = `${API_BASE_URL}/brazil/${searchDate}`;
          shouldDelay = true;
        } else if (searchRegion) {
          endpoint = `${API_BASE_URL}/${searchRegion}`;
          shouldDelay = true;
        } else {
          endpoint = API_BASE_URL;
        }

        // Faz a requisição para o endpoint
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Erro na requisição da API: ${response.status}`);
        }

        const result = await response.json();
        const resultData = "data" in result ? result.data : result;
        setStatesFetch(resultData);
      } catch (err) {
        console.error(`[COVID_API_ERROR]: ${err}`);
      } finally {
        // Controla o estado de carregamento com ou sem atraso
        const finishLoading = () => setIsLoading(false);

        if (shouldDelay) {
          setTimeout(finishLoading, LOADING_DELAY_MS);
        } else {
          finishLoading();
        }
      }
    };

    fetchData();
  }, [slug, searchDate, searchRegion]); // Array de dependências para o useEffect

  // Função para formatar números no padrão brasileiro
  const handleNumberFormat = (number: number) => {
    return new Intl.NumberFormat("pt-BR").format(number);
  };

  // Renderiza mensagem de erro caso ocorra algum problema
  if (error) {
    return (
      <div className="col-span-3">
        <div className="flex items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">
            Alguma coisa deu errado. Por favor tente novamente mais tarde!
          </p>
        </div>
      </div>
    );
  }

  // Renderiza os dados enquanto está carregando
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
    // Renderiza os dados de um único estado
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

  // Renderiza mensagem caso não haja dados disponíveis
  return (
    <div className="col-span-3">
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Dados indisponíveis</p>
      </div>
    </div>
  );
};
