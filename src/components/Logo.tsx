import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="space-x-2">
      <h1 className="inline-block font-serif text-h3 font-medium text-foreground transition-colors duration-500 lg:text-[1.875rem]">
        WatchGyan
      </h1>
      <span className="text-caps3 uppercase">Hindi</span>
    </Link>
  );
}
