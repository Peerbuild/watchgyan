import Herosection from "@/features/blog/components/Herosection";
import Footer from "@/features/home/components/Footer";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <div className="theme-wrapper dark space-y-0 bg-background transition-colors duration-500 md:space-y-0">
      <Herosection />
      {/* <RecentBlogs /> */}
      {/* <TopArticles /> */}
      {/* <CuratedPicks /> */}
      {/* <ThemeSwitcherWrapper> */}
      {/* <LatestGlobalBlogs /> */}
      <Suspense>
        <Footer />
      </Suspense>
      {/* </ThemeSwitcherWrapper> */}
    </div>
  );
}
