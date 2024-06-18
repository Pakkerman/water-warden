"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WaterContext = {
  accumulation: number;
  setAccumulation: React.Dispatch<React.SetStateAction<number>>;
  waterConsumption: number;
  setWaterConsumption: React.Dispatch<React.SetStateAction<number>>;
  history: History;
  setHistory: React.Dispatch<React.SetStateAction<History>>;
};

type History = Array<{ amount: number }>;

const WaterContext = createContext<WaterContext | null>(null);
export function WaterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accumulation, setAccumulation] = useState(500);
  const [waterConsumption, setWaterConsumption] = useState(0);
  const [history, setHistory] = useState<History>([]);

  return (
    <WaterContext.Provider
      value={{
        accumulation,
        waterConsumption,
        history,
        setAccumulation,
        setWaterConsumption,
        setHistory,
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
