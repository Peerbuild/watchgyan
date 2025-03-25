"use client";
import Logo from "@/components/Logo";
import Newsletter from "@/features/blog/components/Newsletter";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  return (
    <footer
      className={cn(
        "mx-auto space-y-28 border-t border-muted px-6 pb-28 pt-20 text-md text-foreground transition-colors duration-500 md:px-24 md:pb-11",
        path === "/" && "dark bg-background",
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-16 md:flex-row">
        <div className="space-y-5">
          <h3 className="text-caps3 uppercase text-muted-foreground">
            Community & Blog
          </h3>
          <ul className="space-y-1 text-body">
            <li>Latest Articles</li>
            <li>Watch Care Tips</li>
            <li>Featured Collections</li>
            <li>
              Discord{" "}
              <span className="text-sm text-muted-foreground">Coming Soon</span>
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-caps3 uppercase text-muted-foreground">
            Contact
          </h3>
          <ul className="space-y-1 text-body">
            <li>Email</li>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Facebook</li>
          </ul>
        </div>

        <Newsletter />
      </div>

      <div className="space-y-4 text-center">
        <Logo />
        <p className="text-sm text-muted-foreground">© Copyright 2025</p>
      </div>
    </footer>
  );
}
