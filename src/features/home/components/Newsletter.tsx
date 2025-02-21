import { Input } from '@/components/ui/input';
import SectionTitle from './SectionTitle';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';
import Animate from '@/components/Animate';

export default function Newsletter() {
  return (
    <section className="relative mx-auto flex h-[30rem] max-w-screen-lg flex-col items-center justify-center px-8 lg:h-[40rem]">
      <Animate
        className="absolute left-1/2 top-1/4 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2"
        delay={0.5}
      >
        <Image
          className="mx-auto h-full w-full object-cover opacity-30"
          src="/watch2.png"
          width={700}
          height={400}
          alt="Watch 2"
        />
      </Animate>
      <Animate>
        <SectionTitle
          title="Inspirational Stories Right to Your Inbox"
          subtitle="NEWSLETTER"
        />
        <div className="relative mx-auto mt-20 w-full max-w-sm">
          <Input placeholder="Enter your personal email" className="pr-10" />
          <FeatherIcon
            icon="arrow-right"
            className="absolute right-0 top-1/2 -translate-y-1/2"
          />
        </div>
      </Animate>
    </section>
  );
}
