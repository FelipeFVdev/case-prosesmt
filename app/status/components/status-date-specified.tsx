"use client";

import { CardStatusContent } from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { CardStatusFooter } from "@/components/card-status-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

type DateSpecifiedProps = {
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
export const DateSpecified = ({
  dataStates,
  isLoading,
  isError,
}: DateSpecifiedProps) => {
  return (
    <>
      <ScrollArea className="lg:h-[450px] h-80">
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          <CardStatusContent
            dataStates={dataStates}
            isLoading={isLoading}
            isError={isError}
          />
        </CardContent>
      </ScrollArea>

      <CardStatusFooter />
    </>
  );
};
