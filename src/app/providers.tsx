import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { restoreAuthSession } from "../services/auth/platziAuth";
import { useAuthStore } from "../store/authStore";

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    const { setLoading, setSession } = useAuthStore.getState();

    let isMounted = true;

    void restoreAuthSession()
      .then((session) => {
        if (isMounted) setSession(session);
      })
      .catch(() => {
        if (isMounted) setSession(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}