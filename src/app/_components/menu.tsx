"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTimeContext } from "../contexts/TimerContext";
import { SettingIcon } from "~/svgs";
import { createPortal } from "react-dom";

export function Menu() {
  return (
    <div className="grid h-full grid-cols-1 place-items-center rounded-xl bg-blue-200 px-2">
      <ChangeWakeTimeButton />
    </div>
  );
}

export function ChangeWakeTimeButton() {
  const { showTimeSetting, setShowTimeSetting } = useTimeContext();
  return (
    <>
      <button
        className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-black"
        onClick={() => {
          setShowTimeSetting(!showTimeSetting);
        }}
      >
        <SettingIcon />
      </button>
      {showTimeSetting && (
        <div
          className="fixed inset-0 "
          onClick={() => setShowTimeSetting(false)}
        ></div>
      )}
      <Drawer />
    </>
  );
}

export function Drawer() {
  const {
    wakeMinute,
    wakeHour,
    showTimeSetting,
    setWakeMinute,
    setWakeHour,
    setShowTimeSetting,
  } = useTimeContext();
  const [wakeHourInputValue, setWakeHourInputValue] = useState(wakeHour);
  const [wakeMinuteInputValue, setWakeMinuteInputValue] = useState(wakeMinute);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const mainWrapper = document.querySelector("main");
    if (!mainWrapper) return;

    if (showTimeSetting) {
      mainWrapper.setAttribute("style", "scale: 98%");
    }
    if (!showTimeSetting) {
      mainWrapper.setAttribute("style", "scale: 100%");
    }
  }, [showTimeSetting]);

  useEffect(() => {
    setWakeHourInputValue(wakeHour);
    setWakeMinuteInputValue(wakeMinute);
  }, [wakeHour, wakeMinute]);

  function setWakeTime() {
    setWakeHour(Number(wakeHourInputValue));
    setWakeMinute(Number(wakeMinuteInputValue));
    setShowTimeSetting(false);
  }

  if (!isClient) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-30 overflow-y-hidden">
      <div
        className={clsx(
          "pointer-events-auto flex h-full flex-col items-center justify-center rounded-2xl bg-orange-400 transition-all duration-300 ease-in-out",
          showTimeSetting ? "translate-y-[30%]" : "translate-y-[100%]",
        )}
      >
        <div className="h-[70%]">
          <div className="flex flex-col gap-2 rounded-md border border-black/40 bg-white/70 p-4">
            <h1>When did you wake up?</h1>
            <div className="flex justify-center gap-2">
              <input
                className="w-12 rounded-md p-2 text-center"
                name="hour"
                value={wakeHourInputValue}
                maxLength={2}
                min={0}
                max={24}
                autoComplete="off"
                onChange={(event) =>
                  setWakeHourInputValue(Number(event.target.value))
                }
              />
              <input
                className="w-12 rounded-md p-2 text-center"
                name="minute"
                value={wakeMinuteInputValue}
                maxLength={2}
                min={0}
                max={59}
                autoComplete="off"
                onChange={(event) =>
                  setWakeMinuteInputValue(Number(event.target.value))
                }
              />
            </div>
            <button
              className="rounded-md border border-black/20 p-2"
              onClick={setWakeTime}
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root")!,
  );
}
