import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';
import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-foreground text-primary-foreground">
      <main className="mx-auto flex max-w-screen-xl items-center gap-40">
        <div className="max-w-screen-sm flex-[2_1_0%] space-y-12">
          <div className="space-y-4">
            <div className="text-caps2">SIGN UP FOR BLOGS & NEWSLETTERS</div>
            <div className="font-serif text-h1">
              Inspirational Stories Right to Your Inbox
            </div>
          </div>
          <div className="flex border-b">
            <Input
              className="flex-1 border-none px-0 focus-visible:ring-transparent"
              placeholder="Enter your personal email"
            />
            <Button size={'icon'} variant={'ghost'}>
              <FeatherIcon icon="arrow-right" />
            </Button>
          </div>
        </div>
        <div className="flex-1 opacity-60">
          <Image src="/watch.png" alt="Watch Image" width={500} height={500} />
        </div>
      </main>
    </section>
  );
};

export default Newsletter;
