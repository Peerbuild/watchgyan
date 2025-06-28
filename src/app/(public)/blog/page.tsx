import AllBlogsGrid from "@/features/blog/components/AllBlogsGrid";
import CuratedPicks from "@/features/blog/components/CuratedPicks";
import Herosection from "@/features/blog/components/Herosection";
import LatestGlobalBlogs from "@/features/blog/components/LatestGlobalBlogs";
import RecentBlogs from "@/features/blog/components/RecentBlogs";
import Footer from "@/features/home/components/Footer";
import ThemeSwitcherWrapper from "@/features/home/components/ThemeSwitcherWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Explore expert watch reviews, guides, and insights on WatchGyan. Stay updated with the latest trends and curated picks in horology.",
};

export default function BlogPage() {
  return (
    <div className="theme-wrapper dark space-y-20 bg-background transition-colors duration-500 md:space-y-32">
      <Herosection />
      <RecentBlogs />
      <CuratedPicks />
      <ThemeSwitcherWrapper>
        <LatestGlobalBlogs />
      </ThemeSwitcherWrapper>
      <AllBlogsGrid />
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
