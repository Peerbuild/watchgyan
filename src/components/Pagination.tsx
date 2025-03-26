"use client";
import React from "react";
import { buttonVariants } from "./ui/button";
import FeatherIcon from "feather-icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const MAX_VISIBLE_PAGES = 4;
const MIN_PAGE_DISPLAY = 6;
const PAGE_OFFSET = 2;

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lowerBound = Math.max(
    1,
    Math.min(currentPage - PAGE_OFFSET, totalPages - (MAX_VISIBLE_PAGES + 1)),
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 pt-12 md:gap-6">
      <PreviousButton currentPage={currentPage} pages={totalPages} />

      <div className="space-x-6 md:space-x-8">
        {[...Array(Math.min(totalPages, MAX_VISIBLE_PAGES))].map((_, index) => {
          return (
            <PaginatedItem
              key={index}
              currentPage={currentPage}
              page={lowerBound + index}
            />
          );
        })}

        {totalPages > MIN_PAGE_DISPLAY - 1 && (
          <PaginationEllipsis currentPage={currentPage} pages={totalPages} />
        )}
        {totalPages > MAX_VISIBLE_PAGES && (
          <PaginatedItem currentPage={currentPage} page={totalPages} />
        )}
      </div>

      <NextButton currentPage={currentPage} pages={totalPages} />
    </div>
  );
}

interface PaginatedItemProps {
  page: number;
  currentPage: number;
}

function PaginatedItem({ page, currentPage }: PaginatedItemProps) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  return (
    <Link
      href={{
        pathname: path,
        query: { ...queryParams, page: String(page) },
      }}
    >
      <span
        className={cn(
          "text-md text-muted-foreground md:text-body",
          currentPage === page && "text-foreground",
        )}
      >
        {page}
      </span>
    </Link>
  );
}

interface PaginationEllipsisProps {
  currentPage: number;
  pages: number;
}

function PaginationEllipsis({ currentPage, pages }: PaginationEllipsisProps) {
  const hasMorePages =
    currentPage + (PAGE_OFFSET + 1) < pages && pages > MIN_PAGE_DISPLAY;

  if (!hasMorePages) {
    return <PaginatedItem currentPage={currentPage} page={pages - 1} />;
  }

  return <span className="text-muted-foreground">...</span>;
}

interface PaginationButtonProps {
  currentPage: number;
  pages: number;
}

function NextButton({ currentPage, pages }: PaginationButtonProps) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  return (
    <Link
      href={{
        pathname: path,
        query: { ...queryParams, page: String(currentPage + 1) },
      }}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        currentPage === pages && "pointer-events-none",
      )}
    >
      <FeatherIcon icon="chevron-right" />
    </Link>
  );
}

function PreviousButton({ currentPage }: PaginationButtonProps) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  return (
    <Link
      href={{
        pathname: path,
        query: { ...queryParams, page: String(currentPage - 1) },
      }}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        currentPage === 1 && "pointer-events-none",
      )}
    >
      <FeatherIcon icon="chevron-left" />
    </Link>
  );
}
