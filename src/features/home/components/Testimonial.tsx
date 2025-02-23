import FeatherIcon from 'feather-icons-react';
import SectionTitle from './SectionTitle';
import Animate from '@/components/Animate';

type Testimonial = {
  name: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Aman Sharma',
    testimonial: 'I went from struggling with views to constant vitality.',
  },
  {
    name: 'Meera Joshi',
    testimonial:
      'Hands down the best investment I have made, simple and straightforward strategies.',
  },
  {
    name: 'Liam Carter',
    testimonial:
      'I struggled to get engagement for months—until this. Now, my content gets traction daily!',
  },
  {
    name: 'Sophia Martinez',
    testimonial:
      'This changed the game for me. More leads, more conversions, and zero guesswork.',
  },
  {
    name: 'Ethan Williams',
    testimonial:
      'From invisible to undeniable. The smartest decision I ever made.',
  },
  {
    name: 'Isabella Chen',
    testimonial:
      'My revenue doubled in just weeks. Wish I had found this sooner!',
  },
  {
    name: 'Daniel Thompson',
    testimonial:
      "No fluff, just results. If you're serious about growth, this is it.",
  },
  {
    name: 'Olivia Bennett',
    testimonial:
      'I was stuck at 500 followers for months. Now I wake up to new leads every day.',
  },
  {
    name: 'Raj Patel',
    testimonial:
      'Clear, actionable, and no BS. I finally understand what works—and why.',
  },
  {
    name: 'Emily Wong',
    testimonial:
      'I used to chase clients. Now they come to me. Best investment I’ve made.',
  },
  {
    name: 'James Müller',
    testimonial:
      'I thought growth was luck. Turns out, it’s just the right strategy.',
  },
  {
    name: 'Aisha Khan',
    testimonial: 'From 2 sales a month to 20+. Same effort, better system.',
  },
];

export default function Testimonial() {
  return (
    <section className="relative mx-auto max-w-screen-lg space-y-24 overflow-hidden">
      <SectionTitle
        title="What our Audience are Saying"
        subtitle="timeless echoes"
      />

      <div
        className="relative space-y-4"
        style={{
          mask: 'linear-gradient(90deg,transparent,white 20%,white 80%, transparent)',
        }}
      >
        <TestimonailMarquee
          testimonials={testimonials.slice(0, testimonials.length / 2)}
          duration={50}
        />
        <TestimonailMarquee
          testimonials={testimonials.slice(testimonials.length / 2)}
          duration={35}
        />
      </div>
    </section>
  );
}

function TestimonailMarquee({
  testimonials,
  duration = 5,
}: {
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div
      style={{
        ['--duration' as string]: `${duration}s`,
      }}
      className="flex w-max animate-marque will-change-transform"
    >
      {[...testimonials, ...testimonials].map((testimonial, i) => {
        return (
          <div key={i} className="w-80 shrink-0 flex-grow pl-4 md:w-[24rem]">
            <TestimonialCard testimonial={testimonial} />
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCard({
  testimonial: { testimonial, name },
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="h-full space-y-2 rounded-lg p-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-muted p-2">
          <FeatherIcon icon="user" />
        </div>
        <div className="text-xs font-medium">{name}</div>
      </div>
      <p className="text-xs">{testimonial}</p>
    </div>
  );
}
