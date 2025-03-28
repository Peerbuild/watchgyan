import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="space-x-2">
      <h1
        className={cn(
          "inline-block font-serif text-h3 font-medium text-foreground lg:text-[1.875rem]",
          className,
        )}
      >
        WatchGyan
      </h1>
    </Link>
  );
}
