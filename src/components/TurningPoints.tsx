"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── CSS-based Hex Grid ─────────────────────────────────────────── */
function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
        <defs>
          <pattern id="hex-pattern" x="0" y="0" width="88" height="101.6" patternUnits="userSpaceOnUse">
            <polygon points="44,10 77,28 77,64 44,82 11,64 11,28" fill="none" stroke="rgba(163,230,53,0.07)" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="hex-fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hex-mask">
            <rect width="100%" height="100%" fill="url(#hex-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" mask="url(#hex-mask)" />
      </svg>
      {[
        { top: "15%", left: "10%", delay: "0s" },
        { top: "35%", left: "75%", delay: "1.4s" },
        { top: "60%", left: "20%", delay: "2.8s" },
        { top: "80%", left: "60%", delay: "0.7s" },
        { top: "20%", left: "50%", delay: "3.5s" },
        { top: "70%", left: "85%", delay: "1.9s" },
      ].map((spot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: spot.top, left: spot.left, width: 180, height: 180,
            background: "radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)",
            animation: "hexPulse 6s ease-in-out infinite",
            animationDelay: spot.delay,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <style>{`
        @keyframes hexPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%,-50%) scale(0.8); }
          50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

/* ─── Glitch Text ────────────────────────────────────────────────── */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false);
  const [offset, setOffset]       = useState(0);

  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setOffset((Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3));
        setGlitching(true);
        setTimeout(() => { setGlitching(false); setOffset(0); schedule(); }, 180);
      }, 4000 + Math.random() * 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className={`relative inline-block select-none ${className}`}
      style={{
        transition:  glitching ? "none" : "text-shadow 0.3s, transform 0.3s",
        textShadow:  glitching ? `${offset}px 0 rgba(190,242,100,0.9), -${offset}px 0 rgba(255,80,80,0.5)` : "none",
        transform:   glitching ? `translateX(${offset * 0.4}px)` : "none",
      }}
    >
      {text}
    </span>
  );
}

/* ─── Chain connector ───────────────────────────────────────────── */
function ChainConnector({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <div
        className="w-px transition-all duration-700"
        style={{
          height: 72,
          background: active
            ? "linear-gradient(to bottom, rgba(190,242,100,0.6), rgba(190,242,100,0.1))"
            : "rgba(255,255,255,0.06)",
          boxShadow: active ? "0 0 8px rgba(163,230,53,0.4)" : "none",
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full transition-all duration-500"
        style={{
          background: active ? "#bef264" : "rgba(255,255,255,0.12)",
          boxShadow:  active ? "0 0 10px rgba(190,242,100,0.8)" : "none",
          marginTop: -3,
        }}
      />
    </div>
  );
}

/* ─── Data tag ───────────────────────────────────────────────────── */
function DataTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-lime-200/40 uppercase tracking-widest">{label}</span>
      <span className="text-white/20">//</span>
      <span className="text-lime-200/60">{value}</span>
    </div>
  );
}

/* ─── Contents Sidebar ───────────────────────────────────────────── */
/*
  Sticky rules — all three must hold simultaneously:
  1. `position: sticky` on the inner element (via the `sticky` class here).
  2. `top` set to where it should lock (50vh − half its own height).
  3. Its COLUMN ancestor must NOT have overflow:hidden/auto AND must NOT
     stretch to the full height of the grid row (use `self-start` on the column).
  The <section> itself must also NOT have overflow:hidden.
*/
function ContentsSidebar({
  points,
  activeIndex,
}: {
  points: typeof turningPoints;
  activeIndex: number | null;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToCard = (index: number) => {
    const el = document.getElementById(`block-${index}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      /*
        sticky + top:50vh + translateY(-50%)  →  always vertically centred
        in the viewport while the cards column scrolls past.
      */
      className="sticky top-1/2 -translate-y-1/2 flex flex-col justify-center transition-all duration-500"
    >
      {/* Label + big title */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.45em] text-lime-200/50 text-xs mb-5 font-mono">
          Contents
        </p>
        <h3 className="text-4xl font-black leading-[0.95] tracking-tight text-white">
          Turning<br />Points
        </h3>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1">
        {points.map((point, index) => {
          const lit = activeIndex === index || hoveredIndex === index;
          return (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center gap-4 text-left py-3 px-3 rounded-2xl transition-all duration-300 cursor-pointer"
              style={{
                background: lit ? "rgba(190,242,100,0.05)" : "transparent",
                boxShadow: lit ? "0 0 28px rgba(190,242,100,0.05)" : "none",
              }}
            >
              <div
                className="flex-shrink-0 rounded-full transition-all duration-500"
                style={{
                  width: lit ? 28 : 12, height: 2,
                  background: lit ? "#bef264" : "rgba(255,255,255,0.12)",
                  boxShadow: lit ? "0 0 12px rgba(190,242,100,0.5)" : "none",
                }}
              />
              <span
                className="text-[20px] font-semibold tracking-tight leading-snug transition-all duration-300"
                style={{
                  color: lit ? "#d9f99d" : "rgba(255,255,255,0.28)",
                  textShadow: lit ? "0 0 20px rgba(190,242,100,0.2)" : "none",
                }}
              >
                {point.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-3 pl-1">
        <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">
          Narrative Index
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Block Card ─────────────────────────────────────────────────── */
function BlockCard({
  point, index, isActive, onHoverStart, onHoverEnd,
}: {
  point: (typeof turningPoints)[0];
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={cardRef}
      id={`block-${index}`}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative group"
    >
      <div
        className="relative rounded-[20px] border overflow-hidden transition-all duration-700"
        style={{
          borderColor: isActive ? "rgba(190,242,100,0.25)" : "rgba(255,255,255,0.04)",
          background:  isActive ? "rgba(12,12,12,0.97)"   : "rgba(9,9,9,0.9)",
          boxShadow:   isActive
            ? "0 0 80px rgba(163,230,53,0.08), 0 0 0 1px rgba(190,242,100,0.06), inset 0 1px 0 rgba(190,242,100,0.05)"
            : "0 0 0 1px rgba(255,255,255,0.02)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-5 pb-4 border-b border-white/[0.03]">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: isActive ? "#bef264" : "rgba(255,255,255,0.2)",
                boxShadow:  isActive ? "0 0 8px #bef264" : "none",
              }}
            />
            <span className="font-mono text-[11px] text-lime-200/40 tracking-[0.3em]">{point.block}</span>
            <span className="font-mono text-[10px] text-white/15">{point.hash}</span>
          </div>
          <span className="font-mono text-[10px] text-white/15">{point.tx}</span>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2">
          {/* Text */}
          <div className="p-10 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lime-200 text-[11px] tracking-[0.5em] mb-4 font-mono"
            >
              {point.year}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-[2.75rem] font-black leading-[1.05] mb-5 tracking-tight"
            >
              {point.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-gray-300 text-lg leading-8"
            >
              {point.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8 self-start inline-flex items-center gap-3 px-4 py-2 rounded-full"
              style={{ border: "1px solid rgba(190,242,100,0.1)", background: "rgba(190,242,100,0.03)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polygon points="6,1 11,3.5 11,8.5 6,11 1,8.5 1,3.5" stroke="#bef264" strokeWidth="0.9" strokeOpacity="0.55" />
              </svg>
              <span className="font-mono text-[10px] text-lime-200/40">verified on-chain</span>
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[320px]">
            <img
              src={point.image} alt={point.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter:     isActive ? "brightness(0.8) contrast(1.05)" : "brightness(0.4) saturate(0.3)",
                transition: "filter 0.8s ease, transform 0.8s ease",
                transform:  isActive ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(163,230,53,0.025) 3px, rgba(163,230,53,0.025) 4px)",
                opacity: isActive ? 0.8 : 0.4, transition: "opacity 0.8s",
              }}
            />
            <div
              className="absolute inset-x-0 h-[2px] pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent, rgba(190,242,100,0.6), transparent)",
                animation: isActive ? "scanLine 1.6s linear infinite" : "none",
                top: 0,
              }}
            />
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-lime-200/30 space-y-0.5 leading-relaxed">
              <div>LAT {(40 + index * 1.3).toFixed(4)}°N</div>
              <div>LNG {(74 + index * 0.7).toFixed(4)}°W</div>
            </div>
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{ opacity: isActive ? 1 : 0, background: "linear-gradient(to right, rgba(163,230,53,0.06), transparent 40%)" }}
            />
          </div>
        </div>
      </div>
      <style>{`@keyframes scanLine { from { top: -2px; } to { top: 100%; } }`}</style>
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const turningPoints = [
  {
    year: "2025", block: "BLOCK_001", title: "When The Blueprint Broke",
    description: "For a long time, success looked predefined: entrance exams, rankings, and a single destination. Losing the IIT dream forced a complete reset. What initially felt like failure slowly became the beginning of independent thinking, curiosity-driven learning, and building a path that actually felt personal.",
    image: "/images/turning/abstract.jpeg",
    hash: "0x4f3a…c91d", tx: "14,293 iterations",
  },
  {
    year: "2025", block: "BLOCK_002", title: "First Commit",
    description: "Creating the first GitHub repository changed the relationship with technology entirely. The result was Aquahero, an early warning detection system for water borne diseases.",
    image: "/images/turning/aquahero.png",
    hash: "0x9b2e…f04c", tx: "3 shipped products",
  },
  {
    year: "2025", block: "BLOCK_003", title: "First LeetCode Problem",
    description: "The first LeetCode problem was less about solving an algorithm and more about learning patience.",
    image: "/images/turning/leetcode.png",
    hash: "0x1d8a…77be", tx: "∞ in progress",
  },
  {
    year: "2025", block: "BLOCK_003", title: "First Production Environment",
    description: "Working at Linguaero was the first exposure to technology beyond classrooms and tutorials. It brought collaboration, responsibility, and the realization that real systems are shaped as much by people and communication as they are by code.",
    image: "/images/turning/linguaero.jpeg",
    hash: "0x1d8a…77be", tx: "∞ in progress",
  },
  {
    year: "2025", block: "BLOCK_003", title: "Systems Thinking",
    description: "Interests in technology, storytelling, interfaces, and data began converging into a larger fascination with systems. The focus gradually shifted from simply writing code to understanding how information flows, how experiences are designed, and how intelligent digital environments can influence the way people interact and think.",
    image: "/images/turning/nodes.jpeg",
    hash: "0x1d8a…77be", tx: "∞ in progress",
  },
];

/* ─── Main Export ─────────────────────────────────────────────────── */
export default function TurningPoints() {
  const [activeIndex,    setActiveIndex]    = useState<number | null>(null);
  const [viewportActive, setViewportActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observers = turningPoints.map((_, index) => {
      const el = document.getElementById(`block-${index}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setViewportActive(index); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const sidebarActive = activeIndex ?? viewportActive;

  return (
    /*
      ╔══ STICKY CHECKLIST ══════════════════════════════════════════╗
      ║  1. <section> has NO overflow:hidden — we use a child div    ║
      ║     for the background overflow instead.                     ║
      ║  2. The left column div has self-start so its height =       ║
      ║     its content height, not the taller sibling's height.     ║
      ║  3. ContentsSidebar has sticky + top:50vh + translateY(-50%) ║
      ╚══════════════════════════════════════════════════════════════╝
    */
    <section
  ref={sectionRef}
  id="turning-points"
  className="relative bg-[#050505] text-white py-36"
>

      {/* Background — overflow scoped here, NOT on the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HexGrid />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #050505 85%)" }}
        />
      </div>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-24 px-6"
      >
        <p className="uppercase tracking-[0.5em] text-lime-200/50 text-xs mb-5 font-mono">
          TURNING_POINTS.sol
        </p>
        <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
          The Moments That
          <span className="block mt-1">
            <GlitchText text="Changed Everything" className="text-lime-200" />
          </span>
        </h2>
        <div className="mt-7 flex justify-center gap-6">
          <DataTag label="chain" value="PERSONAL_CHAIN" />
          <DataTag label="blocks" value={`${turningPoints.length} confirmed`} />
        </div>
      </motion.div>

      {/*
        Two-column layout.
        LEFT:  self-start  →  height = content height  →  sticky engages
        RIGHT: flex-1      →  cards scroll freely
      */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-10 flex gap-20 items-start">

        {/* ── Left column: sidebar ── */}
        {/* self-start is critical — without it the column stretches to match   */}
        {/* the cards column and sticky has no room to scroll inside.           */}
        <div className="hidden lg:block w-72 flex-shrink-0 self-start">
          <ContentsSidebar points={turningPoints} activeIndex={sidebarActive} />
        </div>

        {/* ── Right column: scrolling cards ── */}
        <div className="flex-1 min-w-0">
          {turningPoints.map((point, index) => (
            <div key={index}>
              {index > 0 && (
                <div className="flex flex-col items-center py-1">
                  <ChainConnector active={activeIndex === index || activeIndex === index - 1} />
                </div>
              )}
              <BlockCard
                point={point}
                index={index}
                isActive={activeIndex === index}
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
              />
            </div>
          ))}
          <div className="flex flex-col items-center pt-3">
            <ChainConnector active={false} />
            <p className="mt-2 font-mono text-[10px] text-white/15 tracking-[0.3em] uppercase">
              Genesis_Block // curiosity
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}