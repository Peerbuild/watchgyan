import Herosection from '@/features/home/components/Herosection';
import LatestVideos from '@/features/home/components/LatestVideos';
import Newsletter from '@/features/home/components/Newsletter';
import RecentBlogs from '@/features/home/components/RecentBlogs';
import Testimonials from '@/features/home/components/Testimonial';

export default async function Home() {
  return (
    <div className="mb-20 space-y-80">
      <Herosection />
      <LatestVideos />
      <RecentBlogs />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
