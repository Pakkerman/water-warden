"use client";

import { useEffect, useState } from "react";

const WATCH_TIME = 10;
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const date = currentDate.getDate();
const wakeHour = 7; // 0-24
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

export function Timer() {
  const [countdown, setCountdown] = useState(0);
  const [ms, setMs] = useState(10);

  const hoursLeft = Math.floor(countdown / 3600);
  const minutsLeft = Math.floor(countdown / 60) % 60;
  const secondsLeft = countdown % 60;

  useEffect(() => {
    // Avoid client and sever side html mismatch
    setCountdown(
      Math.floor(endTimestamp / 1000 - currentDate.getTime() / 1000),
    );

    const id = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  if (!countdown) return null;

  return (
    <div className="flex w-full flex-col">
      <div className="font-mono text-5xl font-bold">
        <span>{padTime(hoursLeft)}</span>:<span>{padTime(minutsLeft)}</span>:
        <span>{padTime(secondsLeft)}</span>
      </div>

      <div className="flex items-center justify-between px-1 text-sm">
        <p>
          wake time: {padTime(wakeHour)}:{padTime(wakeMinute)}
        </p>
        <p>left</p>
      </div>
    </div>
  );
}

function padTime(input: string | number): string {
  return input.toString().padStart(2, "0");
}
