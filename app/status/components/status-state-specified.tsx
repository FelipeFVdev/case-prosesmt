"use client";

import { CardStatusContent } from "@/components/card-status-content";
import { CardContent } from "@/components/ui/card";
import { CardStatusFooter } from "@/components/card-status-footer";

type StateSpecifiedProps = {
  dataState: Array<{
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
export const StateSpecified = ({
  dataState,
  isLoading,
  isError,
}: StateSpecifiedProps) => {
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
