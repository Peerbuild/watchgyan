import AnimatedText from './AnimateText';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-[37.8rem] space-y-4 text-center">
      <AnimatedText
        text={subtitle}
        className="text-[14px] uppercase text-primary lg:text-caps1"
      />
      <h2 className="mx-auto max-w-72 font-serif text-h3 text-foreground transition-colors lg:max-w-none lg:text-h1">
        {title}
      </h2>
    </div>
  );
}
