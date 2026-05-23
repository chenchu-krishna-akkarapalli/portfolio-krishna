"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  className?: string;
  style?: React.CSSProperties;
  zoomContainerClassName?: string;
  modalVariant?: "default" | "fullWidthScroll";
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  unoptimized,
  className,
  style,
  zoomContainerClassName,
  modalVariant = "default",
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const imageProps = {
    src,
    priority,
    unoptimized,
    className,
    style,
  } as const;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        className={zoomContainerClassName ? zoomContainerClassName : "w-full"}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(true);
        }}
      >
        {fill ? (
          <Image {...imageProps} alt={alt} fill />
        ) : (
          <Image {...imageProps} alt={alt} width={width} height={height} />
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen ? (
          modalVariant === "fullWidthScroll" ? (
            <motion.div
              className="fixed inset-0 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                className="fixed inset-0 bg-[rgba(0,0,0,0.55)] backdrop-blur-lg"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              />

              <div className="relative min-h-full w-full py-10">
                <motion.div
                  layoutId={layoutId}
                  className="relative mx-auto w-full max-w-none"
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {typeof width === "number" && typeof height === "number" ? (
                      <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        sizes="100vw"
                        priority={priority}
                        unoptimized={unoptimized}
                        className="pointer-events-none select-none"
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      <div className="relative h-[80vh] w-full max-h-[80vh]">
                        <Image
                          src={src}
                          alt={alt}
                          fill
                          priority={priority}
                          unoptimized={unoptimized}
                          className="pointer-events-none select-none"
                          style={{ objectFit: "contain", objectPosition: "50% 50%" }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                className="absolute inset-0 bg-[rgba(0,0,0,0.55)] backdrop-blur-lg"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                layoutId={layoutId}
                className="relative w-full max-w-5xl"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[30px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-[80vh] w-full max-h-[80vh]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      priority={priority}
                      unoptimized={unoptimized}
                      className="pointer-events-none select-none"
                      style={{ objectFit: "contain", objectPosition: "50% 50%" }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </>
  );
}
