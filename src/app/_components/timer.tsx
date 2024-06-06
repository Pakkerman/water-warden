"use client";

import { useEffect, useState } from "react";

const DRINK_TIME_WINDOW = 11;
const startTime = Number(new Date(2024, 5, 5, 7).getTime());
const now = Number(new Date().getTime());
const endTime = Number(
  new Date(startTime + DRINK_TIME_WINDOW * 3600 * 1000).getTime(),
);

export function Timer() {
  const [time, setTime] = useState(
    new Date(2024, 0, 1, 0, 60).getTime() -
      new Date(2024, 0, 1, 0, 50).getTime(),
  );
  // const [time, setTime] = useState(endTime - now);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 3600000) / 60000);
  2;
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, "0");

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => prev - 10);
    }, 10);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p>you wake up at: {new Date(startTime).toLocaleTimeString()}</p>
      <p>end of watch time:{new Date(endTime).toLocaleTimeString()}</p>
      <p>time left {time}</p>

      <p className="font-mono text-3xl">{`${hours}:${minutes}:${seconds}:${milliseconds}`}</p>
    </div>
  );
}
