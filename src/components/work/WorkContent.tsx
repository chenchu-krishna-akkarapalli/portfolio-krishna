import ScrollReveal from "@/components/ScrollReveal";
import workData from "@/data/work.json";
import VimeoPlayerCard from "@/components/work/VimeoPlayerCard";
import LocalVideoCard from "@/components/work/LocalVideoCard";
import WorkBentoGrid, { BentoItem } from "@/components/work/WorkBentoGrid";

type WorkData = typeof workData;

export default function WorkContent() {
  const data: WorkData = workData;

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col gap-[40px] pb-[80px] pt-[10px]">
      <section className="flex w-full flex-col gap-[16px]">
        <h1 className="text-[26px] sm:text-[40px] font-bold leading-[1.2] sm:leading-[normal] tracking-[0.5px] sm:tracking-[1.2px] text-white">
          {data.title}
        </h1>
        <p className="w-full max-w-[576px] whitespace-pre-line text-[14px] font-medium leading-[normal] text-text-secondary">
          {data.description}
        </p>
      </section>

      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]" aria-label={data.videosTitle}>
          <p className="text-[24px] font-bold leading-[normal] text-white">{data.videosTitle}</p>
          <div className="flex flex-col gap-[24px]">
            {data.videos.map((video: any) => {
              if ("vimeoId" in video) {
                return (
                  <VimeoPlayerCard
                    key={`vimeo:${video.vimeoId}`}
                    vimeoId={video.vimeoId}
                    title={video.title}
                  />
                );
              }

              return (
                <LocalVideoCard
                  key={`file:${video.src}`}
                  src={video.src}
                  title={video.title}
                />
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]" aria-label={data.galleryTitle}>
          <p className="text-[24px] font-bold leading-[normal] text-white">{data.galleryTitle}</p>
          <WorkBentoGrid items={data.bento as BentoItem[]} />
        </section>
      </ScrollReveal>
    </div>
  );
}
