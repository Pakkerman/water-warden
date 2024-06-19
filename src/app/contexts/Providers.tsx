"use client";

import { useEffect, useState } from "react";
import { TimeContextProvider } from "./TimerContext";
import { WaterContextProvider } from "./WaterContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    let data = JSON.parse(localStorage.getItem("water_warden")!);
    if (!data) {
      data = { wakeHour: 7, wakeMinute: 30, history: [] };
    }

    setIsClient(true);
  }, []);

  return (
    <TimeContextProvider>
      <WaterContextProvider>{children}</WaterContextProvider>
    </TimeContextProvider>
  );
}
