import Image from "next/image";
import SectionTitle from "./SectionTitle";
import Animate from "@/components/Animate";
import AnimatedButton from "./AnimatedButton";

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};

const getLatestVideos = async () => {
  const url =
    "https://youtube-v3-lite.p.rapidapi.com/search?channelId=UCPIQoK95A4-rkNIM3T6COQA&part=id%2Csnippet";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.YOUTUBE_API_KEY!,
      "x-rapidapi-host": "youtube-v3-lite.p.rapidapi.com",
    },
    next: {
      revalidate: 3 * 60 * 60,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.items.slice(0, 6) as Video[];
  } catch (error) {
    console.log(error);
  }
};

export default async function LatestVideos() {
  const videos = await getLatestVideos();

  return (
    <section className="relative px-6 text-center" id="youtube">
      <div>
        <Animate
          delay={1.5}
          hidden={{
            opacity: 0,
            rotate: 0,
            scale: 1,
            y: "-10%",
            x: "25%",
          }}
          visible={{
            opacity: 1,
            rotate: 120,
            scale: 1.3,
            y: "-10%",
            x: "25%",
          }}
          childrenClassName="absolute -z-10 -right-40 top-10 md:top-0 h-[10rem] w-[16rem] md:h-[36rem] mg:w-[28rem]  rounded-[50%] bg-primary/50 mg:bg-primary/35 blur-[60px] md:blur-[120px]"
        >
          <div></div>
        </Animate>
        <Animate
          delay={1.5}
          hidden={{
            opacity: 0,
            rotate: 0,
            scale: 1,
            y: "50%",
            x: "-25%",
          }}
          visible={{
            opacity: 1,
            rotate: 120,
            scale: 1.3,
            y: "50%",
            x: "-25%",
          }}
          childrenClassName="absolute -z-10 -left-40 bottom-0 h-[20rem] w-[16rem] lg:h-[30rem] lg:w-[24rem]   rounded-[50%] bg-primary/35 blur-[120px]"
        >
          <div></div>
        </Animate>
      </div>

      <Animate className="mx-auto max-w-screen-xl space-y-12 lg:space-y-24">
        <SectionTitle
          title="Fresh watch reviews, trends, and insights"
          subtitle="Latest Drops"
        />
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">
          {videos?.map(({ snippet, id }, i) => {
            return (
              <a
                key={i}
                href={`
              https://www.youtube.com/watch?v=${id.videoId}
`}
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={snippet.thumbnails.high.url}
                    alt="Video Thumbnail"
                    width={snippet.thumbnails.high.width}
                    height={snippet.thumbnails.high.height}
                  />
                </div>
              </a>
            );
          })}
        </div>
        <a href="https://www.youtube.com/@WatchgyanHindi" className="block">
          <AnimatedButton>Watch More On Youtube</AnimatedButton>
        </a>
      </Animate>
    </section>
  );
}
