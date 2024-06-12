"use client";

import { WaterContextProvider } from "./WaterContenxt";

export function Providers({ children }: { children: React.ReactNode }) {
  return <WaterContextProvider>{children}</WaterContextProvider>;
}
