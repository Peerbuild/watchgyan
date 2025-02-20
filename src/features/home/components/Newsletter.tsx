import { Input } from '@/components/ui/input';
import SectionTitle from './SectionTitle';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';

export default function Newsletter() {
  return (
    <section className="relative mx-auto flex h-[30rem] max-w-screen-lg flex-col items-center justify-center px-8 lg:h-[40rem]">
      <SectionTitle
        title="Inspirational Stories Right to Your Inbox"
        subtitle="NEWSLETTER"
      />
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        {/* <div className="absolute h-full w-full bg-gradient-to-t from-background from-40% to-background/80 transition-colors duration-500"></div> */}
        <Image
          className="mx-auto h-full w-full object-cover opacity-30"
          src="/watch2.png"
          width={700}
          height={400}
          alt="Watch 2"
        />
      </div>
      <div className="relative mt-20 w-full max-w-sm">
        <Input placeholder="Enter your personal email" className="pr-10" />
        <FeatherIcon
          icon="arrow-right"
          className="absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
}
