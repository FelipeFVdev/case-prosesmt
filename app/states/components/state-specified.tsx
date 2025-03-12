"use client";

import CardStatusContent from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { CardStatusFooter } from "@/components/card-status-footer";

type StateSpecifiedProps = {
  dataState: any[];
  isLoading: boolean;
  isError: boolean;
};
export const StateSpecified = ({
  dataState,
  isLoading,
  isError,
}: StateSpecifiedProps) => {
  const queryClient = useQueryClient();

  const dataStates: any[] = queryClient.getQueryData(["states"]) || [];

  return (
    <>
      <CardContent>
        <CardStatusContent
          dataStates={dataState}
          isLoading={isLoading}
          isError={isError}
        />
      </CardContent>
      <CardStatusFooter />
    </>
  );
};
