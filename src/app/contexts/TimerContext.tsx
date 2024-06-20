"use client";

import { useState, useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WATCH_TIME = 10;
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const date = currentDate.getDate();

type TimeContext = {
  countdown: number;
  wakeHour: number;
  setWakeHour: React.Dispatch<React.SetStateAction<number>>;
  wakeMinute: number;
  setWakeMinute: React.Dispatch<React.SetStateAction<number>>;
  showTimeSetting: boolean;
  setShowTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimeContext = createContext<TimeContext | null>(null);
export function TimeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { storage, setStorage, isLoading } = useLocalStorage();

  const [showTimeSetting, setShowTimeSetting] = useState(false);
  const [wakeHour, setWakeHour] = useState(storage.wakeHour);
  const [wakeMinute, setWakeMinute] = useState(storage.wakeMinute);
  const [isInit, setIsInit] = useState(true);

  const countdown = getCountdown();

  useEffect(() => {
    if (isLoading) return;

    setWakeHour(storage.wakeHour);
    setWakeMinute(storage.wakeMinute);

    setIsInit(false);
  }, [isLoading]);

  useEffect(() => {
    if (isInit) return;

    setStorage((prev) => ({
      ...prev,
      wakeHour,
      wakeMinute,
    }));
  }, [wakeHour, wakeMinute]);

  function getCountdown(): number {
    return Math.floor(
      new Date(year, month, date, wakeHour + WATCH_TIME, wakeMinute).getTime() /
        1000 -
        currentDate.getTime() / 1000,
    );
  }

  return (
    <TimeContext.Provider
      value={{
        countdown,
        wakeMinute,
        wakeHour,
        showTimeSetting,
        setWakeMinute,
        setWakeHour,
        setShowTimeSetting,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

export function useTimeContext() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be use inside TimeConetxtProvider");
  }

  return context;
}
