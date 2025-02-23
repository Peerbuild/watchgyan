import { Separator } from '@/components/ui/separator';
import FeatherIcon from 'feather-icons-react';
import AnimatedButton from './AnimatedButton';
import Animate from '@/components/Animate';
import Image from 'next/image';

const communityFeatures = [
  {
    title: 'Regular Youtube Videos',
    icon: 'youtube',
  },
  {
    title: 'Insightful Newsletters',
    icon: 'mail',
  },
  {
    title: 'Global Blogs & Stories',
    icon: 'book-open',
  },
  {
    title: 'Pan India Collaborations',
    icon: 'users',
  },
];

export default function Herosection() {
  return (
    <section className="relative flex min-h-svh items-center px-8 pt-80 lg:p-28 lg:pt-60">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="absolute inset-0 h-full w-full">
          {/* Background Image */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src="/hero-bg.jpg"
              alt="Hero Background"
              fill
              className="!-top-40 !h-[110%] object-cover object-[75%_120%] md:h-full lg:object-center"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 h-[105%] w-full bg-gradient-to-b from-background via-background/70 via-10% to-background to-80% lg:bg-[radial-gradient(100.31%_100.84%_at_93.91%_-5%,var(--tw-gradient-stops))] lg:from-background/10 lg:to-background lg:to-100%" />
        </div>
        <main className="relative z-10 mx-auto max-w-md text-center lg:mx-0 lg:text-left">
          <Animate className="space-y-10 lg:space-y-14">
            <div className="space-y-4 lg:space-y-7">
              <h1 className="text-balance font-serif text-h2 text-foreground transition-colors md:text-display">
                In every tick,
                <br /> a tale of artistry.
              </h1>
              <p className="text-body text-foreground transition-colors lg:text-sub">
                Watch wisdom by Pankaj Savant
              </p>
            </div>
            <div className="space-y-5">
              <div className="text-caps2 uppercase text-primary">
                For The Community:
              </div>
              <div className="mx-auto grid w-fit gap-5 md:grid-cols-2 lg:w-auto">
                {communityFeatures.map((feature) => {
                  return (
                    <div
                      className="flex w-fit items-center gap-2 text-foreground transition-colors"
                      key={feature.title}
                    >
                      <FeatherIcon
                        icon={feature.icon}
                        className="size-5 text-primary"
                      />
                      {feature.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <AnimatedButton size={'lg'}>
              Join Community
              <Separator orientation="vertical" className="h-1/2 bg-primary" />
              <span className="line-through">₹ 199</span> Free
            </AnimatedButton>
          </Animate>
        </main>
      </div>
    </section>
  );
}
