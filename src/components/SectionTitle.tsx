import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[24px] font-bold leading-[normal] text-white">
      {children}
    </h2>
  );
}
