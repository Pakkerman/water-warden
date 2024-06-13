"use client";

import { useWaterContext } from "../contexts/WaterContenxt";

export function WaterAccumulator() {
  const { accumulation } = useWaterContext();
  const height = Math.floor(accumulation / 50);

  return (
    <div className="relative flex h-full flex-col items-center justify-center ">
      <h1>remaining: {accumulation}</h1>
      <h1>height: {height}</h1>
      {/* <div className="absolute left-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      {/* <div className="absolute right-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      <div className="border-3 relative h-60 w-40 rounded-md border-black bg-blue-300">
        <div
          className="absolute inset-x-4 bottom-0 rounded-md bg-blue-400"
          style={{ height: `${height * 15}px` }}
        ></div>
      </div>
    </div>
  );
}
