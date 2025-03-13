"use client";

import { createContext, useContext, useEffect, useState } from "react";

type StateData = {
  state?: string;
  country?: string;
  deaths: number;
  cases: number;
  suspects?: number;
  confirmed?: number;
};

// Create the context
const StatesContext = createContext([]);

export function StatesProvider({ children }: { children: React.ReactNode }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statesFetch, setStatesFetch] = useState([]);
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
        setIsError(true);
        console.log("[states_GET]: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getStates();
  }, []);

  return (
    <StatesContext.Provider
      value={{
        statesFetch,
        setStatesFetch,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
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
