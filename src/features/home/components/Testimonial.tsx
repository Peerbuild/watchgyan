import SectionTitle from "./SectionTitle";
import Image from "next/image";

type Testimonial = {
  name: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Technical Guruji",
    testimonial: "Loved your presentation! Keep going, brother.",
  },
  {
    name: "Saintosk",
    testimonial: "I like Pankaj's style of product detailing.",
  },
  {
    name: "Mithrataluri",
    testimonial: "The best and most relatable watch enthusiast!",
  },
  {
    name: "Seemant Gupta",
    testimonial: "The most genuine guy out there. No gimmicks, just value!",
  },
  {
    name: "Ashwin Arya",
    testimonial: "Glad I found your content—helped me build my collection!",
  },
  {
    name: "Soumik Sarkar",
    testimonial:
      "Hats off! You're taking wristwatch culture to the next level.",
  },
  {
    name: "Dr. Vineet Rai",
    testimonial: "Genuine, unbiased, and insightful. Keep up the good work!",
  },
];

export default function Testimonial() {
  return (
    <section className="relative mx-auto max-w-screen-lg space-y-24 overflow-hidden">
      <SectionTitle
        title="What our Audience are Saying"
        subtitle="150K+ Following"
      />

      <div
        className="relative space-y-4"
        style={{
          mask: "linear-gradient(90deg,transparent,white 20%,white 80%, transparent)",
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
        ["--duration" as string]: `${duration}s`,
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
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-muted transition-colors duration-500">
          <Image
            className="h-full w-full object-cover"
            src={`/pfps/${name}.png`}
            alt={name}
            width={40}
            height={40}
          />
        </div>
        <div className="text-xs font-medium">{name}</div>
      </div>
      <p className="text-xs">{testimonial}</p>
    </div>
  );
}
