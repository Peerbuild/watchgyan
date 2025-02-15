import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FeatherIcon from 'feather-icons-react';

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
    <section className="relative bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat p-28 before:absolute before:inset-0 before:h-full before:w-full before:bg-[radial-gradient(50.31%_50.84%_at_73.91%_50.24%,var(--tw-gradient-stops))] before:from-transparent before:to-background">
      <div className="mx-auto max-w-screen-2xl">
        <main className="relative z-10 max-w-md space-y-14">
          <div className="space-y-7">
            <h1 className="font-serif text-display">
              In every tick, a tale of artistry.
            </h1>
            <p className="text-sub">
              Essential wisdom for true watch enthusiasts by Pankaj Savant
            </p>
          </div>
          <div className="space-y-5">
            <div className="text-caps2 uppercase">For The Community:</div>
            <div className="grid grid-cols-2 gap-5">
              {communityFeatures.map((feature) => {
                return (
                  <div className="flex items-center gap-2" key={feature.title}>
                    <FeatherIcon icon={feature.icon} className="size-5" />
                    {feature.title}
                  </div>
                );
              })}
            </div>
          </div>
          <Button>
            Join the Community
            <Separator orientation="vertical" className="h-1/2" />
            <span className="line-through">₹ 199</span> Free
          </Button>
        </main>
      </div>
    </section>
  );
}
