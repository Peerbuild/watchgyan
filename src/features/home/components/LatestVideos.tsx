import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Animate from '@/components/Animate';
import AnimatedButton from './AnimatedButton';

type Video = {
  video: {
    thumbnails: {
      height: number;
      url: string;
      width: number;
    }[];
  };
};

const getLatestVideos = async () => {
  const url =
    'https://youtube138.p.rapidapi.com/channel/videos/?id=UCPIQoK95A4-rkNIM3T6COQA&filter=videos_latest&hl=en&gl=US';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YOUTUBE_API_KEY!,
      'x-rapidapi-host': 'youtube138.p.rapidapi.com',
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
    return result.contents.slice(0, 6) as Video[];
  } catch (error) {
    console.log(error);
  }
};

export default async function LatestVideos() {
  const videos = await getLatestVideos();

  console.log(videos);

  return (
    <section className="mx-auto max-w-screen-xl px-6 text-center">
      <Animate className="space-y-12 lg:space-y-24" duration={0.2}>
        <SectionTitle
          title="Fresh watch reviews, trends, and insights"
          subtitle="Latest Drops"
        />
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">
          {videos?.map(({ video }, i) => {
            return (
              <div key={i}>
                <Image
                  className="w-full"
                  src={video.thumbnails[3].url}
                  alt="Video Thumbnail"
                  width={video.thumbnails[3].width}
                  height={video.thumbnails[3].height}
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
