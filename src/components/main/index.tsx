"use client";

import { ReactNode } from "react";
import { AgendaProvider } from "@/data/contexts/agenda.context";

export const Main = ({ children }: { children: ReactNode }) => (
  <AgendaProvider>{children}</AgendaProvider>
);
