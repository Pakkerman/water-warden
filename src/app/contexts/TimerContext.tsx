"use client";

import { useState, useContext, createContext, useEffect } from "react";

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
  // const s = useLocalStorage();

  const [storage, setStorage] = useState<LocalData>({
    wakeHour: 7,
    wakeMinute: 30,
  });

  const [showTimeSetting, setShowTimeSetting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [wakeHour, setWakeHour] = useState(-1);
  const [wakeMinute, setWakeMinute] = useState(-1);

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
  }, []);

  useEffect(() => {
    // FIX: fix this weird condition that makes me cringe
    if (wakeHour === -1 || wakeMinute === -1) return;
    localStorage.setItem(
      "water_warden",
      JSON.stringify({ wakeHour, wakeMinute }),
    );
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
