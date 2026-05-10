"use client";

import { motion } from "framer-motion";

const floatingTexts = [
  {
    title: "Exploring Complex Systems",
    description:
      "Investigating how data, intelligence, design, and decision systems interact across technology, education, and society.",
    position: {
      top: "18%",
      left: "12%",
    },
  },
  {
  title: "Mapping Intelligence",
  description:
    "Studying how information flows through AI systems, institutions, markets, and human-centered digital experiences.",
  position: {
    top: "18%",
    right: "10%",
  },
},

{
  title: "Systems in Motion",
  description:
    "Exploring data engineering, intelligent systems, quantitative thinking, and interface design through experimentation and research.",
  position: {
    bottom: "18%",
    left: "10%",
  },
},

  {
    title: "Computational Decision Making",
    description:
      "A continuing exploration of AI systems, data infrastructure, quantitative models, and human-centered design.",
    position: {
      bottom: "20%",
      right: "10%",
    },
  },
];

export default function CurrentChapter() {
  const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>
) => {
  const x = e.clientX;
  const y = e.clientY;

  const glow = document.getElementById("cursor-glow");

  if (glow) {
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  }
};
  return (

    <section
    onMouseMove={handleMouseMove}
      id="current-chapter"
      className="
        relative
        h-screen
        overflow-hidden
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
    >

      {/* Background Glow */}
      <div
  id="cursor-glow"
  className="
    pointer-events-none
    absolute
    w-[500px]
    h-[500px]
    rounded-full
    bg-lime-300/10
    blur-[140px]
    -translate-x-1/2
    -translate-y-1/2
    transition-all
    duration-300
    ease-out
    z-0
  "
/>

      <div className="absolute top-0 left-0 w-[700px] h-[700px] animate-pulse
bg-lime-300/8 blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-400/10 blur-[180px]" />

      {/* Massive Background Text */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >

        <motion.h2
          initial={{
  opacity: 0,
  scale: 0.96,
}}

whileInView={{
  opacity: 1,
  scale: 1,
}}

transition={{
  duration: 1.8,
  ease: [0.22, 1, 0.36, 1],
}} className="
            text-[14vw]
            font-black
            leading-none
            text-white/[0.04]
            tracking-[-0.08em]
            select-none
          "
        >
          CURRENT
        </motion.h2>

      </div>

      {/* Floating Texts */}

     {floatingTexts.map((item, index) => (

  <motion.div
    key={index}
    initial={{
      opacity: 0,
      y: 20,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 1.2,
      delay: index * 0.2,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
  scale: 1.08,
  y: -4,
}}
    className="absolute group cursor-pointer will-change-transform"
    style={item.position}
  >

    {/* Floating Heading */}

    <motion.p
      className="
        text-lime-100/45
        text-[25px]
        tracking-[0.18em]
        uppercase
        transition-all
        duration-500
        group-hover:text-lime-100
        group-hover:drop-shadow-[0_0_12px_rgba(190,242,100,0.25)]
      "
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {item.title}
    </motion.p>

    {/* Description Card */}

    <div
      className={`
  absolute
  w-[420px]
  rounded-2xl
  border
  border-white/10
  bg-black/70
  backdrop-blur-md
  p-7
  opacity-0
  translate-y-3
  transition-all
  duration-500
  pointer-events-none
  group-hover:opacity-100
  group-hover:translate-y-0
  shadow-[0_0_40px_rgba(190,242,100,0.06)]
  z-50

  ${
    index === 0
      ? "top-10 left-0"
      : index === 1
      ? "top-10 right-0"
      : index === 2
      ? "bottom-10 right-0"
      : "bottom-10 left-0"
  }
`}
    >
      <p className="text-gray-300 text-[20px] leading-relaxed">
        {item.description}
      </p>
    </div>

  </motion.div>

))}

      {/* Main Content */}

      <motion.div
        initial={{
  opacity: 0,
  y: 30,
}}

whileInView={{
  opacity: 1,
  y: 0,
}}

transition={{
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
}}
        className="
          relative
          z-10
          text-center
          max-w-4xl
          px-6
        "
      >

        <p
          className="
            uppercase
            tracking-[0.5em]
            text-lime-200
            mb-8
          "
        >
          CURRENT CHAPTER
        </p>

        <h3
          className="
            text-6xl
            md:text-8xl
            font-black
            leading-[0.95]
            mb-10
          "
        >
          Building
          <span className="block text-lime-200">
            Understanding
          </span>
        </h3>

        <motion.p
          initial={{
  opacity: 0,
}}

whileInView={{
  opacity: 1,
}}

transition={{
  duration: 1.6,
  delay: 0.4,
}}
          className="
            text-gray-300
            text-[25px]
            leading-relaxed
            max-w-2xl
            mx-auto
          "
        >
          Systems, Research, Experimentation and Interdisciplinary Exploration
        </motion.p>

      </motion.div>

    </section>
  );
}