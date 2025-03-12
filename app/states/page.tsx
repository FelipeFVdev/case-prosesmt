"use client";
import CardStatusContent from "@/components/card-status-content";
import { CardStatusFooter } from "@/components/card-status-footer";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

const States = () => {
  // refetch and caching
  const {
    data: dataStates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await fetch(
        "https://covid19-brazil-api.now.sh/api/report/v1/"
      );
      const { data } = await res.json();
      return data;
    },
    retry: 1,
  });

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

export default States;
