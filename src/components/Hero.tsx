"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Grain Overlay ─────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[3]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ─── Mouse-following Glow Orb ──────────────────────────────── */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    let raf: number;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      el.style.transform = `translate(${cx - 500}px, ${cy - 500}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 pointer-events-none z-[2]"
      style={{
        width: 1000,
        height: 1000,
        borderRadius: "50%",
        background: "radial-gradient(circle at center, rgba(190,230,120,0.09) 0%, rgba(134,239,172,0.04) 35%, transparent 70%)",
      }}
    />
  );
}

/* ─── Pulsing Rings ─────────────────────────────────────────── */
function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-lime-300/[0.04]"
          style={{
            width: `${320 + i * 180}px`,
            height: `${320 + i * 180}px`,
            animation: `pulse-ring 5s ease-out infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.92); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: scale(1.06); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Particle Canvas Background ────────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const SPACING = 38;
    type Dot = { x: number; y: number; bx: number; by: number };
    let dots: Dot[] = [];

    const buildGrid = () => {
      dots = [];
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ x: c * SPACING, y: r * SPACING, bx: c * SPACING, by: r * SPACING });
    };
    buildGrid();

    const INFLUENCE = 130, REPEL = 18;
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y;
      for (const d of dots) {
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INFLUENCE) {
          const force = (1 - dist / INFLUENCE) * REPEL;
          d.x += (dx / dist) * force * 0.12;
          d.y += (dy / dist) * force * 0.12;
        }
        d.x += (d.bx - d.x) * 0.08;
        d.y += (d.by - d.y) * 0.08;
        const proximity = Math.max(0, 1 - dist / INFLUENCE);
        const alpha = 0.12 + proximity * 0.55;
        const radius = 1 + proximity * 1.4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,230,120,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onResize = () => buildGrid();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

/* ─── Floating Skill Badges ─────────────────────────────────── */
const BADGES = [
  { text: "Education Analysis",    x: "7%",  y: "16%", dur: 5.2, delay: 0 },
  { text: "Python", x: "83%", y: "21%", dur: 6.1, delay: 0.4 },
  { text: "Data Systems",      x: "10%", y: "70%", dur: 4.8, delay: 1.1 },
  { text: "AI Systems",    x: "78%", y: "65%", dur: 5.6, delay: 0.7 },
  { text: "AI/ML",      x: "87%", y: "43%", dur: 4.4, delay: 1.6 },
  { text: "Quantitative Thinking",    x: "4%",  y: "43%", dur: 6.5, delay: 0.2 },
  { text: "Design",     x: "73%", y: "80%", dur: 5.0, delay: 0.9 },
  { text: "Shipping",   x: "18%", y: "82%", dur: 4.6, delay: 1.9 },
  { text: "Systems",    x: "88%", y: "12%", dur: 5.8, delay: 1.3 },
  { text: "Geopolitics",      x: "3%",  y: "28%", dur: 4.2, delay: 0.6 },
];

function FloatingBadges() {
  return (
    <>
      {BADGES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute z-10 pointer-events-none hidden lg:block"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 + b.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,163,175,0.7)",
              animation: `fbadge ${b.dur}s ease-in-out ${b.delay}s infinite`,
            }}
          >
            {b.text}
          </div>
        </motion.div>
      ))}
      <style>{`
        @keyframes fbadge {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50%       { transform: translateY(-11px) rotate(0.5deg); }
        }
      `}</style>
    </>
  );
}

/* ─── Marquee Strip ─────────────────────────────────────────── */
const MARQUEE = [
  "Systems", "✦", "Data", "✦", "Shipping Fast", "✦",
  "Breaking Assumptions", "✦", "Learning Always", "✦",
  "Crafting With Care", "✦", "Building in Public", "✦",
  "Speed × Design", "✦", "Failing Forward", "✦", "Making Things Matter", "✦",
];

function MarqueeStrip() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="absolute bottom-[72px] left-0 right-0 z-20 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div
        className="flex gap-8 whitespace-nowrap py-3"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: item === "✦" ? "rgba(190,230,120,0.25)" : "rgba(107,114,128,0.8)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Side Accents ──────────────────────────────────────────── */
function SideAccents() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-4"
      >
        <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(190,230,120,0.2))" }} />
        <span style={{ writingMode: "vertical-rl", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(107,114,128,0.6)" }}>
          Portfolio · 2025
        </span>
        <div style={{ width: 1, height: 80, background: "linear-gradient(to top, transparent, rgba(190,230,120,0.2))" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-4"
      >
        <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))" }} />
        <span style={{ writingMode: "vertical-rl", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(107,114,128,0.6)" }}>
          Scroll to Explore
        </span>
        <div style={{ width: 1, height: 80, background: "linear-gradient(to top, transparent, rgba(255,255,255,0.08))" }} />
      </motion.div>
    </>
  );
}

/* ─── Stats Row ─────────────────────────────────────────────── */
function StatsRow() {
  const stats = [
    { value: "5+", label: "Projects Shipped" },
    { value: "3×", label: "Projects In Progress" },
    { value: "∞", label: "Lessons Learned" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.9 }}
      className="flex items-center justify-center gap-10 md:gap-16 mt-10 pt-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + i * 0.15, type: "spring", stiffness: 200 }}
            className="text-3xl md:text-4xl font-black"
            style={{ color: "rgba(190,230,120,0.85)" }}
          >
            {s.value}
          </motion.div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(107,114,128,0.7)", marginTop: 6 }}>
            {s.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Kinetic Heading ───────────────────────────────────────── */
function KineticHeading() {
  const words1 = "Building Through".split(" ");
  const words2 = "Growth & Failure".split(" ");
  return (
    <div className="text-6xl md:text-8xl font-black leading-[1.05] text-left md:text-center">
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex gap-4 md:justify-center"
        >
          {words1.map((w, wi) => (
            <span
              key={wi}
              className="inline-block"
              style={{ animation: `word-shimmer 4s ease-in-out ${wi * 0.4 + 1.2}s infinite` }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="flex gap-4 md:justify-center"
          style={{ color: "#d9f99d" }}
        >
          {words2.map((w, wi) => (
            <span
              key={wi}
              className="inline-block"
              style={{ animation: `word-shimmer 4s ease-in-out ${wi * 0.4 + 1.6}s infinite` }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </div>
      <style>{`
        @keyframes word-shimmer {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}

/* ─── Tag Line with Typewriter Cursor ───────────────────────── */
function TaglineWithCursor() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 1 }}
      className="mt-8 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto text-left md:text-center"
      style={{ color: "rgba(107,114,128,0.9)" }}
    >
      Every project, every late-night debug session, every risk,
      and every breakthrough shaped who I am becoming.
      {visible && (
        <span
          className="inline-block ml-1 w-[2px] h-[1em] align-middle"
          style={{
            background: "rgba(190,230,120,0.7)",
            animation: "blink 1.1s step-end infinite",
          }}
        />
      )}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </motion.p>
  );
}

/* ─── About Me Panel ────────────────────────────────────────── */
function AboutPanel({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="about-panel"
          initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-20 left-6 z-50 w-[440px]"
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{
              background: "rgba(8,8,8,0.85)",
              backdropFilter: "blur(28px)",
              boxShadow: "0 0 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-lime-300/60 to-transparent" />
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full border border-lime-300/30 flex items-center justify-center text-lime-200 text-xl font-black"
                  style={{ background: "rgba(190,230,120,0.07)" }}
                >
                  N^2
                </div>
                <div>
                  <p className="text-white font-semibold text-2xl tracking-wide">Navya Nawal</p>
                  <p className="text-lime-300/80 text-base tracking-[0.35em] uppercase mt-1">Systems · Data · Interaction</p>
                </div>
              </div>
              <p className="text-gray-300 text-[19px] leading-loose">
                Exploring the intersection of data, systems, and digital experiences.
                Interested in intelligent infrastructure, visualization, and the architecture behind modern technology.
              </p>
              <div className="h-px bg-white/[0.06]" />
              <div className="space-y-2">
                <p className="text-gray-400 text-sm tracking-[0.35em] uppercase mb-5">Find me at</p>
                {[
                  {
                    label: "GitHub", handle: "navyanawal0310", href: "https://github.com/navyanawal0310",
                    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>,
                  },
                  {
                    label: "LinkedIn", handle: "navya-nawal-97251b362/", href: "https://www.linkedin.com/in/navya-nawal-97251b362/",
                    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
                  },
                  {
                    label: "Email", handle: "navyanawal4396@gmail.com", href: "mailto:navyanawal4396@gmail.com",
                    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
                  },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/link">
                    <span className="text-gray-600 group-hover/link:text-lime-300 transition-colors duration-200">{s.icon}</span>
                    <span className="text-gray-500 text-sm group-hover/link:text-lime-300 transition-colors duration-200 tracking-wide">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Glow Border Button ────────────────────────────────────── */
function GlowBorderButton({
  children, className = "", onClick,
}: {
  children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  return (
    <div className="relative group rounded-full p-[1.5px]" style={{ background: "transparent" }}>
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "conic-gradient(from var(--angle, 0deg), transparent 60%, #bef264 80%, #86efac 90%, #bef264 95%, transparent 100%)",
          animation: "border-spin 1.4s linear infinite",
          padding: "1.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`relative px-9 py-3.5 rounded-full bg-black text-[17px] font-medium z-10 whitespace-nowrap transition-all duration-500 ${className}`}
      >
        {children}
      </motion.button>
      <style>{`
        @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes border-spin { to { --angle: 360deg; } }
      `}</style>
    </div>
  );
}

/* ─── Number Indicator (top right) ─────────────────────────── */
function NumberAccent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1.2 }}
      className="absolute top-6 right-8 z-20 hidden md:block"
      style={{
        fontSize: 11,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(107,114,128,0.4)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      01 / Portfolio
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
    {/* About Me toggle — outside <section> so overflow-hidden never clips or intercepts clicks */}
    <div className="fixed top-6 left-6 z-[9999]" style={{ isolation: "isolate" }}>
      <motion.button
        onClick={() => setAboutOpen((o) => !o)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-lime-300 hover:border-lime-300/20 transition-colors duration-300"
      >
        <div className="relative w-4 h-3 flex flex-col justify-between">
          <motion.span animate={aboutOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="block h-px bg-current origin-left" />
          <motion.span animate={aboutOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} className="block h-px bg-current" />
          <motion.span animate={aboutOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="block h-px bg-current origin-left" />
        </div>
        <span>{aboutOpen ? "Close" : "About Me"}</span>
      </motion.button>
    </div>
    <AboutPanel open={aboutOpen} />

    <section className="relative min-h-screen bg-[#080808] text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Layer stack */}
      <ParticleBackground />
      <MouseGlow />
      <PulseRings />
      <GrainOverlay />

      {/* Ambient corner glows */}
      <div className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] rounded-full bg-lime-300/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-green-400/4 blur-[120px] pointer-events-none" />

      {/* Floating badges */}
      <FloatingBadges />

      {/* Marquee */}
      <MarqueeStrip />

      {/* Side accents */}
      <SideAccents />

      {/* Top number accent */}
      <NumberAccent />

      {/* ── Hero Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1700px] mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(190,230,120,0.4))" }} />
          <p className="uppercase text-yellow-100/80 text-sm md:text-base tracking-[0.55em] font-medium">
            MY JOURNEY
          </p>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(190,230,120,0.4))" }} />
        </motion.div>

        {/* Main Heading */}
        <KineticHeading />

        {/* Description with cursor */}
        <TaglineWithCursor />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="flex items-center justify-center gap-5 w-full max-w-[1380px] mx-auto px-8 py-7 rounded-[42px] border border-lime-200/10 bg-black/72 backdrop-blur-2xl shadow-[0_0_80px_rgba(163,230,53,0.08)] whitespace-nowrap relative mt-10"
        >
          <div className="absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_top,rgba(190,242,100,0.05),transparent_60%)] pointer-events-none" />

          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="px-10 py-3.5 rounded-full text-black text-base font-semibold transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #d9f99d, #bbf7d0)",
              boxShadow: "0 0 35px rgba(163,230,53,0.22)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 55px rgba(163,230,53,0.38)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 35px rgba(163,230,53,0.22)"; }}
          >
            The Journey
          </motion.button>

          <GlowBorderButton className="text-white" onClick={() => document.getElementById("turning-points")?.scrollIntoView({ behavior: "smooth" })}>
            Turning Points
          </GlowBorderButton>
          <GlowBorderButton className="text-white" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            The Work
          </GlowBorderButton>
          <GlowBorderButton className="text-white" onClick={() => document.getElementById("current-chapter")?.scrollIntoView({ behavior: "smooth" })}>
            Current Chapter
          </GlowBorderButton>
          <GlowBorderButton className="text-white" onClick={() => document.getElementById("systems-exploring")?.scrollIntoView({ behavior: "smooth" })}>
            Systems Exploring
          </GlowBorderButton>
          <GlowBorderButton className="text-white" onClick={() => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" })}>
            The Vision
          </GlowBorderButton>
        </motion.div>

        {/* Stats Row */}
        <StatsRow />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-5 z-30 flex flex-col items-center gap-2"
        style={{ color: "rgba(107,114,128,0.5)" }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase" }}>Scroll</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <rect x="4.5" y="2" width="3" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
          <rect x="0.5" y="0.5" width="11" height="17" rx="5.5" stroke="currentColor" strokeOpacity="0.2" />
        </svg>
      </motion.div>
    </section>
    </>
  );
}