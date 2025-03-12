"use client";

import { CardStatusContent } from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { CardStatusFooter } from "@/components/card-status-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

type DateSpecifiedProps = {
  dataStates: any[];
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
      <ScrollArea className="h-[450px]">
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
