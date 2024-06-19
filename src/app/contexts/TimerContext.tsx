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
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  wakeHour: number;
  setWakeHour: React.Dispatch<React.SetStateAction<number>>;
  wakeMinute: number;
  setWakeMinute: React.Dispatch<React.SetStateAction<number>>;
  showTimeSetting: boolean;
  setShowTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

type LocalData = {
  wakeHour: number;
  wakeMinute: number;
};

const TimeContext = createContext<TimeContext | null>(null);
export function TimeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { storage: hookStorage, setStorage: setHookStorage } =
    useLocalStorage();
  console.log("in the time contenxt", hookStorage);

  const [storage, setStorage] = useState<LocalData>({
    wakeHour: 7,
    wakeMinute: 30,
  });

  const [showTimeSetting, setShowTimeSetting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [wakeHour, setWakeHour] = useState(-1);
  const [wakeMinute, setWakeMinute] = useState(-1);
  const [isInit, setIsInit] = useState(true);

  // intital loading from local storage
  useEffect(() => {
    const localData: string | null = localStorage.getItem("water_warden");

    if (localData == null) {
      setWakeHour(storage.wakeHour);
      setWakeMinute(storage.wakeMinute);
      localStorage.setItem("water_warden", JSON.stringify(storage));
    } else {
      const data = JSON.parse(localData) as LocalData;
      setStorage(data);
      setWakeHour(data.wakeHour);
      setWakeMinute(data.wakeMinute);
    }

    setIsInit(false);
  }, []);

  useEffect(() => {
    if (isInit) return;

    const data = JSON.parse(localStorage.getItem("water_warden")!);

    data.wakeHour = wakeHour;
    data.wakeMinute = wakeMinute;

    localStorage.setItem("water_warden", JSON.stringify(data));
    setHookStorage((prev) => ({
      ...prev,
      wakeHour,
      wakeMinute,
    }));

    setCountdown(getCountdown());
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
        setCountdown,
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
