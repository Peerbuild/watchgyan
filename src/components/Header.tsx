"use client";
import { usePathname } from "next/navigation";
import FeatherIcon from "feather-icons-react";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import EditorHeader from "@/features/blog/components/Header";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getRecentBlogs } from "@/features/blog/interface/blog.controller";
import BlogCard from "@/features/blog/components/BlogCard";
import RotatingText from "./ui/animations/RotatingText/RotatingText";
import Image from "next/image";
import { Blog } from "@prisma/client";

const navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Youtube",
    link: "/#youtube",
  },
  {
    name: "Newsletter",
    link: "/#newsletter",
  },
  {
    name: "Blog",
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
            if (link.name === "Community") {
              return (
                <li key={link.name} className="w-32">
                  <span
                    className={cn(
                      "dark inline-block h-full cursor-pointer text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-primary",
                      isActive && "text-primary",
                    )}
                  >
                    <RotatingText texts={["Community", "Coming Soon"]} />
                  </span>
                </li>
              );
            }
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
        <a href={"mailto:watchgyanhindi@outlook.com"}>
          <Button
            className={path === "/blog" ? "hover:text-background" : ""}
            variant={"ghost"}
            size={"icon"}
          >
            <FeatherIcon icon="mail" />
          </Button>
        </a>
      </div>
      <div className="lg:hidden">
        <MobileNav
          links={[
            ...navlinks,
            {
              name: "Contact",
              link: "mailto:priyobrotokar@gmail.com",
            },
          ]}
          title="Recent Blogs"
          blogs={data?.blogs || []}
        />
      </div>
    </header>
  );
};

export const AdminHeader = () => {
  const path = usePathname();

  const links = [
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
    {
      name: "Go To Site",
      link: "/",
    },
  ];

  const { data } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      return getRecentBlogs({
        limit: 3,
      });
    },
  });

  const isEditorPage = path.startsWith("/admin/blog/write");

  if (isEditorPage) {
    return <EditorHeader />;
  }

  return (
    <div className="flex items-center justify-between p-8 md:hidden">
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
      <div className="lg:hidden">
        <MobileNav
          links={links}
          title="Your Recent Publishes"
          blogs={data?.blogs || []}
          cardSize="small"
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  links,
  cardSize = "medium",
  title,
  blogs,
}: {
  links: { name: string; link: string }[];
  cardSize?: "small" | "medium";
  title?: string;
  blogs: Blog[];
}) => {
  const path = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <FeatherIcon
            icon="menu"
            className={cn(
              "text-foreground transition-colors duration-500",
              path === "/blog" && "dark",
            )}
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
            {links.map((link) => {
              const isActive = path === link.link;
              if (link.name === "Community") {
                return (
                  <span key={link.name}>
                    <span
                      className={cn(
                        "inline-block h-full cursor-pointer text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-foreground",
                        isActive && "text-foreground",
                      )}
                    >
                      <RotatingText texts={["Community", "Coming Soon"]} />
                    </span>
                  </span>
                );
              }
              return (
                <li key={link.name}>
                  <Link
                    href={link.link}
                    className={cn(
                      "text-caps2 font-medium uppercase text-muted-foreground transition-colors hover:text-foreground",
                      isActive && "text-foreground",
                    )}
                  >
                    <DialogClose className="uppercase">{link.name}</DialogClose>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-1 flex-col justify-center gap-12">
          <h2 className="mx-auto max-w-48 text-center font-serif text-h3">
            {title}
          </h2>

          <div className="flex flex-col gap-6">
            {blogs.map((item) => (
              <BlogCard size={cardSize} key={item.id} blog={item} />
            ))}
          </div>
        </div>

        <div className="space-y-6 text-center">
          <Logo />
          <p className="text-md">© Copyright 2025 · All rights reserved</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
