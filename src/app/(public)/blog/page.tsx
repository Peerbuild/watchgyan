import Herosection from '@/features/blog/components/Herosection';
import Newsletter from '@/features/blog/components/Newsletter';
import RecentBlogs from '@/features/blog/components/RecentBlogs';
import TopArticles from '@/features/blog/components/TopArticles';

export default function BlogPage() {
  return (
    <div className="space-y-32">
      <Herosection />
      <RecentBlogs />
      <Newsletter />
      <TopArticles />
    </div>
  );
}
