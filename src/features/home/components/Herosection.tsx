import { Separator } from '@/components/ui/separator';
import FeatherIcon from 'feather-icons-react';
import AnimatedButton from './AnimatedButton';
import Animate from '@/components/Animate';
import HeroParalaxBg from './ParalaxBg';

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
        <HeroParalaxBg
          bgUrl="/hero-bg.jpg"
          className="bg-[length:350%] bg-[position:75%_120%] bg-no-repeat before:absolute before:inset-0 before:h-[105%] before:w-full before:bg-gradient-to-b before:from-background before:via-background/70 before:via-10% before:to-background before:to-80% sm:bg-cover md:bg-[length:150%] lg:via-0% lg:bg-cover lg:bg-center lg:before:bg-[radial-gradient(100.31%_100.84%_at_93.91%_-5%,var(--tw-gradient-stops))] lg:before:from-background/10 lg:before:to-background lg:before:to-100%"
        />
        <main className="relative z-10 mx-auto max-w-md text-center lg:mx-0 lg:text-left">
          <Animate className="space-y-14">
            <div className="space-y-7">
              <h1 className="text-balance font-serif text-h2 text-foreground transition-colors md:text-display">
                In every tick,
                <br /> a tale of artistry.
              </h1>
              <p className="text-body text-foreground transition-colors lg:text-sub">
                Wisdom, for true watch enthusiasts.
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
