import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const Herosection = () => {
  return (
    <section className="relative mx-auto space-y-8 py-32 text-center text-primary-foreground">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Image
          src="/carousel.jpg"
          alt="Carousel Image"
          width={1200}
          height={800}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-foreground to-foreground/40"></div>
      </div>
      <main>
        <span className="text-caps2 uppercase">Featured post</span>
        <h2 className="mt-2 font-serif text-display">
          The Watch Collectors’ Journal
        </h2>
        <p className="mt-5 text-sub font-light">
          A curated look at rare finds, industry trends and expert insights
        </p>
        <Button className="mt-12 uppercase" variant={'outline'}>
          Read Story
        </Button>
      </main>
    </section>
  );
};

export default Herosection;
