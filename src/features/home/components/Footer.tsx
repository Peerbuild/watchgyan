"use client";
import Logo from "@/components/Logo";
import Newsletter from "@/features/blog/components/Newsletter";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    label: "Latest Articles",
    href: "/blog#recent",
  },
  {
    label: "Top Articles",
    href: "/blog#toparticles",
  },
  {
    label: "Curated Picks",
    href: "/blog#picks",
  },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:watchgyanhindi@outlook.com",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/watchgyanhindi",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@WatchgyanHindi",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Watchgyan-Hindi/100088400567003/",
  },
];

export default function Footer() {
  const path = usePathname();
  return (
    <footer
      className={cn(
        "relative z-20 mx-auto space-y-28 border-t border-muted px-6 pb-28 pt-20 text-md text-foreground transition-colors duration-500 md:px-24 md:pb-11",
        path === "/" && "dark bg-background",
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-16 md:flex-row">
        <div className="space-y-5">
          <h3 className="text-caps3 uppercase text-muted-foreground">
            Community & Blog
          </h3>
          <ul className="space-y-1 text-body">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
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
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
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
