"use client";

import { useEffect } from "react";

export default function OnekoFix() {
  useEffect(() => {
    const interval = setInterval(() => {
      const oneko = document.getElementById("oneko");
      if (oneko) {
        oneko.style.position = "fixed";
        oneko.style.zIndex = "2147483647"; // MAX SAFE Z-INDEX
        oneko.style.pointerEvents = "none";
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
