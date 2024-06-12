"use client";

import { createContext, useContext, useState } from "react";

const WaterContext = createContext<any | null>(null);
export function WaterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accumulation, setAccumulation] = useState(500);

  return (
    <WaterContext.Provider value={{ accumulation, setAccumulation }}>
      {children}
    </WaterContext.Provider>
  );
}

export function useWaterContext() {
  const context = useContext(WaterContext);
  if (!context) return null;

  return context;
}
