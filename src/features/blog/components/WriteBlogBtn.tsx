"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function WriteBlogBtn() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window) {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return (
    <div>
      <Link
        href={"/admin/blog/write"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-14 w-full shadow-md",
          isMobile && "pointer-events-none opacity-80",
        )}
      >
        <FeatherIcon icon="plus" />
        Write a new blog
      </Link>
    </div>
  );
}
