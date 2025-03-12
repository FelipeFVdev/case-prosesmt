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

type CardStatusContentProps = {
  dataStates: Array<{
    state?: string;
    country?: string;
    deaths: number;
    cases: number;
    suspects?: number;
    confirmed?: number;
  }>;
  isLoading: boolean;
  isError: boolean;
};

export const CardStatusContent = ({
  dataStates,
  isLoading,
  isError,
}: CardStatusContentProps) => {
  if (isLoading) {
    return (
      <>
        {dataStates.map((data, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Skeleton className="h-35 w-50" />
          </div>
        ))}
      </>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">
          Alguma coisa deu errao. Por favor tente novamente mais tarde!
        </p>
      </div>
    );
  }

  const handleNumberFormat = (number: number) => {
    return new Intl.NumberFormat("pt-BR").format(number);
  };

  return (
    <>
      {dataStates.length > 0 ? (
        dataStates.map((item, index) => (
          <Card key={index} className=" gap-4 py-4">
            <CardHeader>
              <CardTitle>{item.state || item.country}</CardTitle>
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
        ))
      ) : (
        <Card className="gap-4 py-4">
          <CardHeader>
            <CardTitle>{dataStates.state}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="flex items-center gap-2 hover:cursor-default hover:font-semibold">
                    <SkullIcon className="size-4" color="red" />
                    {handleNumberFormat(dataStates.deaths)}
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
                      dataStates.cases + dataStates.deaths + dataStates.suspects
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
      )}
    </>
  );
};
