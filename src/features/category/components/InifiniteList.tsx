"use client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";

interface InfiniteListProps<T> {
  queryKey: string[];
  queryFn: (context: { pageParam: number }) => Promise<{
    items: T[];
    totalItems: number;
  }>;
  renderItem: (item: T) => React.ReactNode;
}

export default function InifiniteList<T>({
  queryKey,
  queryFn,
  renderItem,
}: InfiniteListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return Math.floor(lastPage.totalItems / 10) > lastPageParam
          ? lastPageParam + 1
          : null;
      },
    });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: useCallback(() => parentRef.current!, []),
    estimateSize: useCallback(() => 30, []),
    overscan: 5,
    gap: 0,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = virtualizer.getVirtualItems().slice(-1);

    if (!lastItem) return;

    if (
      lastItem.index === items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    items.length,
    virtualItems,
  ]);

  return (
    <div ref={parentRef} className="h-60 overflow-auto">
      <div className="relative w-full">
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          if (!item) return null;
          return (
            <div
              key={virtualItem.index}
              className="absolute w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
