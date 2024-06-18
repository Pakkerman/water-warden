"use client";

import { useTimeContext } from "../contexts/TimerContext";
import { useWaterContext } from "../contexts/WaterContenxt";

const HEIGHT = 240;
const WATER_GOAL = 2500;
const TEN_HOURS_IN_SECONDS = 60 * 60 * 10;

export function WaterAccumulator() {
  const { countdown } = useTimeContext();
  const { waterConsumption } = useWaterContext();
  const progress = 1 - countdown / TEN_HOURS_IN_SECONDS;
  const progressOffset = Math.min(waterConsumption / WATER_GOAL, 1);

  const style = {
    height: `${Math.max(HEIGHT * (progress - progressOffset), 0)}px`,
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center ">
      {/* <div className="absolute left-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      {/* <div className="absolute right-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      <p>water drank:{waterConsumption}</p>
      <p>progress offset: {progressOffset}</p>
      <div className="border-3 relative h-60 w-40 rounded-md border-black bg-blue-300">
        <div
          className="absolute inset-x-4 bottom-0 rounded-md bg-blue-400"
          style={style}
        ></div>
      </div>
    </div>
  );
}
