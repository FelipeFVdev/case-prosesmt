"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define o tipo para os dados de estado
type StateFetchType = {
  state?: string;
  uf?: string;
  country?: string;
  deaths: number;
  cases: number;
  suspects?: number;
  confirmed?: number;
};

// Cria o contexto com um valor padrão
const StatesContext = createContext<{ statesFetch: StateFetchType[] }>({
  statesFetch: [],
});

// Define o provedor do contexto
export function StatesProvider({ children }: { children: React.ReactNode }) {
  const [statesFetch, setStatesFetch] = useState<StateFetchType[]>([]);

  useEffect(() => {
    // Função para buscar todos os estados do Brasil
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

    // Chama a função para buscar os estados
    getStates();
  }, []); // O array vazio [] garante que o efeito seja executado apenas uma vez, quando o componente é montado

  return (
    // Provedor do contexto que passa os dados dos estados para os componentes filhos
    <StatesContext.Provider
      value={{
        statesFetch,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
}

// Hook personalizado para usar o contexto dos estados
export function useStatesContext() {
  return useContext(StatesContext);
}
