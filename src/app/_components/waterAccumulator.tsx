"use client";

import { useEffect, useState } from "react";
import { useTimeContext } from "../contexts/TimerContext";
import { useWaterContext } from "../contexts/WaterContext";

const HEIGHT = 240;
const WATER_GOAL = 2500;
const TEN_HOURS_IN_SECONDS = 60 * 60 * 10;
const ACCUMULATION_PER_SECOND = 100 / TEN_HOURS_IN_SECONDS;

export function WaterAccumulator() {
  const [isClient, setIsClient] = useState(false);
  const { countdown } = useTimeContext();
  const { history } = useWaterContext();

  const progress = 1 - countdown / TEN_HOURS_IN_SECONDS;
  const progressOffset = Math.min(
    history.reduce((acc, curr) => acc + curr.amount, 0) / WATER_GOAL,
    1,
  );

  const style = {
    height: `${Math.max(Math.floor(HEIGHT * (progress - progressOffset)), 0)}px`,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center ">
      {/* <div className="absolute left-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      {/* <div className="absolute right-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      <div className="absolute bottom-0 right-0 z-10 text-xs">
        <pre>
          water drank:{history.reduce((acc, curr) => acc + curr.amount, 0)}
        </pre>
        <pre>progress offset: {progressOffset}</pre>
        <pre>height: {style.height}</pre>
      </div>
      <div className="border-3 relative h-60 w-40 rounded-md border-black bg-blue-300">
        <div
          className="absolute inset-x-4 bottom-0 rounded-md bg-blue-400 transition-all"
          style={style}
        ></div>
      </div>
    </div>
  );
}
