"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import blogsData from "@/data/blogs.json";
import BlogCards from "@/components/blog/BlogCards";

type BlogsData = typeof blogsData;

export default function BlogContent() {
  const data: BlogsData = blogsData;
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Dynamically extract unique categories from posts database
  const uniqueCategories = useMemo(() => {
    const cats = new Set(data.posts.map((post) => post.category));
    return ["All", ...Array.from(cats)];
  }, [data.posts]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return data.posts;
    return data.posts.filter((post) => post.category === activeCategory);
  }, [data.posts, activeCategory]);

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col pb-[60px] pt-4 select-none">
      
      {/* Header section with telemetry detail layout */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full flex-col gap-[14px] border-b border-white/5 pb-6"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase font-semibold">
            Technical Writings
          </span>
          <h1 className="text-[26px] sm:text-[36px] font-bold leading-normal text-white">
            {data.title}
          </h1>
        </div>
        <p className="w-full text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary whitespace-pre-line">
          {data.description}
        </p>
      </motion.section>

      {/* Redesigned 2-row left-aligned category selector */}
      <div className="relative flex w-full flex-col gap-2 border-b border-white/5 pb-5 mt-6 z-10 select-none">
        {[
          uniqueCategories.slice(0, 4), // Row 1: All, HR - OCR, HRMS, Insurance
          uniqueCategories.slice(4)     // Row 2: Blog, Civil + CAD, Corporate Website
        ].map((rowItems, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap gap-2 justify-start items-center">
            {rowItems.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3 py-1.5 text-[11px] font-mono tracking-wide rounded-md border shrink-0 transition-all duration-300 flex items-center justify-center ${
                    isActive 
                      ? "border-cyan-500/25 text-cyan-400 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.03)]" 
                      : "border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="blogCategoryGlow"
                      className="absolute inset-0 bg-cyan-500/5 rounded-md z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Interactive Blog Cards List with transition animations */}
      <section className="mt-[28px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <BlogCards items={filteredPosts} />
          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}
