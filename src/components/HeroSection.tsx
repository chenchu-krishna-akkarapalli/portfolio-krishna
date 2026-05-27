"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [day, setDay] = useState("day");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDay(days[new Date().getDay()]);
  }, []);

  return (
    <section className="flex w-full flex-col gap-[20px]">
      <div className="relative size-[80px] sm:size-[96px] overflow-hidden rounded-full border border-border-strong bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <Image
          alt="Krishna Avatar"
          src="/assets/profile/iam3.svg"
          width={96}
          height={96}
          className="size-full object-cover animate-hand-micro"
          priority
        />
      </div>

      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[20px] sm:text-[24px] font-bold leading-[normal] tracking-[0.56px] text-white">
          Hey , Krishna here!
        </h1>
        <p className="text-[14px] sm:text-[16px] font-bold leading-[normal] text-text-secondary">
          How's your {day} ?
        </p>
      </div>

      <p className="w-full max-w-[576px] text-[14px] sm:text-[16px] font-medium leading-[1.6] text-text-secondary">
        I’m your friendly neighborhood CAD wizard from the mystical land of Haridwar (yep, the place considered as a gateway to lord). With 5+ years of doodling… uh, I mean designing, I turn “wait, how?” ideas into “wow, that’s slick!” reality. Whether I’m jamming with a team of quirky geniuses or flying solo like a design ninja, I bring a mix of creativity, precision, and just enough magic to make projects shine.
      </p>

      <div className="mt-[8px] flex">
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Link
            href="/contact"
            className="
              inline-flex items-center justify-center
              px-[28px] sm:px-[36px] py-[10px] sm:py-[12px]
              rounded-medium
              text-[14px] sm:text-[16px] font-bold text-white
              bg-gradient-to-b from-bg-secondary to-bg-primary
              border border-border-light
              shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]
              transition-all duration-300
              hover:border-border-card-hover
              hover:shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]
            "
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
