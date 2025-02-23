import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Animate from '@/components/Animate';
import AnimatedButton from './AnimatedButton';

type Video = {
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
    'https://youtube-v3-lite.p.rapidapi.com/search?channelId=UCPIQoK95A4-rkNIM3T6COQA&part=id%2Csnippet';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YOUTUBE_API_KEY!,
      'x-rapidapi-host': 'youtube-v3-lite.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log(response.ok);
    console.log(result);
    return result.items.slice(0, 6) as Video[];
  } catch (error) {
    console.log(error);
  }
};

export default async function LatestVideos() {
  const videos = await getLatestVideos();

  console.log(videos);

  return (
    <section className="mx-auto max-w-screen-xl px-6 text-center">
      <Animate className="space-y-12 lg:space-y-24">
        <SectionTitle
          title="Fresh watch reviews, trends, and insights"
          subtitle="Latest Drops"
        />
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">
          {videos?.map(({ snippet }, i) => {
            return (
              <div key={i} className="aspect-video overflow-hidden">
                <Image
                  className="h-full w-full object-cover"
                  src={snippet.thumbnails.high.url}
                  alt="Video Thumbnail"
                  width={snippet.thumbnails.high.width}
                  height={snippet.thumbnails.high.height}
                />
              </div>
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
