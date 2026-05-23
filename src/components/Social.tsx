"use client";

import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    name: "Harsha.V",
    avatar: "/assets/profile/iam3.png",
  },
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Harsha.V",
    avatar: "/assets/profile/iam3.png",
  },
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    name: "Harsha.V",
    avatar: "/assets/profile/iam3.png",
  },
];

export default function Social() {
  return (
    <div className="relative w-full overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
      
      <div className="scrollbar-none flex w-full gap-[16px] overflow-x-auto snap-x snap-mandatory py-[8px]">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex w-[280px] min-w-[280px] max-w-full sm:w-[282px] sm:min-w-[282px] snap-start flex-col justify-between rounded-huge border border-border-card bg-bg-card p-[24px] transition-colors duration-300 hover:border-border-card-hover"
          >
            <p className="text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary line-clamp-4 sm:line-clamp-5 overflow-hidden text-ellipsis">
              {t.quote}
            </p>
            
            <div className="mt-[20px] flex items-center gap-[12px]">
              <div className="relative size-[36px] shrink-0 overflow-hidden rounded-full border border-border-strong bg-white">
                <Image
                  alt={t.name}
                  src={t.avatar}
                  width={36}
                  height={36}
                  className="size-full object-cover"
                />
              </div>
              
              <span className="text-[14px] sm:text-[15px] font-bold leading-[normal] text-white truncate max-w-[calc(100%-48px)]">
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
