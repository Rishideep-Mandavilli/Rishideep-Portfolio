"use client";

import { useState, useEffect } from "react";

export function TimeGreeting() {
  const [greeting, setGreeting] = useState("");
  const [timeIcon, setTimeIcon] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
        setTimeIcon("🌅");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
        setTimeIcon("☀️");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good evening");
        setTimeIcon("🌆");
      } else {
        setGreeting("Good night");
        setTimeIcon("🌙");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <span>{timeIcon}</span>
      <span>{greeting}</span>
    </span>
  );
}