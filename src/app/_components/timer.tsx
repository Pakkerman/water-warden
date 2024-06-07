"use client";

import { useEffect, useState } from "react";

const WATCH_TIME = 10;
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();
const wakeHour = 12; // 0-24
const wakeMinute = 0; // 0-59

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
  const [countdown, setCountdown] = useState(
    Math.floor(endTimestamp / 1000 - new Date().getTime() / 1000),
  );
  const [ms, setMs] = useState(10);

  const hoursLeft = Math.floor(countdown / 3600);
  const minutsLeft = Math.floor(countdown / 60) % 60;
  const secondsLeft = countdown % 60;

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="">
      <p className="font-mono text-5xl font-bold">
        <span>{padTime(hoursLeft)}</span>:<span>{padTime(minutsLeft)}</span>:
        <span>{padTime(secondsLeft)}</span>
      </p>
    </div>
  );
}

function padTime(input: string | number): string {
  return input.toString().padStart(2, "0");
}
