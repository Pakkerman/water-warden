"use client";
import Link from "next/link";
import { Timer } from "./_components/timer";
import { DropIcon } from "~/svgs";
import { WaterAccumulator } from "./_components/waterAccumulator";
import { Drinks } from "./_components/drinks";
import { useState } from "react";
import { Menu } from "./_components/menu";

export default function HomePage() {
  const [remaining, setRemaining] = useState(500);

  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center text-slate-950 transition-all">
      <div className="container flex h-full flex-col items-center justify-between gap-12 px-4 py-8">
        <section className="flex w-full justify-between gap-4 self-start font-extrabold tracking-tight">
          <div>
            <h1 className="text-6xl text-blue-600">water</h1>
            <h1 className="flex text-3xl">
              warden
              <DropIcon />
            </h1>
            <Timer />
          </div>
          <Menu />
        </section>

        <div className="h-[500px] w-full">
          <WaterAccumulator remaining={remaining} />
        </div>
        <Drinks remaining={remaining} setRemaining={setRemaining} />
        <p>
          It is recommanded that you should drink water for the first 10 hours
          of the day.
        </p>
      </div>
    </main>
  );
}
