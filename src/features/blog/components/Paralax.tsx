"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  UseScrollOptions,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function Paralax({
  className,
  inputRange,
  outputRange,
  offset,
  children,
}: {
  className?: string;
  inputRange: number[];
  outputRange: number[];
  offset: UseScrollOptions["offset"];
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      {children}
    </motion.div>
  );
}
