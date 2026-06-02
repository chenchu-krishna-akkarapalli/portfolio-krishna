"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSkillMeterSound } from "@/utils/sounds";


// Types
interface SkillMetaData {
  proficiency: number;
  years: number;
  bootCommand: string;
  logs: string[];
  projects: { title: string; slug: string }[];
}

const DEFAULT_SKILLS: Record<string, string[]> = {
  "Frontend": ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Redux"],
  "Backend": ["Node.js", "Django", "FastAPI", "REST APIs", "Prisma ORM"],
  "Database & Messaging": ["MySQL", "PostgreSQL", "SQLite", "Redis", "Kafka", "RabbitMQ"],
  "DevOps & Cloud": ["Docker", "CI/CD", "AWS EC2", "AWS Lambda", "S3", "GitHub Actions"],
  "Design & Tools": ["Figma", "Adobe Suite", "Canva", "Sketch", "UX Research", "Git/GitHub"],
  "Other": ["LLM / Gen AI", "Microservices Architecture", "JWT Authentication", "OAuth2", "Swagger / OpenAPI", "RBAC", "Event-Driven Systems"]
};

// Colors for each category
const CATEGORY_COLORS: Record<string, { primary: string; glow: string; text: string; bg: string }> = {
  "Frontend": { primary: "#00f0ff", glow: "rgba(0,240,255,0.15)", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
  "Backend": { primary: "#ff6b00", glow: "rgba(255,107,0,0.15)", text: "text-[#ff6b00]", bg: "bg-[#ff6b00]/10" },
  "Database & Messaging": { primary: "#10b981", glow: "rgba(16,185,129,0.15)", text: "text-[#10b981]", bg: "bg-[#10b981]/10" },
  "DevOps & Cloud": { primary: "#8b5cf6", glow: "rgba(139,92,246,0.15)", text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
  "Design & Tools": { primary: "#ec4899", glow: "rgba(236,72,153,0.15)", text: "text-[#ec4899]", bg: "bg-[#ec4899]/10" },
  "Other": { primary: "#f59e0b", glow: "rgba(245,158,11,0.15)", text: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" }
};

// Comprehensive Metadata for matching skills
const SKILL_META: Record<string, SkillMetaData> = {
  "React.js": {
    proficiency: 95,
    years: 4,
    bootCommand: "npx create-react-app --template typescript",
    logs: [
      "Initializing React 19 Core Engine...",
      "Binding dynamic state hooks and selectors...",
      "Concurrent Rendering Mode: ACTIVE",
      "Fiber Tree reconciliation: 100% OK",
      "Dynamic bundle size: 42.4 KB (gzipped)",
      "Hydration complete. System ONLINE."
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "Next.js": {
    proficiency: 94,
    years: 3.5,
    bootCommand: "npm run dev",
    logs: [
      "▲ Next.js server booting up...",
      "Initializing App Router, Layouts & Server Components...",
      "Binding Dynamic Route handler engines...",
      "HMR (Hot Module Replacement) listener: active",
      "Edge Middleware routing: active",
      "Compiled page / in 248ms (220 modules)"
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" },
      { title: "CMA Firm Website", slug: "cma-firm-website-strategy-led-ui" }
    ]
  },
  "JavaScript": {
    proficiency: 96,
    years: 5,
    bootCommand: "node index.js",
    logs: [
      "V8 Execution Environment: Initialized",
      "ESNext module loaders loaded successfully...",
      "Prototype chain checks: 100% integrity",
      "Asynchronous Event Loop: Polling active",
      "Microtasks queue execution: 0ms lag"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "TypeScript": {
    proficiency: 92,
    years: 4,
    bootCommand: "tsc --watch --strict",
    logs: [
      "TypeScript compiler v5.x launched...",
      "Parsing compiler options (tsconfig.json)...",
      "Analyzing strict type check guidelines...",
      "Type diagnostics: 0 errors detected.",
      "Incremental compilation complete."
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" }
    ]
  },
  "Tailwind CSS": {
    proficiency: 95,
    years: 4,
    bootCommand: "npx tailwindcss -i ./src/input.css -o ./dist/output.css",
    logs: [
      "Tailwind CSS v4 Engine active...",
      "Scanning design tokens and theme variables...",
      "JIT (Just-in-Time) compiler spawned...",
      "Utility class definitions loaded: 1,842",
      "CSS bundle optimized: 6.4 KB"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "CMA Firm Website", slug: "cma-firm-website-strategy-led-ui" }
    ]
  },
  "Redux": {
    proficiency: 88,
    years: 3,
    bootCommand: "npm i @reduxjs/toolkit",
    logs: [
      "Redux Toolkit Store initializing...",
      "Configuring middlewares and slice reducers...",
      "Actions dispatch pipeline: active",
      "DevTools browser extension bridge: enabled",
      "Store subscription listener: online"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "Node.js": {
    proficiency: 90,
    years: 4,
    bootCommand: "node --watch app.js",
    logs: [
      "Node.js Runtime v20.x running...",
      "Spawning CPU Worker Thread pool...",
      "Handling asynchronous non-blocking I/O...",
      "HTTP Server listening on port 8080",
      "Express/Fastify router: READY"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "Django": {
    proficiency: 86,
    years: 3,
    bootCommand: "python manage.py runserver",
    logs: [
      "Django WSGI/ASGI service initializing...",
      "Checking database migration state: 100% applied",
      "Role-Based Access Control Middleware: ACTIVE",
      "Django REST Framework endpoints routing: OK",
      "Development server running on http://127.0.0.1:8000/"
    ],
    projects: [
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "FastAPI": {
    proficiency: 88,
    years: 3,
    bootCommand: "uvicorn main:app --reload",
    logs: [
      "Uvicorn server running on http://127.0.0.1:8000",
      "FastAPI application loading routing tables...",
      "Swagger UI docs compiled: /docs",
      "Pydantic schemas data validation: ACTIVE",
      "Asynchronous request loop: ONLINE"
    ],
    projects: [
      { title: "OCR Handwritten Text Extraction", slug: "ocr-handwritten-text-extraction" },
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "REST APIs": {
    proficiency: 94,
    years: 4,
    bootCommand: "curl -X GET http://localhost:8080/api/v1/health",
    logs: [
      "RESTful Router mapping active...",
      "Standard HTTP verbs binded (GET, POST, PUT, DELETE)...",
      "CORS cross-origin security rules: Active",
      "Rate-limiting token bucket algorithm: ON",
      "Response payload schemas: application/json"
    ],
    projects: [
      { title: "OCR Handwritten Text Extraction", slug: "ocr-handwritten-text-extraction" },
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "Prisma ORM": {
    proficiency: 90,
    years: 3.5,
    bootCommand: "npx prisma studio",
    logs: [
      "Prisma Client connecting to SQL databases...",
      "Generating Prisma schemas from database schema...",
      "Query Engine binary initialized: OK",
      "Entity relation mappings loaded...",
      "Active pool connections count: 4"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" }
    ]
  },
  "MySQL": {
    proficiency: 86,
    years: 4,
    bootCommand: "mysql -u root -p",
    logs: [
      "MySQL server daemon starting...",
      "Active schema index: HRMS_TENANT_DB",
      "Relational table keys constraint checks: OK",
      "Thread connection pool: ACTIVE",
      "Database state: READY"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "PostgreSQL": {
    proficiency: 88,
    years: 3.5,
    bootCommand: "psql -U postgres",
    logs: [
      "PostgreSQL server database engine running...",
      "Preparing materialized views for read operations...",
      "Indexed tables lookup optimization: ACTIVE",
      "Transaction level: SERIALIZABLE",
      "Server connected successfully."
    ],
    projects: [
      { title: "OCR Handwritten Text Extraction", slug: "ocr-handwritten-text-extraction" }
    ]
  },
  "SQLite": {
    proficiency: 90,
    years: 4,
    bootCommand: "sqlite3 database.db",
    logs: [
      "SQLite local database engine loaded...",
      "Accessing file-backed datastore: database.db",
      "Journaling mode: WAL (Write-Ahead Logging)",
      "Database schema version: v12.4"
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" }
    ]
  },
  "Redis": {
    proficiency: 85,
    years: 3,
    bootCommand: "redis-cli ping",
    logs: [
      "Redis memory-cache daemon active...",
      "Connected on port 6379",
      "Memory allocation strategy: volatile-lru",
      "Active cache keys count: 1,424",
      "Ping response: PONG"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "Kafka": {
    proficiency: 82,
    years: 2,
    bootCommand: "kafka-console-producer.sh --topic payments",
    logs: [
      "Kafka Broker Broker-1 listener active...",
      "Event Sourcing pipeline online...",
      "CQRS database syncing state: OK",
      "Producer/Consumer groups status: HEALTHY",
      "Active partitions count: 12"
    ],
    projects: [
      { title: "OCR Handwritten Text Extraction", slug: "ocr-handwritten-text-extraction" }
    ]
  },
  "RabbitMQ": {
    proficiency: 84,
    years: 2.5,
    bootCommand: "rabbitmqctl status",
    logs: [
      "RabbitMQ AMQP Broker running...",
      "Routing exchange: direct-events",
      "Queues binding configuration: OK",
      "Durable message state validation: Enabled",
      "Active connections count: 8"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "Docker": {
    proficiency: 88,
    years: 3.5,
    bootCommand: "docker compose up -d",
    logs: [
      "Docker Daemon listener online...",
      "Loading container specifications...",
      "Container network bridge set up: OK",
      "Container 'web-app' initialized: PORT 3000",
      "All microservices containerized and running."
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "CI/CD": {
    proficiency: 85,
    years: 3,
    bootCommand: "git push origin main",
    logs: [
      "Spawning CI/CD runner interface...",
      "Validating package.json linting and testing...",
      "Testing pipelines completed: PASS",
      "Packaging bundle outputs...",
      "Deploying release artifacts..."
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" }
    ]
  },
  "AWS EC2": {
    proficiency: 86,
    years: 3,
    bootCommand: "aws ec2 describe-instances",
    logs: [
      "Connecting to AWS EC2 instance console...",
      "Instance state: RUNNING (t3.medium)",
      "System status checks: 2/2 passed",
      "Elastic IP routing: ACTIVE",
      "CPU utilization: 18.2%"
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" },
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" }
    ]
  },
  "AWS Lambda": {
    proficiency: 82,
    years: 2.5,
    bootCommand: "aws lambda invoke --function-name convertCAD",
    logs: [
      "Triggering AWS Lambda serverless function...",
      "Event payload parsed successfully...",
      "Running serverless execution runtime: Node.js 18",
      "Execution time: 842ms",
      "Returned status code: 200 (Success)"
    ],
    projects: [
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "S3": {
    proficiency: 90,
    years: 3.5,
    bootCommand: "aws s3 ls s3://cad-drawings-bucket",
    logs: [
      "Accessing AWS Simple Storage Service (S3)...",
      "Active bucket: cad-drawings-bucket",
      "Asset metadata validation: ENABLED",
      "File indexing: 8,429 items",
      "Connection state: SAFE"
    ],
    projects: [
      { title: "Blog Publishing Platform", slug: "blog-publishing-platform" },
      { title: "Civil Construction Project Management", slug: "civil-dept-product-cad" }
    ]
  },
  "GitHub Actions": {
    proficiency: 88,
    years: 3,
    bootCommand: "act -W .github/workflows/deploy.yml",
    logs: [
      "GitHub Actions runner container spawned...",
      "Workflow run 'Release Deploy' triggered...",
      "Step: Install dependencies: SUCCESS (24s)",
      "Step: Run unit tests: SUCCESS (12s)",
      "Step: Deploy to production server: SUCCESS (48s)"
    ],
    projects: [
      { title: "Insurance Web Application", slug: "insurance-product" }
    ]
  },
  "Figma": {
    proficiency: 94,
    years: 4,
    bootCommand: "open figma://file/design-system",
    logs: [
      "Loading Figma design system file...",
      "Compiling UI components and style tokens...",
      "Grid systems check: 8px/4px structural alignment",
      "Color palettes contrast ratio: 4.5:1 (WCAG AA check OK)",
      "Vector curves render: 60fps"
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "CMA Firm Website", slug: "cma-firm-website-strategy-led-ui" }
    ]
  },
  "Git/GitHub": {
    proficiency: 92,
    years: 5,
    bootCommand: "git status && git log -n 1",
    logs: [
      "Working tree integrity: CLEAN",
      "Active branch: main (up to date with origin/main)",
      "Analyzing commit history trees...",
      "Signature checking (GPG key verification): ACTIVE",
      "Everything OK."
    ],
    projects: [
      { title: "Multi-Tenant HR Product", slug: "multi-tenant-hr-product" },
      { title: "Insurance Web Application", slug: "insurance-product" }
    ]
  }
};

const getSkillData = (name: string): SkillMetaData => {
  if (SKILL_META[name]) return SKILL_META[name];
  
  // High-fidelity fallback algorithm for undocumented skills
  const normalized = name.toLowerCase();
  const years = normalized.includes("react") || normalized.includes("javascript") || normalized.includes("ui") || normalized.includes("ux") ? 4 : 2.5;
  const proficiency = normalized.includes("react") || normalized.includes("next") || normalized.includes("js") ? 90 : 80;
  
  return {
    proficiency,
    years,
    bootCommand: `systemctl status ${normalized.replace(/[^a-z0-9]/g, "")}`,
    logs: [
      `Initializing active service module for ${name}...`,
      `Validating production config files...`,
      `Service successfully binded on local node.`,
      `Current state: STABLE / ACTIVE`,
      `Dynamic telemetry log recording is enabled.`
    ],
    projects: []
  };
};

export default function SkillDashboardPreview() {
  const [skills, setSkills] = useState<Record<string, string[]>>(DEFAULT_SKILLS);
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const [selectedSkill, setSelectedSkill] = useState<string>("React.js");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  // Console Typing Effect States
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [typingCommand, setTypingCommand] = useState<string>("");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic parser for Resume.md
  useEffect(() => {
    async function loadResumeSkills() {
      try {
        const response = await fetch("/resume/Resume.md");
        if (!response.ok) throw new Error("Resume load error");
        const text = await response.text();
        
        const parsed = parseSkillsMarkdown(text);
        if (parsed && Object.keys(parsed).length > 0) {
          setSkills(parsed);
          // Set first parsed category as active
          const firstCat = Object.keys(parsed)[0];
          setActiveCategory(firstCat);
          if (parsed[firstCat] && parsed[firstCat].length > 0) {
            setSelectedSkill(parsed[firstCat][0]);
          }
        }
      } catch (err) {
        // Silent recovery - falls back to robust static DEFAULT_SKILLS
      }
    }
    loadResumeSkills();
  }, []);

  // Update selected skill when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (skills[cat] && skills[cat].length > 0) {
      setSelectedSkill(skills[cat][0]);
    }
  };

  // Logic to parse markdown
  const parseSkillsMarkdown = (md: string): Record<string, string[]> | null => {
    const data: Record<string, string[]> = {};
    const skillsSectionRegex = /# Skills([\s\S]*?)(?:\r?\n#\s+|$)/i;
    const match = md.match(skillsSectionRegex);
    if (!match) return null;

    const content = match[1];
    const blocks = content.split(/(?:\r?\n)##\s+/);

    blocks.forEach((block) => {
      const lines = block.trim().split(/\r?\n/);
      if (lines.length === 0 || !lines[0]) return;

      const category = lines[0].trim();
      const items: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("- ")) {
          items.push(line.replace("- ", "").trim());
        }
      }

      if (items.length > 0) {
        data[category] = items;
      }
    });

    return data;
  };

  // Telemetry Console Logger Controller (Typing/Log streaming system)
  useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    if (logTimerRef.current) clearInterval(logTimerRef.current);
    
    const meta = getSkillData(selectedSkill);
    
    // Step 1: Animate typing of boot command
    setTypingCommand("");
    setConsoleLines([]);
    
    let charIndex = 0;
    const commandText = `$ ${meta.bootCommand}`;
    
    typingTimerRef.current = setInterval(() => {
      if (charIndex < commandText.length) {
        setTypingCommand((prev) => prev + commandText[charIndex]);
        charIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        
        // Step 2: Stream logs line by line
        let logIndex = 0;
        logTimerRef.current = setInterval(() => {
          if (logIndex < meta.logs.length) {
            setConsoleLines((prev) => [...prev, meta.logs[logIndex]]);
            logIndex++;
          } else {
            if (logTimerRef.current) clearInterval(logTimerRef.current);
          }
        }, 120);
      }
    }, 25);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (logTimerRef.current) clearInterval(logTimerRef.current);
    };
  }, [selectedSkill]);

  const activeMeta = getSkillData(selectedSkill);
  const activeColor = CATEGORY_COLORS[activeCategory] || CATEGORY_COLORS["Other"];

  // Dial Gauge calculations
  const radiusOuter = 64;
  const circOuter = 2 * Math.PI * radiusOuter;
  const strokeOffsetOuter = circOuter - (activeMeta.proficiency / 100) * circOuter;

  const radiusInner = 48;
  const circInner = 2 * Math.PI * radiusInner;
  // Years cap at 5 for calculation
  const strokeOffsetInner = circInner - (Math.min(activeMeta.years, 5) / 5) * circInner;

  return (
    <div className="relative flex flex-col w-full bg-[#030508] overflow-hidden rounded-[16px] border border-white/5 font-sans p-4 sm:p-6 shadow-2xl">
      {/* HUD futuristic matrix lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />
      
      {/* Header telemetry display */}
      <div className="relative flex justify-between items-center w-full border-b border-white/5 pb-3 mb-4 z-10">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.25em] text-gray-500 font-mono font-semibold uppercase">
            System Cockpit Mode
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            SKILL TELEMETRY INTERFACE
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-400 tracking-wider">CORE.SYS: STABLE</span>
        </div>
      </div>

      {/* Categories horizontal slider scrollbar */}
      <div className="relative flex w-full overflow-x-auto scrollbar-none gap-1 border-b border-white/5 pb-3 mb-5 z-10">
        {Object.keys(skills).map((cat) => {
          const catActive = cat === activeCategory;
          const catColors = CATEGORY_COLORS[cat] || CATEGORY_COLORS["Other"];
          return (
            <button
              key={cat}
              onClick={() => {
                playSkillMeterSound();
                handleCategoryChange(cat);
              }}
              suppressHydrationWarning={true}
              className={`relative px-3 py-1.5 text-xs font-mono tracking-wide rounded-md border shrink-0 transition-all duration-300 ${
                catActive 
                  ? "bg-white/5 border-white/10 text-white font-medium" 
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {catActive && (
                <motion.div
                  layoutId="activeCategoryGlow"
                  className="absolute inset-x-0 bottom-0 h-[2px]"
                  style={{ backgroundColor: catColors.primary }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main double telemetry interface columns layout */}
      <div className="relative flex flex-col md:flex-row gap-5 z-10 w-full min-h-[300px]">
        
        {/* Left Side: Gauges, metrics and metadata */}
        <div className="flex flex-col items-center justify-center bg-[#07090e] rounded-xl border border-white/5 p-4 sm:p-5 w-full md:w-[240px] shrink-0">
          
          {/* Dual circular gauge SVG container */}
          <div className="relative flex items-center justify-center w-[160px] h-[160px]">
            {/* Soft Ambient glowing blob behind the dial */}
            <div 
              className="absolute inset-4 rounded-full blur-2xl opacity-20 transition-all duration-500"
              style={{ backgroundColor: activeColor.primary }}
            />
            
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="primaryDialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={activeColor.primary} stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0.9} />
                </linearGradient>
                <filter id="dialGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background circular tracks */}
              <circle cx="80" cy="80" r={radiusOuter} stroke="#111622" strokeWidth="4" fill="transparent" />
              <circle cx="80" cy="80" r={radiusInner} stroke="#0e121c" strokeWidth="2.5" fill="transparent" />

              {/* Outer circular gauge (Proficiency Rating) */}
              <motion.circle
                cx="80"
                cy="80"
                r={radiusOuter}
                stroke="url(#primaryDialGrad)"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circOuter}
                initial={{ strokeDashoffset: circOuter }}
                animate={{ strokeDashoffset: strokeOffsetOuter }}
                transition={{ type: "spring", stiffness: 45, damping: 13 }}
                filter="url(#dialGlow)"
              />

              {/* Inner circular gauge (Experience Multiplier) */}
              <motion.circle
                cx="80"
                cy="80"
                r={radiusInner}
                stroke={activeColor.primary}
                strokeWidth="2.5"
                strokeDasharray={circInner}
                fill="transparent"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circInner }}
                animate={{ strokeDashoffset: strokeOffsetInner }}
                transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.1 }}
                opacity={0.6}
              />
            </svg>

            {/* Inner HUD readouts */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] tracking-widest text-gray-500 font-mono uppercase font-semibold">
                Match
              </span>
              <motion.span 
                key={selectedSkill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-extralight tracking-tighter text-white font-sans mt-0.5"
              >
                {activeMeta.proficiency}%
              </motion.span>
              <span className={`text-[9px] tracking-wider font-mono font-medium mt-1 px-1.5 py-0.5 rounded-sm ${activeColor.bg} ${activeColor.text}`}>
                {activeMeta.years}+ YRS EXP
              </span>
            </div>
          </div>

          {/* Quick HUD telemetry statistics display */}
          <div className="w-full flex justify-between gap-2 border-t border-white/5 pt-3 mt-4 text-[10px] font-mono">
            <div className="flex flex-col">
              <span className="text-gray-500">ENGINE.UNIT</span>
              <span className="text-white mt-0.5 truncate max-w-[85px]">{selectedSkill}</span>
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div className="flex flex-col text-right">
              <span className="text-gray-500">INDEX.VAL</span>
              <span className="text-white mt-0.5 font-semibold" style={{ color: activeColor.primary }}>
                {(activeMeta.proficiency * 0.1).toFixed(1)} / 10.0
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Skill Grid and interactive dev logs console */}
        <div className="flex flex-col flex-1 gap-4 w-full">
          
          {/* Skill grids (Interactive node chips) */}
          <div className="flex flex-wrap gap-2 w-full content-start min-h-[105px]">
            {skills[activeCategory]?.map((skill) => {
              const isSelected = skill === selectedSkill;
              const skillMeta = getSkillData(skill);
              return (
                <button
                  key={skill}
                  onClick={() => {
                    playSkillMeterSound();
                    setSelectedSkill(skill);
                  }}
                  onMouseEnter={() => setIsHovered(skill)}
                  onMouseLeave={() => setIsHovered(null)}
                  suppressHydrationWarning={true}
                  className={`group relative flex items-center justify-between px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-300 select-none cursor-pointer transform-gpu ${
                    isSelected
                      ? "bg-white/5 text-white shadow-lg"
                      : "bg-[#05070a]/40 text-gray-400 hover:text-white"
                  }`}
                  style={{
                    borderColor: isSelected 
                      ? activeColor.primary 
                      : (isHovered === skill ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"),
                    boxShadow: isSelected 
                      ? `0 0 12px ${activeColor.glow}` 
                      : "none"
                  }}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {/* Minimalist neon LED ring icon indicator */}
                    <span 
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isSelected ? "scale-110" : "opacity-40"
                      }`}
                      style={{ 
                        backgroundColor: isSelected || isHovered === skill 
                          ? activeColor.primary 
                          : "#4b5563"
                      }}
                    />
                    {skill}
                  </span>
                  
                  {/* Subtle active percentage hover metrics overlay */}
                  <span className={`text-[9px] font-mono ml-2 transition-all duration-300 ${
                    isSelected ? activeColor.text : "text-gray-600 group-hover:text-gray-400"
                  }`}>
                    {skillMeta.proficiency}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive cyber developer logs terminal */}
          <div className="relative flex flex-col flex-1 bg-[#040609] border border-white/5 rounded-xl font-mono text-xs overflow-hidden min-h-[160px] p-3 sm:p-4 shadow-inner">
            {/* Terminal Header */}
            <div className="flex justify-between items-center w-full border-b border-white/5 pb-2 mb-3.5 text-[10px] text-gray-500 font-semibold select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <span className="ml-1.5 tracking-wider">DEV_CONSOLE_DIAGNOSTIC</span>
              </div>
              <span className="text-[9px]">v1.0.3</span>
            </div>

            {/* Typewriter bootlogs terminal display */}
            <div className="flex-1 flex flex-col gap-1.5 text-gray-400 select-text overflow-y-auto leading-relaxed max-h-[140px] pr-2 scrollbar-thin">
              <span className="text-white font-medium break-all">
                {typingCommand}
                <span className="animate-pulse inline-block h-3.5 w-1 bg-white ml-0.5 align-middle" />
              </span>
              
              <AnimatePresence>
                {consoleLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-start gap-1 text-[11px] ${
                      line && (line.includes("Error") || line.includes("FAILED"))
                        ? "text-red-400" 
                        : (line && (line.includes("ONLINE") || line.includes("SUCCESS") || line.includes("OK"))
                          ? "text-emerald-400" 
                          : "text-gray-400")
                    }`}
                  >
                    <span className="text-gray-600 shrink-0 select-none">›</span>
                    <span className="break-all">{line || ""}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Connected Portfolio Projects sub-panel (Dynamically matches current database) */}
            {activeMeta.projects.length > 0 && (
              <div className="relative border-t border-white/5 mt-3 pt-3 flex flex-col gap-1.5">
                <span className="text-[10px] tracking-wider text-gray-500 font-semibold select-none uppercase">
                  Connected Production Deployments:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeMeta.projects.map((proj) => (
                    <a
                      key={proj.slug}
                      href={`/projects/${proj.slug}`}
                      className="group/btn relative flex items-center justify-between text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 hover:border-white/15 px-2.5 py-1 rounded transition-all duration-300 font-medium cursor-pointer"
                    >
                      <span className="flex items-center gap-1 mr-1">
                        {proj.title}
                      </span>
                      <svg 
                        className="h-3 w-3 text-gray-500 group-hover/btn:text-white transition-colors duration-300" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
