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
        className="text-caps1 uppercase text-primary"
      />
      <h2 className="font-serif text-h3 text-foreground transition-colors lg:text-h1">
        {title}
      </h2>
    </div>
  );
}
