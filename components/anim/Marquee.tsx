"use client";

import type { CSSProperties, ReactNode } from "react";

export default function Marquee({
  children,
  duration = 38,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-wrap overflow-hidden ${className ?? ""}`}>
      <div
        className={`marquee ${reverse ? "marquee--reverse" : ""}`}
        style={{ "--duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
