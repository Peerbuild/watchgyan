"use client";
import React from "react";
import { buttonVariants } from "./ui/button";
import FeatherIcon from "feather-icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const path = usePathname();

  const pages = Math.ceil(totalItems / itemsPerPage);
  const hasMorePages = currentPage + 3 < pages;
  const lowerBound = hasMorePages
    ? Math.max(1, currentPage - 2)
    : Math.max(1, pages - 5);

  return (
    <div className="flex items-center justify-center gap-6 pt-12">
      <Link
        href={{
          pathname: path,
          query: { page: String(currentPage - 1) },
        }}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          currentPage === 1 && "pointer-events-none",
        )}
      >
        <FeatherIcon icon="chevron-left" />
      </Link>

      <div className="space-x-8">
        {[...Array(4)].map((_, index) => {
          return (
            <PaginatedItem
              key={index}
              currentPage={currentPage}
              page={lowerBound + index}
            />
          );
        })}
        {hasMorePages ? (
          <span>...</span>
        ) : (
          <PaginatedItem currentPage={currentPage} page={pages - 1} />
        )}
        <PaginatedItem currentPage={currentPage} page={pages} />
      </div>

      <Link
        href={{
          pathname: path,
          query: { page: String(currentPage + 1) },
        }}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          currentPage === pages && "pointer-events-none",
        )}
      >
        <FeatherIcon icon="chevron-right" />
      </Link>
    </div>
  );
}

interface PaginatedItemProps {
  page: number;
  currentPage: number;
}

function PaginatedItem({ page, currentPage }: PaginatedItemProps) {
  return (
    <Link
      href={{
        pathname: "/admin/blog",
        query: { page: String(page) },
      }}
    >
      <span
        className={cn(
          "text-muted-foreground",
          currentPage === page && "text-foreground",
        )}
      >
        {page}
      </span>
    </Link>
  );
}
