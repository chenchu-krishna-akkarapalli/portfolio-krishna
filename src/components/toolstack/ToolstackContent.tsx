import toolstackData from "@/data/toolstack.json";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type ToolstackData = typeof toolstackData;

type ToolStackItem = ToolstackData["toolStack"][number];

type OtherToolItem = ToolstackData["otherTools"]["items"][number];

export default function ToolstackContent() {
  const data: ToolstackData = toolstackData;

  const toolStackRows = data.toolStack.reduce<ToolStackItem[][]>((rows, item, idx) => {
    if (idx % 2 === 0) rows.push([]);
    rows[rows.length - 1].push(item);
    return rows;
  }, []);

  const otherToolsGridItems = buildOtherToolsGridItems(data.otherTools);

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col pb-[50px] pt-[35px]">
      <section className="flex w-full flex-col gap-[16px]">
        <p className="min-w-full text-[24px] font-bold leading-[normal] text-white">{data.title}</p>
        <p className="w-full max-w-[576px] whitespace-pre-line text-[14px] font-medium leading-[normal] text-[rgba(240,240,240,0.6)]">
          {data.description}
        </p>
      </section>

      <section className="mt-[32px] flex w-full flex-col">
        <div className="w-full px-[19px]">
          <p className="text-[24px] font-bold leading-[normal] text-white">{data.toolStackTitle}</p>

          <div className="mt-[24px] grid w-full max-w-full grid-cols-2 gap-x-[12px] gap-y-[12px]">
            {toolStackRows.flat().map((item) => (
              <ToolStackTile key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[29px] flex w-full flex-col">
        <div className="mx-auto w-full max-w-full px-[19px]">
          <p className="text-[16px] font-bold leading-[normal] text-white">{data.otherToolsTitle}</p>

          <div className="mt-[16px] grid grid-cols-6 sm:grid-cols-7 gap-[8px] sm:gap-x-[20px] sm:gap-y-[11px] justify-items-center">
            {otherToolsGridItems.map((item, idx) => (
              <OtherToolIcon
                key={`${item.label}-${idx}`}
                item={item}
                className={idx >= 36 ? "hidden sm:block" : ""}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolStackTile({ item }: { item: ToolStackItem }) {
  const [baseIcon, ...overlayIcons] = item.iconFiles;

  return (
    <div className="group relative h-[56px] sm:h-[71px] w-full overflow-hidden rounded-[12px] sm:rounded-[16px] border border-[rgba(232,232,232,0.5)] bg-black">
      <div className="absolute left-[10px] sm:left-[17px] top-[14px] sm:top-[21px] size-[28px] sm:size-[30px] overflow-hidden rounded-[30px] bg-white">
        <div className="relative size-full">
          <Image
            alt=""
            aria-hidden
            src={`/assets/tools-stack/${baseIcon}`}
            width={30}
            height={30}
            unoptimized={baseIcon.endsWith(".svg")}
            className="absolute inset-0 h-full w-full object-contain grayscale brightness-0"
          />
          {overlayIcons.map((icon) => (
            <Image
              key={icon}
              alt=""
              aria-hidden
              src={`/assets/tools-stack/${icon}`}
              width={30}
              height={30}
              unoptimized={icon.endsWith(".svg")}
              className="absolute inset-0 h-full w-full object-contain grayscale brightness-0"
            />
          ))}
        </div>
      </div>

      <p className="absolute left-[46px] sm:left-[67px] top-[19px] sm:top-[26px] text-[13px] sm:text-[16px] font-semibold leading-[normal] text-white truncate max-w-[calc(100%-54px)] sm:max-w-[calc(100%-100px)]">
        {item.label}
      </p>

      <span
        aria-hidden
        className="absolute right-[16px] top-[16px] hidden sm:flex size-[24px] items-center justify-center overflow-hidden rounded-[32px] border border-[rgba(240,240,240,0.4)] bg-[rgba(240,240,240,0.1)] opacity-0 translate-x-[-14px] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0"
      >
        <ArrowUpRight
          size={12}
          className="size-[12px] text-white transition-colors duration-300"
        />
      </span>
    </div>
  );
}

function OtherToolIcon({ item, className = "" }: { item: OtherToolItem; className?: string }) {
  return (
    <div className={`relative size-[40px] sm:size-[64px] overflow-hidden rounded-[64px] bg-transparent ${className}`}>
      <Image
        alt=""
        aria-hidden
        src={`/assets/tools-stack/${item.file}`}
        width={64}
        height={64}
        unoptimized={item.file.endsWith(".svg")}
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}

function buildOtherToolsGridItems(otherTools: ToolstackData["otherTools"]): OtherToolItem[] {
  const { rows, cols, items } = otherTools;
  if (items.length === 0) return [];

  const out: OtherToolItem[] = [];
  const total = rows * cols;

  for (let i = 0; i < total; i += 1) {
    out.push(items[i % items.length]);
  }

  return out;
}
