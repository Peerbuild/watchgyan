"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Paralax from "./Paralax";
import Animate from "@/components/Animate";
import { motion } from "motion/react";
import { Blog } from "@prisma/client";
import Link from "next/link";

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
  const [isInteracted, setIsInteracted] = useState(false);
  const [key, setKey] = useState(0);

  const moveToSlide = (index: number) => {
    setCurrentSlide(index);
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (blogs.length <= 1) return;
    const timer = isInteracted ? 10000 : 5000;

    const timeout = setTimeout(() => {
      moveToSlide((currentSlide + 1) % blogs.length);
      setIsInteracted(false);
    }, timer);

    return () => clearTimeout(timeout);
  }, [blogs.length, currentSlide, isInteracted]);

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
              className="h-full w-full object-cover duration-500 animate-in fade-in-0"
            />
          )}
        </Paralax>
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(120deg,var(--tw-gradient-stops))] from-background/90 from-40% to-background/40"></div>
      </div>
      <div className="relative z-10 mx-auto mt-10 w-full max-w-screen-2xl px-9 md:px-24">
        <Animate className="max-w-lg">
          <p className="text-caps2 uppercase text-foreground/80">
            Featured post
          </p>
          <h2 className="mt-4 font-serif text-h2 animate-in fade-in-0 slide-in-from-bottom-6 md:text-display">
            {blogs[currentSlide].title}
          </h2>
          <p className="mt-5 text-sub font-light text-foreground/80">
            {blogs[currentSlide].description}
          </p>
          <Link
            href={`/blog/${blogs[currentSlide].id}/${blogs[currentSlide].slug}`}
          >
            <Button className="mt-12 uppercase" variant={"outline"}>
              Read Story
            </Button>
          </Link>
        </Animate>
      </div>
      <div className="absolute bottom-10 right-10 z-10 flex gap-4 md:bottom-20 md:right-20">
        {[...Array(blogs.length)].map((_, i) => (
          <div
            onClick={() => {
              setIsInteracted(true);
              moveToSlide(i);
            }}
            key={i}
            className="flex w-5 min-w-0 flex-1 cursor-pointer flex-col text-center"
          >
            {convertToRoman(i + 1)}{" "}
            {currentSlide === i && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: isInteracted ? 10 : 5,
                }}
                className="mt-1 inline-block h-0.5 w-full origin-left bg-foreground will-change-contents"
              ></motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
