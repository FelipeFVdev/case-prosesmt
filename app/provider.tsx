"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = useMemo(() => {
    // Create a client
    const queryClient = new QueryClient();

    return queryClient;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
