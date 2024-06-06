import Link from "next/link";
import { Timer } from "./_components/timer";
import { DropIcon } from "~/svgs";

export default function HomePage() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center text-slate-950">
      <div className="container flex h-full flex-col items-center justify-between gap-12 px-4 py-8">
        <div className="self-start font-extrabold tracking-tight sm:text-[5rem]">
          <h1 className="text-6xl text-blue-600">Water</h1>
          <h1 className="flex text-3xl">
            Warden
            <DropIcon />
          </h1>
        </div>
        <p>
          It is recommanded that you should drink water for the first 10 hours
          of the day.
        </p>
        <Timer />
      </div>
    </main>
  );
}
