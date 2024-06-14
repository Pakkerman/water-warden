"use client";

import { padTime } from "~/utils/utils";
import { useTimeContext } from "../contexts/TimerContext";
import { AlarmIcon } from "~/svgs";

export function Timer() {
  const { countdown, wakeHour, wakeMinute } = useTimeContext();

  const hoursLeft = Math.floor(countdown / 3600);
  const minutsLeft = Math.floor(countdown / 60) % 60;
  const secondsLeft = countdown % 60;

  return (
    <div className="flex w-full flex-col">
      <div className="font-mono text-5xl font-bold">
        {countdown === 0 && <span className="text-2xl">End of watch!</span>}
        {countdown > 0 && (
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
        {countdown > 0 && <p>left</p>}
        {countdown === 0 && <p>ended XXX ago</p>}
      </div>
    </div>
  );
}
