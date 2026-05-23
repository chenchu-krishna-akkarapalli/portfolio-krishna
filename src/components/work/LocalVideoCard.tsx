"use client";

type LocalVideoCardProps = {
  src: string;
  title: string;
};

export default function LocalVideoCard({ src, title }: LocalVideoCardProps) {
  return (
    <section aria-label={title} className="flex flex-col gap-[12px]">
      <p className="text-[16px] font-bold leading-[normal] text-white">{title}</p>

      <div className="relative h-[330px] w-full overflow-hidden rounded-huge border border-border-strong bg-bg-primary">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
