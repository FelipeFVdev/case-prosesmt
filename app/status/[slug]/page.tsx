"use client";
import { useQuery } from "@tanstack/react-query";
import { StateSpecified } from "../components/state-specified";
import { use } from "react";

const SpecificState = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  // refetch and caching
  const {
    data: dataState = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["specificState"],
    queryFn: async () => {
      const res = await fetch(
        `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${slug.toLowerCase()}`
      );
      const data = await res.json();
      return data;
    },
    retry: 1,
  });

  return (
    <StateSpecified
      dataState={dataState}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default SpecificState;
