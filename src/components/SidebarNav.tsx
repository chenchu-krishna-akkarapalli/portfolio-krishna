"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarNavItem = {
  label: string;
  href: string;
  iconFile: string;
};

const navItems: SidebarNavItem[] = [
  { label: "Home", href: "/#home", iconFile: "eb3a8c5cae712595ee160daa86c7c2d47fefabc8.svg" },
  { label: "About", href: "/about", iconFile: "7ac09c0bcf3893e8292b4dbd5348d100ba2f62c2.svg" },
  { label: "Projects", href: "/projects", iconFile: "3e4583eb7ac4989186f567270a75bd97da1340c0.svg" },
  { label: "Toolstack", href: "/toolstack", iconFile: "5ee299997f404a40451a685be45861b507cda3e2.svg" },
  { label: "Blogs", href: "/blog", iconFile: "05deb563f01b2097235274500cd846ebc8b38a79.svg" },
  { label: "Work", href: "/work", iconFile: "74b4aec9453e795a62eae92dfac909899d1eece2.svg" },
  { label: "Songs", href: "/songs", iconFile: "0427cf770907e2c3e49bc9fdda1195511d722884.svg" },
  { label: "Playground", href: "/playground", iconFile: "ccef4dcad82e2727c92f8f3ab5288cf6eb03c9eb.svg" },
  { label: "Contact", href: "/contact", iconFile: "e288944b3c289d9d6bdf876829b563c617ec4bd1.svg" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/#home");
  const collapsedVisibleCount = 5;
  const collapsedItems = navItems.slice(0, collapsedVisibleCount);
  const hiddenCount = Math.max(0, navItems.length - collapsedVisibleCount);
  const placeholdersBetween = Math.min(hiddenCount, Math.max(0, collapsedItems.length - 1));
  const collapsedSpacerHeight = 16;

  useEffect(() => {
    const updateFromLocation = () => {
      if (window.location.pathname === "/about") {
        setActiveHref("/about");
        return;
      }

      if (window.location.pathname === "/toolstack") {
        setActiveHref("/toolstack");
        return;
      }

      if (window.location.pathname === "/blog") {
        setActiveHref("/blog");
        return;
      }

      if (window.location.pathname === "/playground") {
        setActiveHref("/playground");
        return;
      }

      if (window.location.pathname === "/songs") {
        setActiveHref("/songs");
        return;
      }

      if (window.location.pathname === "/contact") {
        setActiveHref("/contact");
        return;
      }

      if (window.location.pathname === "/projects" || window.location.pathname.startsWith("/projects/")) {
        setActiveHref("/projects");
        return;
      }

      if (window.location.pathname === "/work") {
        setActiveHref("/work");
        return;
      }

      const hash = window.location.hash || "#home";
      setActiveHref(`/${hash}`);
    };

    updateFromLocation();
    window.addEventListener("hashchange", updateFromLocation);
    window.addEventListener("popstate", updateFromLocation);
    return () => {
      window.removeEventListener("hashchange", updateFromLocation);
      window.removeEventListener("popstate", updateFromLocation);
    };
  }, [pathname]);

  const mobileNavItems = [
    { label: "Home", href: "/#home", iconFile: "eb3a8c5cae712595ee160daa86c7c2d47fefabc8.svg" },
    { label: "About", href: "/about", iconFile: "7ac09c0bcf3893e8292b4dbd5348d100ba2f62c2.svg" },
    { label: "Projects", href: "/projects", iconFile: "3e4583eb7ac4989186f567270a75bd97da1340c0.svg" },
    { label: "Toolstack", href: "/toolstack", iconFile: "5ee299997f404a40451a685be45861b507cda3e2.svg" },
    { label: "Contact", href: "/contact", iconFile: "e288944b3c289d9d6bdf876829b563c617ec4bd1.svg" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="group shrink-0 hidden lg:block">
        <div
          className="
            flex flex-col
            overflow-hidden
            rounded-large
            bg-bg-secondary
            shadow-[0px_10px_20px_rgba(0,0,0,0.05)]
            px-[10px] py-[12px]
            transition-[width,padding] duration-300 ease-out
            w-[72px] group-hover:w-[260px]
            group-hover:px-[16px] group-hover:py-[16px]
          "
          style={{ transformOrigin: "50% 0% 0px" }}
        >
          <nav aria-label="Primary">
            {/* Collapsed (before hover): 5 icons with hidden-row height inserted as spacing between them */}
            <div className="flex flex-col justify-center gap-[6px] group-hover:hidden">
              {collapsedItems.map((item, idx) => {
                const isActive = activeHref === item.href;

                return (
                  <div key={item.label} className="contents">
                    <Link
                      href={item.href}
                      onClick={() => setActiveHref(item.href)}
                      className={
                        "flex h-[40px] items-center justify-center rounded-small px-0 text-[14px] font-medium transition-colors duration-200 focus:outline-none focus-visible:outline-none " +
                        (isActive
                          ? "bg-bg-nav-active text-white"
                          : "text-text-tertiary hover:bg-bg-nav-hover hover:text-white")
                      }
                    >
                      <Image
                        alt=""
                        aria-hidden
                        src={`/assets/figma/${item.iconFile}`}
                        width={20}
                        height={20}
                        className={
                          "shrink-0 transition-opacity duration-200 " +
                          (isActive ? "opacity-100" : "opacity-50")
                        }
                      />
                    </Link>

                    {idx < placeholdersBetween ? (
                      <div aria-hidden="true" style={{ height: collapsedSpacerHeight }} />
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Expanded (on hover): full list */}
            <div className="hidden flex-col justify-start gap-[6px] group-hover:flex">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveHref(item.href)}
                    className={
                      "flex h-[40px] items-center justify-start gap-[12px] rounded-small px-[14px] text-[14px] font-medium transition-colors duration-200 focus:outline-none focus-visible:outline-none " +
                      (isActive
                        ? "bg-bg-nav-active text-white"
                        : "text-text-tertiary hover:bg-bg-nav-hover hover:text-white")
                    }
                  >
                    <Image
                      alt=""
                      aria-hidden
                      src={`/assets/figma/${item.iconFile}`}
                      width={20}
                      height={20}
                      className={
                        "shrink-0 transition-opacity duration-200 " +
                        (isActive ? "opacity-100" : "opacity-50")
                      }
                    />

                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Floating Bottom Navigation */}
      <nav aria-label="Mobile Primary" className="block lg:hidden shrink-0">
        <div className="flex flex-row items-center justify-center rounded-full border border-border-light bg-bg-secondary/70 backdrop-blur-md px-[12px] py-[8px] gap-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {mobileNavItems.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                className={
                  "flex h-[40px] w-[50px] items-center justify-center rounded-full transition-colors duration-200 focus:outline-none " +
                  (isActive
                    ? "bg-bg-nav-active text-white"
                    : "text-text-tertiary hover:bg-bg-nav-hover hover:text-white")
                }
                aria-label={item.label}
              >
                <Image
                  alt=""
                  aria-hidden
                  src={`/assets/figma/${item.iconFile}`}
                  width={20}
                  height={20}
                  className={
                    "shrink-0 transition-opacity duration-200 " +
                    (isActive ? "opacity-100" : "opacity-50")
                  }
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
