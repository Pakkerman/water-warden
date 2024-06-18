"use client";

import { createContext, useContext, useState } from "react";

type WaterContext = {
  accumulation: number;
  setAccumulation: React.Dispatch<React.SetStateAction<number>>;
  waterConsumption: number;
  setWaterConsumption: React.Dispatch<React.SetStateAction<number>>;
};

const WaterContext = createContext<WaterContext | null>(null);
export function WaterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accumulation, setAccumulation] = useState(500);
  const [waterConsumption, setWaterConsumption] = useState(0);

  return (
    <WaterContext.Provider
      value={{
        accumulation,
        waterConsumption,
        setAccumulation,
        setWaterConsumption,
      }}
    >
      {children}
    </WaterContext.Provider>
  );
}

export function useWaterContext() {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error("useWaterContext must be use inside WaterContextProvider");
  }

  return context;
}
