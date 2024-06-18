// "use client";
// import { useState, useEffect } from "react";
//
// const initialStorage = { wakeHour: 12, wakeMinute: 30 };
//
// export function useLocalStorage() {
//   const [storage, setStorage] = useState(initialStorage);
//   const [isClient, setIsClient] = useState(false);
//   console.log("hook ran");
//
//   useEffect(() => {
//     setIsClient(true);
//     if (typeof window !== "undefined") {
//       const storedData = localStorage.getItem("water_warden");
//       if (storedData) {
//         setStorage(JSON.parse(storedData));
//       } else {
//         localStorage.setItem("water_warden", JSON.stringify(initialStorage));
//         setStorage(initialStorage);
//       }
//     }
//   }, []);
//
//   if (!isClient) {
//     // Return a placeholder during server-side rendering
//     return initialStorage;
//   }
//
//   return storage;
// }
