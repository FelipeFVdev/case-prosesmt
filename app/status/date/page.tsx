"use client";
import { useQuery } from "@tanstack/react-query";
import { DateSpecified } from "../components/status-date-specified";
import { useSearchParams } from "next/navigation";

// TO DO: PASSAR PARA CARD-STATUS-CONENT
const DateSpecificState = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("params");

  // refetch and caching
  const {
    data: dataStates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dateSpecificState"],
    queryFn: async () => {
      const res = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${search}`
      );
      const { data } = await res.json();
      return data;
    },
    retry: 1,
  });

  return (
    <DateSpecified
      dataStates={dataStates}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default DateSpecificState;
