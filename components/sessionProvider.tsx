"use client";

import * as React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function SessionProviders({ children, session }: SessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
