interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-[37.8rem] space-y-5 text-center">
      <p className="text-caps1 uppercase">{subtitle}</p>
      <h2 className="font-serif text-h1">{title}</h2>
    </div>
  );
}
