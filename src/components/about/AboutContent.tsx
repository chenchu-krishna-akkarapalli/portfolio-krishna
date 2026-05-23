import ScrollReveal from "@/components/ScrollReveal";
import aboutData from "@/data/about.json";
import Image from "next/image";

type AboutData = typeof aboutData;

type BodyNode =
  | { type: "p"; text: string }
  | { type: "p"; segments: Array<{ text: string; bold?: boolean }> }
  | { type: "list"; title?: string; items: string[] };

export default function AboutContent() {
  const data: AboutData = aboutData;

  return (
    <div className="mx-auto flex w-full max-w-[586px] flex-col gap-[40px] sm:gap-[100px] pb-[40px] sm:pb-[100px] pt-[10px]">
      <section className="flex w-full flex-col gap-[24px]">
        <h1 className="text-[26px] sm:text-[40px] font-bold leading-[1.2] sm:leading-[normal] tracking-[0.5px] sm:tracking-[1.2px] text-white">
          {data.hero.heading}
        </h1>

        <div className="flex items-center gap-[6px] sm:gap-[8px]">
          <p className="text-[14px] sm:text-[20px] font-bold leading-[normal] tracking-[0.5px] sm:tracking-[0.8px] text-text-secondary">
            {data.hero.currentAt.label}
          </p>

          <Image
            alt=""
            aria-hidden
            src={data.hero.currentAt.logoSrc}
            width={20}
            height={20}
            className="size-[16px] sm:size-[20px] rounded-[4px] sm:rounded-[6px] border border-border-strong object-cover"
          />

          <p className="text-[14px] sm:text-[20px] font-bold leading-[normal] tracking-[0.5px] sm:tracking-[0.8px] text-text-secondary">
            {data.hero.currentAt.org}
          </p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-[15px]">
        <div className="relative aspect-[577/306] w-full overflow-hidden rounded-[18px] sm:rounded-huge">
          <Image
            alt=""
            src={data.collage.heroImage.src}
            width={data.collage.heroImage.width}
            height={data.collage.heroImage.height}
            className="h-full w-full object-cover"
            priority
          />

          <div className="absolute bottom-[18px] right-[24px]">
            <div className="backdrop-blur-[4px] bg-bg-nav-hover border border-border-light rounded-medium px-[18px] py-[12px]">
              <p className="text-[18px] font-semibold leading-[normal] text-white">
                {data.collage.heroImage.badgeText}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-[15px]">
          {data.collage.thumbnails.map((thumb) => (
            <div
              key={thumb.src}
              className="relative aspect-[182/187] flex-1 overflow-hidden rounded-[18px] sm:rounded-huge"
            >
              <Image
                alt=""
                src={thumb.src}
                width={thumb.width}
                height={thumb.height}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="flex w-full flex-col gap-[14px]">
          <h2 className="text-[24px] font-bold leading-[normal] text-white">
            {data.journeyIntro.title}
          </h2>
          <p className="text-[14px] font-medium leading-[normal] text-text-secondary">
            {data.journeyIntro.description}
          </p>
        </section>
      </ScrollReveal>

      {data.journeyBlocks.map((block) => (
        <ScrollReveal key={`${block.title}:${block.subtitle}`}>
          <JourneyBlock
            title={block.title}
            subtitle={block.subtitle}
            leftImageFile={block.leftImageFile}
            rightImageFile={block.rightImageFile}
            body={block.body as BodyNode[]}
          />
        </ScrollReveal>
      ))}

    </div>
  );
}

function JourneyBlock({
  title,
  subtitle,
  leftImageFile,
  rightImageFile,
  body,
}: {
  title: string;
  subtitle: string;
  leftImageFile: string;
  rightImageFile: string;
  body: BodyNode[];
}) {
  return (
    <section className="flex w-full flex-col gap-[16px]">
      <div className="flex w-full flex-col">
        <h3 className="text-[15px] sm:text-[16px] font-bold leading-[normal] text-white">{title}</h3>
        <p className="text-[13px] sm:text-[14px] font-medium leading-[normal] text-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="flex w-full items-center gap-[10px]">
        <div className="relative aspect-[283/196] flex-1 overflow-hidden rounded-[18px] sm:rounded-huge">
          <Image
            alt=""
            src={`/assets/figma/${leftImageFile}`}
            width={283}
            height={196}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative aspect-[283/196] flex-1 overflow-hidden rounded-[18px] sm:rounded-huge">
          <Image
            alt=""
            src={`/assets/figma/${rightImageFile}`}
            width={283}
            height={196}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px] text-[13px] sm:text-[14px] font-medium leading-relaxed text-text-secondary">
        {body.map((node, idx) => (
          <BodyNodeView key={idx} node={node} />
        ))}
      </div>
    </section>
  );
}

function BodyNodeView({ node }: { node: BodyNode }) {
  if (node.type === "p") {
    if ("segments" in node) {
      return (
        <p>
          {node.segments.map((seg, idx) =>
            seg.bold ? (
              <strong key={idx} className="font-bold">
                {seg.text}
              </strong>
            ) : (
              <span key={idx}>{seg.text}</span>
            ),
          )}
        </p>
      );
    }

    return <p>{node.text}</p>;
  }

  return (
    <div>
      {node.title ? (
        <p className="font-bold text-text-secondary">{node.title}</p>
      ) : null}
      <ul className="list-disc pl-[21px]">
        {node.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


