interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-[37.8rem] space-y-4 text-center">
      <p className="text-caps1 uppercase text-primary">{subtitle}</p>
      <h2 className="text-h3 font-serif lg:text-h1">{title}</h2>
    </div>
  );
}
