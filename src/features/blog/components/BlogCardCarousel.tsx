import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";
import { Blog } from "@prisma/client";

interface BlogCardCarouselProps {
  blogs: Blog[];
}

export default function BlogCardCarousel({ blogs }: BlogCardCarouselProps) {
  return (
    <Carousel className="flex flex-col gap-20 md:flex-row">
      <div className="flex items-end justify-between md:flex-col md:items-start">
        <h2 className="max-w-40 font-serif text-h3 text-foreground duration-500 md:max-w-none md:text-h2">
          Latest Global Stories
        </h2>
        <div className="min-w-fit space-x-4 pr-8 md:pr-0">
          <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-x-0 translate-y-0" />
        </div>
      </div>
      <CarouselContent className="w-full">
        {blogs.map((blog, index) => {
          return (
            <CarouselItem className="md:pl-14 lg:basis-1/3" key={index}>
              <BlogCard blog={blog as unknown as Blog} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
