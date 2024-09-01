"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/config/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
