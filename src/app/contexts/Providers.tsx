"use client";

import { TimeContextProvider } from "./TimerContext";
import { WaterContextProvider } from "./WaterContenxt";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TimeContextProvider>
      <WaterContextProvider>{children}</WaterContextProvider>
    </TimeContextProvider>
  );
}
