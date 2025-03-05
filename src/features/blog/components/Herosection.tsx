import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Paralax from "./Paralax";

const Herosection = () => {
  return (
    <section className="dark relative mx-auto flex min-h-svh items-center space-y-8 py-32 text-foreground">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Paralax
          inputRange={[0, 1]}
          outputRange={[0, 400]}
          offset={["start start", "end start"]}
        >
          <Image
            src="/carousel.jpg"
            alt="Carousel Image"
            width={1200}
            height={800}
            className="h-full w-full object-cover saturate-50"
          />
        </Paralax>
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(120deg,var(--tw-gradient-stops))] from-background from-40% to-transparent"></div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-24">
        <main className="max-w-lg">
          <p className="text-caps2 uppercase">Featured post</p>
          <h2 className="mt-4 font-serif text-display">
            The Watch Collectors’ Journal
          </h2>
          <p className="mt-5 text-sub font-light">
            A curated look at rare finds, industry trends and expert insights
          </p>
          <Button className="mt-12 uppercase" variant={"outline"}>
            Read Story
          </Button>
        </main>
      </div>
    </section>
  );
};

export default Herosection;
