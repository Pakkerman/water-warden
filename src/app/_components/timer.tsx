"use client";

import { padTime } from "~/utils/utils";
import { useTimeContext } from "../contexts/TimerContext";
import { AlarmIcon } from "~/svgs";
import { useEffect, useState } from "react";

export function Timer() {
  const { countdown, wakeHour, wakeMinute } = useTimeContext();
  const [time, setTime] = useState(countdown);
  const [isClient, setIsClient] = useState(false);

  const hoursLeft = Math.floor(time / 3600);
  const minutsLeft = Math.floor(time / 60) % 60;
  const secondsLeft = time % 60;

  useEffect(() => {
    setIsClient(true);
    setTime(countdown);

    const id = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [countdown]);

  if (!isClient) return null;

  return (
    <div className="flex w-full flex-col">
      <div className="font-mono text-5xl font-bold">
        {time === 0 && <span className="text-2xl">End of watch!</span>}
        {time > 0 && (
          <>
            <span>{padTime(hoursLeft)}</span>:<span>{padTime(minutsLeft)}</span>
            :<span>{padTime(secondsLeft)}</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-between px-1 text-sm">
        <p className="flex gap-1">
          <AlarmIcon size={20} />
          {padTime(wakeHour)}:{padTime(wakeMinute)}
        </p>
        {time > 0 && <p>left</p>}
        {time === 0 && <p>ended XXX ago</p>}
      </div>
    </div>
  );
}
