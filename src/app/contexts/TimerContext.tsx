"use client";

import { useState, useContext, createContext, useEffect } from "react";

const WATCH_TIME = 10;
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const date = currentDate.getDate();
const wakeHour = 13; // 0-24
const wakeMinute = 33; // 0-59

const startTimestamp = new Date(
  year,
  month,
  date,
  wakeHour,
  wakeMinute,
).getTime();
const endTimestamp = new Date(
  year,
  month,
  date,
  wakeHour + WATCH_TIME,
  wakeMinute,
).getTime();

type TimeContext = {
  countdown: number;
  // setCountdown?: React.Dispatch<React.SetStateAction<number>>;
  wakeHour: number;
  // setWakeHour?: React.Dispatch<React.SetStateAction<number>>;
  wakeMinute: number;
  // setWakeMinute?: React.Dispatch<React.SetStateAction<number>>;
};

const TimeContext = createContext<TimeContext | null>(null);
export function TimeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countdown, setCountdown] = useState(0);
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(33);

  useEffect(() => {
    setCountdown(
      Math.floor(endTimestamp / 1000 - currentDate.getTime() / 1000),
    );

    const id = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <TimeContext.Provider value={{ countdown, wakeMinute, wakeHour }}>
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
