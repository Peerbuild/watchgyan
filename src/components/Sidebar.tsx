"use client";

import Image from "next/image";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navlinks = [
  {
    name: "Glance",
    link: "/admin/glance",
  },
  {
    name: "Blogs",
    link: "/admin/blog",
  },
  {
    name: "Emails",
    link: "/admin/email",
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden space-y-24 self-stretch border-r px-12 py-20 lg:block">
      <div className="flex items-center gap-2">
        <div className="h-14 w-14 overflow-hidden rounded-full">
          <Image
            src={"/hero-bg.jpg"}
            alt="Profile Image"
            className="h-full w-full object-cover"
            width={52}
            height={52}
          />
        </div>
        <div>
          <Logo />
          <div className="text-caps3 uppercase text-primary">Online</div>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {navlinks.map((link) => {
            const isActive = path === link.link;
            return (
              <li
                key={link.name}
                className={cn(
                  "py-2 text-muted-foreground",
                  isActive && "text-foreground",
                )}
              >
                <Link href={link.link}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
