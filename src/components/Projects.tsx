"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "UN Votes Analyzer",
    type: "Data Visualization Platform",
    year: "2025",
    description:
      "Built an interactive platform to analyze United Nations voting behavior through dynamic visual storytelling, filtering systems, and geopolitical trend mapping.",
    skills:
      "Learned how to structure large datasets, design interactive analytical experiences, and transform complex information into intuitive visual systems.",
    stack: ["Next.js", "FastAPI", "Tailwind", "PostgreSQL"],
    images: [
      "/images/projects/unvotes1.jpeg",
      "/images/projects/unvotes2.jpeg",
    ],
  },
  {
    title: "Aquahero",
    type: "AI System",
    year: "2025",
    description:
      "Designed a community-first early warning detection system focused on identifying and monitoring potential water-borne disease outbreaks using localized reporting and data-driven alerts.",
    skills:
      "Developed an understanding of how technology, public health, and community-centered systems can work together to create preventative impact at scale.",
    stack: ["Python", "Data Analysis", "Visualisation", "Javascript"],
    images: [
      "/images/projects/aquahero1.jpeg",
      "/images/projects/aquahero2.png",
    ],
  },
  {
    title: "Data Compression Using Linear Transformations",
    type: "Linear Algebra: Mathematics",
    year: "2026",
    description:
      "Explored how concepts from linear algebra and vector spaces can be applied to compress structured data while preserving meaningful relationships and patterns.",
    skills:
      "Strengthened mathematical thinking, dimensional reasoning, and the ability to connect abstract theory with computational implementation.",
    stack: ["Python", "Linear Algebra", "Numpy", "Seaborn"],
    images: [
      "/images/projects/comp1.png",
      "/images/projects/comp2.png",
    ],
  },
  {
    title: "Global Education Indicators",
    type: "Exploratory Data Analysis",
    year: "2026",
    description:
      "Performed exploratory data analysis on global education datasets to uncover trends, disparities, and developmental patterns across different regions and economies.",
    skills:
      "Learned how to interpret real-world datasets, identify meaningful correlations, and communicate analytical insights through structured visual exploration.",
    stack: ["Pandas", "Matplotlib", "Seaborn", "Jupyter"],
    images: [
      "/images/projects/eda1.png",
      "/images/projects/eda2.png",
    ],
  },
  {
    title: "Personal Narrative Portfolio",
    type: "Interactive Portfolio System",
    year: "2026",
    description:
      "Built an immersive portfolio experience centered around storytelling, systems thinking, and interactive design. The website combines motion, editorial layouts, and data-inspired aesthetics to reflect personal growth and technical evolution.",
    skills:
      "Learned how to combine frontend engineering, animation systems, interface architecture, and narrative-driven design into a cohesive digital experience.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    images: [
      "/images/projects/portfolio1.png",
      "/images/projects/portfolio2.png",
    ],
  },
];

type Direction = "left" | "right" | "up" | "down";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),

  center: {
    x: 0,
    opacity: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
} as const;

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const nextProject = () => {
  setCurrentProject((prev) => (prev + 1) % projects.length)
}
const prevProject = () => {
  setCurrentProject((prev) =>
    prev === 0 ? projects.length - 1 : prev - 1
  )
}
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState<Direction>("right");
  const [imgDirection, setImgDirection] = useState<Direction>("down");
  const [hint, setHint] = useState(true);

  const project = projects[currentProject];

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const goNextProject = useCallback(() => {
    setDirection("right");
    setCurrentProject((p) => (p + 1) % projects.length);
    setCurrentImage(0);
  }, []);

  const goPrevProject = useCallback(() => {
    setDirection("left");
    setCurrentProject((p) => (p - 1 + projects.length) % projects.length);
    setCurrentImage(0);
  }, []);

  const goNextImage = useCallback(() => {
    setImgDirection("down");
    setCurrentImage((i) => (i + 1) % project.images.length);
  }, [project.images.length]);

  const goPrevImage = useCallback(() => {
    setImgDirection("up");
    setCurrentImage((i) => (i - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === "ArrowRight") goNextProject();
      if (e.key === "ArrowLeft") goPrevProject();
      if (e.key === "ArrowDown") goNextImage();
      if (e.key === "ArrowUp") goPrevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNextProject, goPrevProject, goNextImage, goPrevImage]);

  return (
    <section
      id="projects"
      className="relative bg-black text-white py-40 overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-24 px-6">
        <p className="uppercase tracking-[0.5em] text-lime-200 text-lg mb-6">
          THE WORK
        </p>
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Projects That
          <span className="block text-lime-200">Built My Thinking</span>
        </h2>

        {/* Keyboard hint */}
        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-6 inline-flex items-center gap-3 text-gray-500 text-sm"
            >
              <span className="flex gap-1">
                {["←", "→"].map((k) => (
                  <kbd
                    key={k}
                    className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-xs text-lime-200"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
              <span>switch projects</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex gap-1">
                {["↑", "↓"].map((k) => (
                  <kbd
                    key={k}
                    className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-xs text-lime-200"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
              <span>browse images</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — project description, slides horizontally */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProject}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="text-lime-200 uppercase tracking-[0.3em] mb-4">
                  {project.type}
                </p>
                <h3 className="text-5xl font-black mb-6">{project.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed mb-10">
                  {project.description}
                </p>

                <div className="mb-10">
                  <h4 className="text-lime-200 text-lg mb-4">
                    What This Project Taught Me
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {project.skills}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-10">
                  {project.stack.map((tech, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-full border border-white/10 hover:border-lime-200/30 hover:bg-white/[0.03] transition-all duration-500"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                {/* Explore More — lives inside the left column */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-2 inline-flex items-center gap-4 group cursor-pointer"
                >
                  <button
  onClick={nextProject}
  className="
    group
    flex items-center gap-5

    mt-16

    text-lime-200/80
    hover:text-lime-100

    transition-all duration-300
  "
>

  <div className="w-10 h-px bg-lime-200/40 group-hover:w-16 transition-all duration-300" />

  <span className="uppercase tracking-[0.3em] text-sm">
    Explore More Projects
  </span>

  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="text-lime-200/60"
                  >
                    →
                  </motion.div>
</button>
                  
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — TV Screen */}
          <div className="relative">
            <div className="relative bg-[#0a0a0a] border border-lime-200/10 rounded-[48px] p-8 overflow-hidden shadow-[0_0_120px_rgba(163,230,53,0.08)]">

              {/* TV Top Bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-lime-200/70">
                    Interactive Showcase
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {project.year} • {project.type}
                  </p>
                </div>
                <div className="absolute top-8 right-8 text-sm text-gray-500 tracking-[0.3em]">
                  {String(currentProject + 1).padStart(2, "0")}/
                  {String(projects.length).padStart(2, "0")}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  <div className="w-3 h-3 rounded-full bg-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.8)]" />
                </div>
              </div>

              {/* Screen — image slides vertically with ↑↓ */}
              <div className="relative overflow-hidden rounded-[28px] bg-black">
                <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs tracking-[0.3em] uppercase text-lime-100">
                  Project Preview
                </div>

                <AnimatePresence mode="wait" custom={imgDirection}>
                  <motion.img
                    key={`${currentProject}-${currentImage}`}
                    custom={imgDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={project.images[currentImage]}
                    alt={project.title}
                    className="w-full h-[500px] object-cover"
                  />
                </AnimatePresence>

                {/* Scanlines */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.08)_50%)] bg-[size:100%_6px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[70%] h-[120px] bg-lime-200/10 blur-3xl rounded-full" />
              </div>

              {/* TV Controls */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => { setImgDirection("up"); goPrevImage(); }}
                  className="w-14 h-14 rounded-full border border-white/10 hover:border-lime-200/30 hover:bg-white/[0.03] transition-all duration-500 flex items-center justify-center text-2xl"
                >
                  ←
                </button>
                <div className="flex gap-3">
                  {project.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImage === i ? "bg-lime-200" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => { setImgDirection("down"); goNextImage(); }}
                  className="w-14 h-14 rounded-full border border-white/10 hover:border-lime-200/30 hover:bg-white/[0.03] transition-all duration-500 flex items-center justify-center text-2xl"
                >
                  →
                </button>
              </div>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center gap-4 mt-10">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentProject ? "right" : "left");
                    setCurrentProject(i);
                    setCurrentImage(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentProject === i ? "w-16 bg-lime-200" : "w-8 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}