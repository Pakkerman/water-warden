"use client";

import { useTimeContext } from "../contexts/TimerContext";

export function Timer() {
  const { countdown, wakeHour, wakeMinute } = useTimeContext();

  const hoursLeft = Math.floor(countdown / 3600);
  const minutsLeft = Math.floor(countdown / 60) % 60;
  const secondsLeft = countdown % 60;

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
