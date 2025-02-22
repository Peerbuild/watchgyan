import Footer from '@/features/home/components/Footer';
import Herosection from '@/features/home/components/Herosection';
import LatestVideos from '@/features/home/components/LatestVideos';
import Newsletter from '@/features/home/components/Newsletter';
import RecentBlogs from '@/features/home/components/RecentBlogs';
import Testimonials from '@/features/home/components/Testimonial';
import ThemeSwitcherWrapper from '@/features/home/components/ThemeSwitcherWrapper';

export default async function Home() {
  return (
    <div className="mb-20 space-y-44 lg:space-y-80">
      <Herosection />
      <LatestVideos />
      <ThemeSwitcherWrapper className="space-y-28 lg:space-y-80">
        <RecentBlogs />
        <Newsletter />
      </ThemeSwitcherWrapper>
      <Testimonials />
      <Footer />
    </div>
  );
}
