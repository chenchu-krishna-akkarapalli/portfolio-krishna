import Image from "next/image";

type BentoBaseItem = {
  badgeText: string;
  layout: "hero" | "wide" | "tall" | "square" | "small";
};

type BentoImageItem = BentoBaseItem & {
  type: "image";
  src: string;
};

type BentoVideoItem = BentoBaseItem & {
  type: "video";
  src: string;
};

export type BentoItem = BentoImageItem | BentoVideoItem;

type WorkBentoGridProps = {
  items: BentoItem[];
};

export default function WorkBentoGrid({ items }: WorkBentoGridProps) {
  return (
    <div className="grid w-full grid-cols-6 gap-[15px]">
      {items.map((item) => {
        const layout = getLayoutClasses(item.layout);

        return (
          <div
            key={`${item.src}:${item.badgeText}`}
            className={
              "relative overflow-hidden rounded-huge border border-border-strong bg-bg-primary " +
              layout.wrapper
            }
          >
            {item.type === "image" ? (
              <Image
                alt=""
                aria-hidden
                src={item.src}
                fill
                sizes={layout.sizes}
                unoptimized={item.src.endsWith(".svg")}
                className="object-cover"
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={item.src}
                controls
                playsInline
                preload="metadata"
              />
            )}

            <div className="absolute bottom-[18px] right-[24px]">
              <div className="backdrop-blur-[4px] bg-bg-nav-hover border border-border-light rounded-medium px-[18px] py-[12px]">
                <p className="text-[18px] font-semibold leading-[normal] text-white">
                  {item.badgeText}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getLayoutClasses(layout: BentoBaseItem["layout"]) {
  if (layout === "hero") {
    return {
      wrapper: "col-span-6 h-[306px]",
      sizes: "(max-width: 640px) 100vw, 580px",
    };
  }

  if (layout === "wide") {
    return {
      wrapper: "col-span-4 h-[196px]",
      sizes: "(max-width: 640px) 66vw, 380px",
    };
  }

  if (layout === "tall") {
    return {
      wrapper: "col-span-2 h-[408px]",
      sizes: "(max-width: 640px) 33vw, 182px",
    };
  }

  if (layout === "square") {
    return {
      wrapper: "col-span-3 h-[196px]",
      sizes: "(max-width: 640px) 50vw, 283px",
    };
  }

  return {
    wrapper: "col-span-2 h-[187px]",
    sizes: "(max-width: 640px) 33vw, 182px",
  };
}
