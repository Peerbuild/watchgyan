import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { Button } from '@/components/ui/button';

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
    return result.contents.slice(0, 9) as Video[];
  } catch (error) {
    console.log(error);
  }
};

export default async function LatestVideos() {
  const videos = await getLatestVideos();

  console.log(videos);

  return (
    <section className="mx-auto max-w-screen-lg space-y-24 text-center">
      <SectionTitle
        title="Fresh watch reviews, trends, and insights"
        subtitle="Latest Drops"
      />
      <div className="grid grid-cols-3 gap-2">
        {videos?.map(({ video }, i) => {
          return (
            <div key={i}>
              <Image
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
        <Button variant={'outline'}>Watch More On Youtube</Button>
      </a>
    </section>
  );
}
