"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Menu() {
  return (
    <div className="grid aspect-square h-full grid-cols-2 place-items-center rounded-xl bg-blue-200">
      <ChangeWakeTimeButton />
      <ChangeWakeTimeButton />
      <ChangeWakeTimeButton />
      <ChangeWakeTimeButton />
    </div>
  );
}

export function ChangeWakeTimeButton() {
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="h-12 w-12 rounded-md border-2 border-black/20"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? 1 : 0}
      </button>
      {show && (
        <div className="fixed inset-0" onClick={() => setShow(false)}></div>
      )}
      <Drawer show={show} />
    </>
  );
}

export function Drawer({ show }: { show: boolean }) {
  const [value, setValue] = useState("0");

  useEffect(() => {
    const mainWrapper = document.querySelector("main");
    if (!mainWrapper) return;

    if (show) {
      mainWrapper.setAttribute("style", "scale: 98%");
    }
    if (!show) {
      mainWrapper.setAttribute("style", "scale: 100%");
    }
  }, [show]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-10 flex flex-col items-center justify-center bg-orange-400 transition-all duration-300 ease-in-out ",
        show ? "translate-y-[30%]" : "translate-y-[100%]",
      )}
    >
      <div className="h-[70%]">
        <div className="flex flex-col gap-2 rounded-md border border-black/40 bg-white/70 p-4">
          <h1>When did you wake up?</h1>
          <input
            name="time"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button className="rounded-md border border-black/20 p-2">Set</button>
        </div>
      </div>
    </div>
  );
}
