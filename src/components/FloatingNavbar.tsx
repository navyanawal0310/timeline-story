"use client";

import { motion } from "framer-motion";

type Props = {
  visible: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export default function FloatingNavbar({
  visible,
  activeSection,
  setActiveSection,
}: Props) {
  return (
    <motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{
    opacity: visible ? 1 : 0,
    y: visible ? 0 : -40,
  }}
  transition={{
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    fixed top-6 left-1/2 -translate-x-1/2
    z-[100]
    px-3 py-3
    rounded-full
    border border-white/10
    bg-black/60
    backdrop-blur-2xl
    flex items-center gap-3
  "
>
     <div
  className="
    flex items-center justify-between
    w-[92vw] max-w-[1450px]
    px-6 py-4
    rounded-full

    border border-lime-200/10
    bg-black/65

    backdrop-blur-2xl

    shadow-[0_0_60px_rgba(163,230,53,0.06)]

    relative overflow-hidden
  "
>
        <button className={`
  px-8 py-3 rounded-full transition-all duration-500
  ${
    activeSection === "timeline"
      ? "bg-lime-200 text-black"
      : "border border-white/10 text-white hover:border-lime-200/30"
  }
`} onClick={() => {
    setActiveSection("timeline");
    document
      .getElementById("timeline")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}>
          The Journey
        </button>

        <button className={`
  px-10 py-4 text-[17px] rounded-full transition-all duration-500
  ${
    activeSection === "turning-points"
      ? "bg-lime-200 text-black"
      : "border border-white/10 text-white hover:border-lime-200/30"
  }
`} onClick={() => {
    setActiveSection("turning-points");
    document
      .getElementById("turning-points")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
>
          Turning Points
        </button>

        <button
  onClick={() => {
    setActiveSection("projects");
    document
      .getElementById("projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className={`
  px-10 py-4 text-[17px] rounded-full transition-all duration-500
  ${
    activeSection === "projects"
      ? "bg-lime-200 text-black"
      : "border border-white/10 text-white hover:border-lime-200/30"
  }
`}
>
  The Work
</button>

                <button
  onClick={() => {
    setActiveSection("current-chapter");
    document
      .getElementById("current-chapter")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className={`
  px-10 py-4 text-[17px] rounded-full transition-all duration-500
  ${
    activeSection === "current-chapter"
      ? "bg-lime-200 text-black"
      : "border border-white/10 text-white hover:border-lime-200/30"
  }
`}>
          Current Chapter
        </button>
        <button onClick={() => {
  setActiveSection("systems-exploring");

  document
    .getElementById("systems-exploring")
    ?.scrollIntoView({
      behavior: "smooth",
    });
}}
  className={`
px-10 py-4 text-[17px] rounded-full transition-all duration-500 
${
  activeSection === "systems-exploring"
    ? "bg-lime-200 text-black border border-lime-200"
    : "bg-transparent border border-white/10 text-white hover:border-lime-200/30"
}
`}>
          Systems Exploring
        </button>


        <button onClick={() => {
  setActiveSection("vision");

  document
    .getElementById("vision")
    ?.scrollIntoView({
      behavior: "smooth",
    });
}}
  className={`
  px-10 py-4 text-[17px] rounded-full transition-all duration-500
  ${
    activeSection === "vision"
      ? "bg-lime-200 text-black"
      : "border border-white/10 text-white hover:border-lime-200/30"
  }
`}>
          The Vision
        </button>

      </div>
    </motion.div>
  );
}