import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-serif text-[1.4rem] font-medium lg:text-[1.875rem]">
        WatchGyan
      </h1>
    </Link>
  );
}
