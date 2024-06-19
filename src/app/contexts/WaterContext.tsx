"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
  const [accumulation, setAccumulation] = useState(500);
  const [waterConsumption, setWaterConsumption] = useState(0);
  const [history, setHistory] = useState<Array<History>>([]);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("water_warden")!);
    if (!data) {
      data = {};
    }

    if (!data.history) {
      data.history = [];
    }

    setHistory(data.history);
    setIsInit(false);
  }, []);

  useEffect(() => {
    if (isInit) return;

    const data = JSON.parse(localStorage.getItem("water_warden")!);

    data.history = history;
    localStorage.setItem("water_warden", JSON.stringify(data));
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
