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
    <Carousel className="flex gap-20">
      <div className="flex flex-col justify-between">
        <h2 className="font-serif text-h2 text-foreground duration-500">
          Latest Global Stories
        </h2>
        <div className="space-x-4">
          <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-x-0 translate-y-0" />
        </div>
      </div>
      <CarouselContent className="w-full">
        {blogs.map((blog, index) => {
          return (
            <CarouselItem className="basis-1/3 pl-14" key={index}>
              <BlogCard blog={blog as unknown as Blog} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
