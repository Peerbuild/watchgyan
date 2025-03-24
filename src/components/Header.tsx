"use client";
import { usePathname } from "next/navigation";
import FeatherIcon from "feather-icons-react";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import EditorHeader from "@/features/blog/components/Header";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getRecentBlogs } from "@/features/blog/interface/blog.controller";
import BlogCard from "@/features/blog/components/BlogCard";

const navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Youtube",
    link: "#journey",
  },
  {
    name: "Newsletter",
    link: "#newsletter",
  },
  {
    name: "blog",
    link: "/blog",
  },
  {
    name: "Community",
    link: "/community",
  },
];

export const PublicHeader = () => {
  const path = usePathname();
  const { data } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      return getRecentBlogs({
        limit: 3,
      });
    },
  });

  return (
    <header
      className={
        "absolute top-0 z-50 flex w-full items-center justify-between px-6 py-8 transition-all duration-500 lg:px-12 lg:py-10"
      }
    >
      <Logo className={path === "/blog" ? "dark" : ""} />
      <nav className="hidden lg:block">
        <ul className="flex gap-8">
          {navlinks.map((link) => {
            const isActive = path === link.link;
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  className={cn(
                    "dark text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden items-center gap-10 text-muted-foreground lg:flex">
        <Button variant={"ghost"} size={"icon"}>
          <FeatherIcon icon="mail" />
        </Button>
      </div>
      <div className="lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <FeatherIcon
                icon="menu"
                className="text-foreground transition-colors duration-500"
              />
            </Button>
          </DialogTrigger>
          <DialogContent
            closeClassName="top-8 right-6"
            className="flex min-h-svh max-w-full flex-col gap-12 px-6 py-8 !duration-500 !will-change-transform animate-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-100 data-[state=open]:fade-in-100 data-[state=closed]:!zoom-out-100 data-[state=open]:!zoom-in-100 data-[state=closed]:slide-out-to-right-full data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-right-full data-[state=open]:slide-in-from-top-[50%]"
          >
            <DialogTitle>
              <Logo />
            </DialogTitle>

            <nav>
              <ul className="flex flex-wrap gap-4">
                {[...navlinks, { name: "Contact", link: "#contact" }].map(
                  (link) => {
                    const isActive = path === link.link;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.link}
                          className={cn(
                            "text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-foreground",
                            isActive && "text-foreground",
                          )}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  },
                )}
              </ul>
            </nav>

            <div className="flex flex-1 flex-col justify-center gap-12">
              <h2 className="mx-auto max-w-48 text-center font-serif text-h3">
                Global Stories At Fingertips
              </h2>

              <div className="flex flex-col gap-6">
                {data?.blogs.map((item) => (
                  <BlogCard size="small" key={item.id} blog={item} />
                ))}
              </div>
            </div>

            <div className="space-y-6 text-center">
              <Logo />
              <p className="text-md">© Copyright 2025 · All rights reserved</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export const AdminHeader = () => {
  const path = usePathname();

  const isEditorPage = path.startsWith("/admin/blog/write");

  if (isEditorPage) {
    return <EditorHeader />;
  }

  return <div className="md:hidden">Header</div>;
};
