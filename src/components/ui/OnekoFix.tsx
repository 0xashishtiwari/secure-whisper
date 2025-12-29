"use client";

import { useEffect } from "react";

export default function OnekoFix() {
  useEffect(() => {
    const interval = setInterval(() => {
      const oneko = document.getElementById("oneko");
      if (oneko && document.documentElement.contains(oneko)) {
        document.documentElement.appendChild(oneko);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return null;
}
