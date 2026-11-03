import React from "react";

const FIREFLIES = [
  { top: "12%", left: "8%", delay: "0s", duration: "8s" },
  { top: "22%", left: "78%", delay: "1.2s", duration: "10s" },
  { top: "38%", left: "18%", delay: "2.4s", duration: "9s" },
  { top: "48%", left: "88%", delay: "0.6s", duration: "11s" },
  { top: "62%", left: "42%", delay: "3.1s", duration: "8.5s" },
  { top: "74%", left: "12%", delay: "1.8s", duration: "12s" },
  { top: "18%", left: "55%", delay: "4s", duration: "9.5s" },
  { top: "82%", left: "70%", delay: "2s", duration: "10.5s" },
  { top: "55%", left: "62%", delay: "0.3s", duration: "7.5s" },
  { top: "30%", left: "35%", delay: "3.6s", duration: "11.5s" },
];

interface NightSkyProps {
  className?: string;
  dense?: boolean;
  fireflies?: boolean;
}

export function NightSky({
  className = "",
  dense = false,
  fireflies = true,
}: NightSkyProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="starfield" />
      {dense && <div className="starfield-dense" />}

      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] max-w-[720px] h-[40vh] rounded-full bg-[rgba(40,70,130,0.22)] blur-[100px]" />
      <div className="absolute bottom-[5%] right-[-5%] w-[45vw] max-w-[420px] h-[35vh] rounded-full bg-[rgba(230,179,90,0.08)] blur-[90px] ember-pulse" />
      <div className="absolute top-[40%] left-[-10%] w-[40vw] max-w-[360px] h-[30vh] rounded-full bg-[rgba(100,130,190,0.1)] blur-[80px]" />

      {fireflies &&
        FIREFLIES.map((f, i) => (
          <span
            key={i}
            className={`firefly ${i % 3 === 0 ? "firefly-sm" : ""} ${i > 6 ? "hidden sm:block" : ""}`}
            style={{
              top: f.top,
              left: f.left,
              animationDelay: f.delay,
              animationDuration: f.duration,
            }}
          />
        ))}
    </div>
  );
}
