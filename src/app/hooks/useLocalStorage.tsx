"use client";

import { useState, useEffect } from "react";

export type LocalStorageData = {
  wakeHour: number;
  wakeMinute: number;
  history: Array<History>;
};
export type History = { amount: number; timestamp: Date };

const initialStorage: LocalStorageData = {
  wakeHour: 7,
  wakeMinute: 30,
  history: [],
};

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [storage, setStorage] = useState<LocalStorageData>(initialStorage);

  useEffect(() => {
    const store = localStorage.getItem("water_warden");

    let data;
    if (store) {
      data = JSON.parse(store) as LocalStorageData;
    } else {
      data = initialStorage;
    }

    localStorage.setItem("water_warden", JSON.stringify(data));
    setStorage(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    localStorage.setItem("water_warden", JSON.stringify(storage));
  }, [storage]);

  return { storage, setStorage, isLoading };
}
