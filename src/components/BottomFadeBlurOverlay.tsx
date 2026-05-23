type BlurLayer = {
  zIndex: number;
  blurPx: number;
  mask: string;
};

const LAYERS: BlurLayer[] = [
  {
    zIndex: 1,
    blurPx: 0.109375,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)",
  },
  {
    zIndex: 2,
    blurPx: 0.21875,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)",
  },
  {
    zIndex: 3,
    blurPx: 0.4375,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)",
  },
  {
    zIndex: 4,
    blurPx: 0.875,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)",
  },
  {
    zIndex: 5,
    blurPx: 1.75,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)",
  },
  {
    zIndex: 6,
    blurPx: 3.5,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%)",
  },
  {
    zIndex: 7,
    blurPx: 7,
    mask:
      "linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%)",
  },
  {
    zIndex: 8,
    blurPx: 14,
    mask: "linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)",
  },
];

export default function BottomFadeBlurOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[330px]"
    >
      {LAYERS.map((layer) => (
        <div
          key={layer.zIndex}
          className="absolute inset-0"
          style={{
            zIndex: layer.zIndex,
            backdropFilter: `blur(${layer.blurPx}px)`,
            WebkitBackdropFilter: `blur(${layer.blurPx}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}
