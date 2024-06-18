"use client";

import { TimeContextProvider } from "./TimerContext";
import { WaterContextProvider } from "./WaterContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TimeContextProvider>
      <WaterContextProvider>{children}</WaterContextProvider>
    </TimeContextProvider>
  );
}
