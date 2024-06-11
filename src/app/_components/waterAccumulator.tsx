"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function WaterAccumulator() {
  const [height, setHeight] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setHeight((prev) => (prev + 1) % 10);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center justify-center ">
      <h1>accumulating</h1>
      {/* <div className="absolute left-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      {/* <div className="absolute right-20 top-[50%] h-[300px] w-2 translate-y-[-50%] bg-slate-950" /> */}
      <div className="border-3 relative h-40 w-20 rounded-md border-black bg-blue-300">
        <div
          className="absolute inset-x-4 bottom-0 rounded-md bg-blue-400"
          style={{ height: `${height * 15}px` }}
        ></div>
      </div>
    </div>
  );
}
