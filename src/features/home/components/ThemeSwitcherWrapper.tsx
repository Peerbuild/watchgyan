"use client";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function ThemeSwitcherWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px",
  });

  useEffect(() => {
    const [container] = document.getElementsByClassName("theme-wrapper");
    if (!container) return;

    if (isInView) {
      container.classList.add("dark");
    } else {
      container.classList.remove("dark");
    }
  }, [isInView]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
