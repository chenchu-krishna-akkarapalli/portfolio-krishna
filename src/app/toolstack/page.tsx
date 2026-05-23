import ToolStackCards, { type ToolStackCardItem } from "@/components/ToolStackCards";
import toolstackData from "@/data/toolstack.json";
import Image from "next/image";

type ToolstackData = typeof toolstackData;

type OtherToolItem = { file: string; label: string };

const SECONDARY_TOOL_FILES = [
  "adobe.svg",
  "adobe_creative-cloud.svg",
  "adobe_illustrator.svg",
  "angular.svg",
  "autodesk.svg",
  "behance.svg",
  "docker.svg",
  "figma.svg",
  "filezilla-plain.svg",
  "git-copilot.svg",
  "git.svg",
  "html_5.svg",
  "js.svg",
  "mongodb-plain-wordmark.svg",
  "ms_excel.svg",
  "ms_word.svg",
  "mysql-plain-wordmark.svg",
  "nextjs.svg",
  "node_js.svg",
  "notion.svg",
  "npm.svg",
  "python.svg",
  "react.svg",
  "redux.svg",
  "shopify.svg",
  "sqlite-original.svg",
  "teams.svg",
  "viber.svg",
  "vs_code.svg",
  "vue.svg",
] as const;

export default function ToolstackPage() {
  const toolStackRows = toolstackData.toolStack.reduce<ToolStackCardItem[][]>((rows, item, idx) => {
    if (idx % 2 === 0) rows.push([]);
    rows[rows.length - 1].push({
      label: item.label,
      icon: mapToolStackIcons(item.iconFiles, item.label),
      href: item.href,
    });
    return rows;
  }, []);

  const otherToolsGridItems = buildOtherToolsGridItems(toolstackData.otherTools, toolStackRows);

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col pb-[50px] pt-[10px]">
      <section className="flex w-full flex-col gap-[16px]">
        <p className="min-w-full text-[24px] font-bold leading-[normal] text-white">{toolstackData.title}</p>
        <p className="w-full max-w-[576px] whitespace-pre-line text-[14px] font-medium leading-[normal] text-text-secondary">
          {toolstackData.description}
        </p>
      </section>

      <section className="mt-[32px] flex w-full flex-col">
        <div className="w-full px-[19px]">
          <p className="text-[24px] font-bold leading-[normal] text-white">{toolstackData.toolStackTitle}</p>
          <div className="mt-[24px]">
            <ToolStackCards
              rows={toolStackRows}
              iconBasePath="/assets/tools-stack"
              forceMonochromeIcons
            />
          </div>
        </div>
      </section>

      <section className="mt-[29px] flex w-full flex-col">
        <div className="w-full px-[19px] sm:px-0">
          <p className="text-[16px] font-bold leading-[normal] text-white">{toolstackData.otherToolsTitle}</p>

          <div className="mt-[16px] grid grid-cols-4 sm:grid-cols-7 gap-[12px] sm:gap-x-[20px] sm:gap-y-[11px] justify-items-center">
            {otherToolsGridItems.map((item, idx) => (
              <OtherToolIcon key={`${item.file}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function OtherToolIcon({ item }: { item: OtherToolItem }) {
  return (
    <div className="group relative size-[56px] sm:size-[64px]">
      <div className="relative size-[56px] sm:size-[64px] overflow-hidden rounded-[64px] bg-transparent">
        <Image
          alt={item.label}
          src={`/assets/tools-stack/secondary/${item.file}`}
          width={64}
          height={64}
          unoptimized={item.file.endsWith(".svg")}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-[12px] -translate-x-1/2 whitespace-nowrap rounded-[16px] border border-border-light bg-bg-primary px-[18px] py-[12px] text-[16px] font-medium leading-none text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
      >
        {item.label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[8px] border-transparent border-t-bg-primary" />
      </div>
    </div>
  );
}

function buildOtherToolsGridItems(
  otherTools: ToolstackData["otherTools"],
  toolStackRows: ToolStackCardItem[][],
): OtherToolItem[] {
  const { rows, cols } = otherTools;

  const pinned = (otherTools.items ?? [])
    .filter((item): item is { label: string; file: string } =>
      Boolean(item && typeof item === "object" && "file" in item && "label" in item),
    )
    .map(({ file, label }) => ({ file: file.trim(), label: label.trim() }))
    .filter(
      ({ file }) =>
        SECONDARY_TOOL_FILES.includes(file.toLowerCase() as (typeof SECONDARY_TOOL_FILES)[number]),
    );

  const usedSecondaryFiles = new Set<string>(
    toolStackRows.flat().flatMap(({ icon }) =>
      icon
        .map((file) => normalizeSecondaryFile(file))
        .filter((file): file is (typeof SECONDARY_TOOL_FILES)[number] =>
          SECONDARY_TOOL_FILES.includes(file as (typeof SECONDARY_TOOL_FILES)[number]),
        ),
    ),
  );

  for (const item of pinned) usedSecondaryFiles.add(item.file.toLowerCase());

  const remaining = SECONDARY_TOOL_FILES.filter((file) => !usedSecondaryFiles.has(file));
  if (pinned.length === 0 && remaining.length === 0) return [];

  const out: OtherToolItem[] = [];
  const total = rows * cols;

  // Seed the grid with pinned items (from JSON), then fill with the remaining
  // icons from `public/assets/tools-stack/secondary`.
  for (const item of pinned) out.push(item);

  for (let i = out.length; i < total; i += 1) {
    const file = remaining.length > 0 ? remaining[i % remaining.length] : pinned[i % pinned.length].file;
    out.push({ file, label: inferToolLabel(file) });
  }

  return out;
}

function inferToolLabel(file: string): string {
  const base = file.replace(/\.[^.]+$/, "");
  const words = base
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/g)
    .filter(Boolean);

  const upper = new Set(["js", "html", "vs", "ms", "sql"]);
  const lower = new Set(["npm"]);

  return words
    .map((word) => {
      const w = word.toLowerCase();
      if (upper.has(w)) return w.toUpperCase();
      if (lower.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function mapToolStackIcons(iconFiles: string[], label: string): string[] {
  // We keep ToolStackCards' base path as `/assets/tools-stack` and prefix file names when
  // an icon is sourced from a subfolder.
  return iconFiles.map((file) => {
    const normalized = file.trim().toLowerCase();
    const normalizedLabel = label.trim().toLowerCase();

    if (normalizedLabel === "docker" && normalized === "dockers.svg") {
      return "secondary/docker.svg";
    }

    if (normalizedLabel === "canva" && normalized === "canva.svg") {
      return "Primary/canva-original.svg";
    }

    if (SECONDARY_TOOL_FILES.includes(normalized as (typeof SECONDARY_TOOL_FILES)[number])) {
      return `secondary/${file}`;
    }

    return file;
  });
}

function normalizeSecondaryFile(file: string): string {
  return file.replace(/^secondary\//, "");
}
