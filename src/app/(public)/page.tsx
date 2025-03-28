import Animate from "@/components/Animate";
import Footer from "@/features/home/components/Footer";
import Herosection from "@/features/home/components/Herosection";
import LatestVideos from "@/features/home/components/LatestVideos";
import Newsletter from "@/features/home/components/Newsletter";
import RecentBlogs from "@/features/home/components/RecentBlogs";
import Testimonials from "@/features/home/components/Testimonial";
import ThemeSwitcherWrapper from "@/features/home/components/ThemeSwitcherWrapper";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div
      id="home"
      className="theme-wrapper relative space-y-44 overflow-hidden bg-background transition-colors duration-500 lg:space-y-80"
    >
      <Herosection />
      <LatestVideos />
      <ThemeSwitcherWrapper className="space-y-28 lg:space-y-80">
        <RecentBlogs />
        <Newsletter />
      </ThemeSwitcherWrapper>

      <div className="absolute h-svh w-full -translate-y-0 md:translate-y-1/4">
        <Animate
          once={false}
          delay={0.7}
          hidden={{
            opacity: 0,
            rotate: 0,
            scale: 1,
            y: "-150%",
            x: "25%",
          }}
          visible={{
            opacity: 1,
            rotate: 120,
            scale: 1.3,
            y: "-150%",
            x: "25%",
          }}
          childrenClassName="absolute -z-10 -right-40 bottom-60 md:bottom-0 h-[16rem] w-[16rem] md:h-[36rem] mg:w-[28rem]   rounded-[50%] bg-primary/50 md:bg-primary/35 blur-[100px] md:blur-[120px]"
        >
          <div></div>
        </Animate>
        <Animate
          once={false}
          delay={0.7}
          hidden={{
            opacity: 0,
            rotate: 0,
            y: "-25%",
            x: "-25%",
          }}
          visible={{
            opacity: 1,
            rotate: 120,
            y: "-25%",
            x: "-25%",
          }}
          childrenClassName="absolute -z-10 -left-40 bottom-4 md:bottom-0 h-[10rem] w-[16rem] md:h-[36rem] mg:w-[28rem]   rounded-[50%] bg-primary/50 md:bg-primary/35 blur-[60px] md:blur-[120px]"
        >
          <div></div>
        </Animate>
      </div>

      <Testimonials />
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
