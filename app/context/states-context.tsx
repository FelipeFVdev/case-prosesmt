"use client";

import { createContext, useContext, useEffect, useState } from "react";

type StateFetchType = {
  state?: string;
  uf?: string;
  country?: string;
  deaths: number;
  cases: number;
  suspects?: number;
  confirmed?: number;
};

// Create the context
const StatesContext = createContext<{ statesFetch: StateFetchType[] }>({
  statesFetch: [],
});

export function StatesProvider({ children }: { children: React.ReactNode }) {
  const [statesFetch, setStatesFetch] = useState<StateFetchType[]>([]);
  useEffect(() => {
    // RETORNA TODOS OS ESTADOS DO BRAZIL
    const getStates = async () => {
      try {
        const res = await fetch(
          "https://covid19-brazil-api.now.sh/api/report/v1/"
        );
        const { data } = await res.json();
        setStatesFetch(data);
      } catch (error) {
        console.log("[states_GET]: ", error);
      }
    };

    getStates();
  }, []);

  return (
    <StatesContext.Provider
      value={{
        statesFetch,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
}

// Create a custom hook for using this context
export function useStatesContext() {
  return useContext(StatesContext);
}
