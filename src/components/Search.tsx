"use client";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import FeatherIcon from "feather-icons-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!debouncedSearch) {
      router.push(path);
      return;
    }

    const query = new URLSearchParams({
      q: debouncedSearch,
    });

    router.push(`${path}?${query}`, {
      scroll: false,
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="border-b-0 border-l px-4 py-2 text-sm"
      />
      <FeatherIcon icon="search" />
    </div>
  );
};
