"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WaterContext = {
  accumulation: number;
  setAccumulation: React.Dispatch<React.SetStateAction<number>>;
  waterConsumption: number;
  setWaterConsumption: React.Dispatch<React.SetStateAction<number>>;
  history: Array<History>;
  setHistory: React.Dispatch<React.SetStateAction<Array<History>>>;
};

type History = { amount: number; timestamp: Date };

const WaterContext = createContext<WaterContext | null>(null);
export function WaterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { storage, setStorage, isLoading } = useLocalStorage();

  const [accumulation, setAccumulation] = useState(500);
  const [waterConsumption, setWaterConsumption] = useState(0);
  const [history, setHistory] = useState<Array<History>>(storage.history);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    setHistory(storage.history);

    setIsInit(false);
  }, [isLoading]);

  useEffect(() => {
    if (isInit) return;

    setStorage((prev) => ({ ...prev, history }));
  }, [history]);

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
