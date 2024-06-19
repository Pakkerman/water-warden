"use client";
import { useState, useEffect } from "react";

export type LocalStorageData = {
  wakeHour: number;
  wakeMinute: number;
  history: Array<History>;
};
export type History = { amount: number; timestamp: Date };

const initialStorage: LocalStorageData = {
  wakeHour: 12,
  wakeMinute: 30,
  history: [],
};

//TODO: Setting up local storage hook and implement to contexts
export function useLocalStorage() {
  const [isInit, setIsInit] = useState(true);
  const [storage, setStorage] = useState<LocalStorageData>(initialStorage);

  useEffect(() => {
    const store = localStorage.getItem("test");
    let data = initialStorage;
    if (store) {
      data = JSON.parse(store);
    }

    localStorage.setItem("test", JSON.stringify(storage));
    setStorage(data);
    setIsInit(false);
  }, []);

  useEffect(() => {
    console.log("this ran with init is", isInit);
    if (isInit) return;

    console.log("this ran with after init", isInit);
    localStorage.setItem("test", JSON.stringify(storage));
  }, [storage]);

  return { storage, setStorage };
}
