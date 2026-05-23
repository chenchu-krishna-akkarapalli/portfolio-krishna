"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Handle newsletter subscription logic here
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <p className="w-full max-w-[576px] text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary">
        I document my learnings once a month. I would love to share them with you over mail. No bulls**t. No spam. Straight up value.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-[12px]">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-[50px] w-full sm:flex-1 rounded-medium border border-border-strong bg-bg-primary px-[18px] text-[14px] sm:text-[15px] font-medium text-white placeholder-text-placeholder outline-none transition-[border-color] duration-300 focus:border-border-interactive"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex h-[50px] w-full sm:w-auto cursor-pointer items-center justify-center rounded-medium bg-white px-[28px] text-[14px] sm:text-[15px] font-bold text-black transition-opacity hover:opacity-90 focus:outline-none shrink-0"
        >
          Subscribe
        </motion.button>
      </form>
    </div>
  );
}
