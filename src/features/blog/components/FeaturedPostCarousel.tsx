"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Paralax from "./Paralax";
import Animate from "@/components/Animate";
import { motion } from "motion/react";
import { Blog } from "@prisma/client";

const convertToRoman = (num: number) => {
  const romanNumeralMap = [
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  for (const pair of romanNumeralMap) {
    const { value, numeral } = pair;
    result += numeral.repeat(Math.floor(num / value));
    num %= value;
  }

  return result;
};

interface FeaturedPostProps {
  blogs: Blog[];
}

export default function FeaturedPostCarousel({ blogs }: FeaturedPostProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (blogs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
      setKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, blogs.length]);

  if (!blogs.length) return null;

  return (
    <div key={key}>
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Paralax
          inputRange={[0, 1]}
          outputRange={[0, 400]}
          offset={["start start", "end start"]}
        >
          {blogs[currentSlide].thumbnail && (
            <Image
              src={blogs[currentSlide].thumbnail}
              alt="Carousel Image"
              width={1900}
              height={1000}
              priority
              className="h-full w-full object-cover saturate-50 duration-500 animate-in fade-in-0"
            />
          )}
        </Paralax>
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(120deg,var(--tw-gradient-stops))] from-background from-40% to-background/40"></div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-24">
        <Animate className="max-w-lg">
          <p className="text-caps2 uppercase">Featured post</p>
          <h2 className="mt-4 font-serif text-display animate-in fade-in-0 slide-in-from-bottom-6">
            {blogs[currentSlide].title}
          </h2>
          <p className="mt-5 text-sub font-light">
            {blogs[currentSlide].description}
          </p>
          <Button className="mt-12 uppercase" variant={"outline"}>
            Read Story
          </Button>
        </Animate>
      </div>
      <div className="absolute bottom-20 right-20 z-10 flex gap-4">
        {[...Array(blogs.length)].map((_, i) => (
          <div key={i} className="flex w-5 min-w-0 flex-1 flex-col text-center">
            {convertToRoman(i + 1)}{" "}
            {currentSlide === i && (
              <motion.span
                layout={"position"}
                layoutId="underline"
                className="inline-block h-0.5 w-full bg-foreground"
              ></motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
