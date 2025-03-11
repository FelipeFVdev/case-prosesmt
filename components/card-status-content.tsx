import { LoaderCircleIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type CardStatusContentProps = {
  dataStates: any[];
  isLoading: boolean;
  isError: boolean;
};

const CardStatusContent = ({
  dataStates,
  isLoading,
  isError,
}: CardStatusContentProps) => {
  if (isLoading) {
    return <LoaderCircleIcon className="animate-spin" />;
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">
          Something went wrong. Try again later!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-96 overflow-y-auto">
      {dataStates.length > 0 ? (
        dataStates.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-2 border hover:bg-secondary rounded-lg p-4 mb-4 me-4">
                  <h3>Estado: {item.state}</h3>
                  <p>Status: {item.cases + item.deaths + item.suspects}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex gap-2">
                  <p>Cases:</p>
                  <span> {item.cases}</span>
                  <p>Deaths:</p>
                  <span> {item.deaths}</span>
                  <p>Suspects:</p>
                  <span> {item.suspects}</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex gap-2 border hover:bg-secondary rounded-lg p-4 mb-4 me-4">
                <h3>Estado: {dataStates.state}</h3>
                <p>
                  Status:{" "}
                  {dataStates.cases + dataStates.deaths + dataStates.suspects}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex gap-2">
                <p>Cases:</p>
                <span> {dataStates.cases}</span>
                <p>Deaths:</p>
                <span> {dataStates.deaths}</span>
                <p>Suspects:</p>
                <span> {dataStates.suspects}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </ScrollArea>
  );
};

export default CardStatusContent;
