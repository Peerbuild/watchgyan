import { Input } from "@/components/ui/input";
import SectionTitle from "./SectionTitle";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import Animate from "@/components/Animate";
import Paralax from "@/features/blog/components/Paralax";

export default function Newsletter() {
  return (
    <section className="relative mx-auto flex h-[30rem] max-w-screen-lg flex-col items-center justify-center px-8 lg:h-[40rem]">
      <div className="absolute left-1/2 top-[16%] h-full w-full -translate-x-1/2 -translate-y-1/2 lg:top-1/4">
        <Paralax
          inputRange={[0, 1]}
          outputRange={[120, 200]}
          offset={["start center", "end center"]}
        >
          <Image
            className="mx-auto h-full w-full object-cover opacity-30"
            src="/watch.png"
            width={700}
            height={400}
            alt="Watch 2"
          />
        </Paralax>
      </div>
      <Animate className="relative z-10">
        <SectionTitle
          title="Inspirational Stories Right to Your Inbox"
          subtitle="NEWSLETTER"
        />
        <div className="relative mx-auto mt-20 w-full max-w-sm">
          <Input placeholder="Enter your personal email" className="pr-10" />
          <FeatherIcon
            icon="arrow-right"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground transition-colors duration-500"
          />
        </div>
      </Animate>
    </section>
  );
}
