"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const visionNodes = [
  {
    title: "Data & Society",
    description:
      "Exploring how information systems, education data, and geopolitical signals influence human decisions, institutions, and public understanding.",
    position: {
      top: "20%",
      left: "18%",
    },
  },

  {
    title: "Human Integration",
    description:
      "Investigating how technology and intelligent systems can support humanitarian initiatives, accessibility, healthcare, and community-driven impact.",
    position: {
      top: "12%",
      left: "52%",
    },
  },

  {
    title: "Sustainable Ideas",
    description:
      "Designing systems and products that prioritize long-term value, adaptability, sustainability, and meaningful real-world utility.",
    position: {
      top: "28%",
      right: "12%",
    },
  },

  {
    title: "Quant Thinking",
    description:
      "Applying quantitative reasoning, statistical thinking, and computational models to better understand patterns, decisions, and complex systems.",
    position: {
      bottom: "20%",
      left: "18%",
    },
  },

  {
    title: "Clean Pipelines",
    description:
      "Building scalable workflows and structured deployment pipelines focused on clarity, maintainability, automation, and efficient system design.",
    position: {
      bottom: "18%",
      right: "12%",
    },
  },
];
const connectionLines = [
  "rotate-[145deg] w-[420px]",
  "-rotate-[145deg] w-[420px]",
  "rotate-[35deg] w-[420px]",
  "-rotate-[35deg] w-[420px]",
  "rotate-0 w-[320px]",
];
export default function Vision() {

  const [activeNode, setActiveNode] = useState(0);

  return (

    <section
      id="vision"
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

      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-lime-300/10 blur-[140px]" />
        <div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.05),transparent_70%)]
    pointer-events-none
  "
/>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-400/10 blur-[140px]" />
        <div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.05),transparent_70%)]
    pointer-events-none
  "
/>
      {/* Massive Background Word */}

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
        <div
  className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.05),transparent_70%)]
    pointer-events-none
  "
/>
        <h2
          className="
            text-[22vw]
            font-black
            leading-none
            text-lime-100/[0.04]
            tracking-[-0.08em]
            select-none
          "
        >
          VISION
        </h2>

      </div>

      {/* Connection Lines */}


      {/* Center Core */}

      <motion.div
      animate={{
  scale:1,
}}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
  duration: 0.6,
}}
        className="
          relative
          z-20
          w-[360px]
          h-[360px]
          rounded-full
          border
          border-lime-300/50
          bg-black/40
          backdrop-blur-xl
          flex
          items-center
          justify-center
          text-center
          shadow-[0_0_50px_rgba(190,242,100,0.10)]
        "
      >

        <div>

          <p
            className="
              uppercase
              tracking-[0.45em]
              text-lime-200
              text-xs
              mb-4
            "
          >
            CORE VISION
          </p>

          <h3
            className="
              text-6xl
              font-black
              leading-tight
            "
          >
            Exploring
            <span className="block text-lime-200">
              Intelligent Systems
            </span>
          </h3>

        </div>

      </motion.div>
        {/* Neural Web Connections */}

<svg
  style={{
    filter: "blur(0.3px)",
  }}
  className="
    absolute
    inset-0
    w-full
    h-full
    pointer-events-none
    z-10
  "
>
  {[...Array(40)].map((_, i) => (
  <line
    key={i}
    x1={`${Math.random() * 100}%`}
    y1={`${Math.random() * 100}%`}
    x2={`${Math.random() * 100}%`}
    y2={`${Math.random() * 100}%`}
    stroke="rgba(190,242,100,0.06)"
    strokeWidth="0.4"
  />
))}
  {/* AI Systems */}

  <motion.line
    x1="50%"
    y1="50%"
    x2="18%"
    y2="28%"
    stroke="rgba(190,242,100,0.10)"
    strokeWidth="0.6"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      pathLength: {
        duration: 1.5,
      },
      opacity: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  />

  {/* Storytelling */}

  <motion.line
    x1="50%"
    y1="50%"
    x2="82%"
    y2="35%"
    stroke="rgba(190,242,100,0.18)"
    strokeWidth="0.6"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      pathLength: {
        duration: 1.7,
      },
      opacity: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  />

  {/* Interaction */}

  <motion.line
    x1="50%"
    y1="50%"
    x2="18%"
    y2="70%"
    stroke="rgba(190,242,100,0.18)"
    strokeWidth="0.6"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      pathLength: {
        duration: 1.9,
      },
      opacity: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  />

  {/* Immersion */}

  <motion.line
    x1="50%"
    y1="50%"
    x2="82%"
    y2="72%"
    stroke="rgba(190,242,100,0.14)"
    strokeWidth="0.6"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: [0.04, 0.12, 0.04],
    }}
    transition={{
      pathLength: {
        duration: 2.1,
      },
      opacity: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  />

  {/* Human Creativity */}

  <motion.line
    x1="50%"
    y1="50%"
    x2="50%"
    y2="18%"
    stroke="rgba(190,242,100,0.22)"
    strokeWidth="0.6"
    initial={{
      pathLength: 0,
      opacity: 0,
    }}
    animate={{
      pathLength: 1,
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      pathLength: {
        duration: 1.6,
      },
      opacity: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  />

</svg>


      {/* Vision Nodes */}

      {visionNodes.map((node, index) => (

        <motion.button
          key={index}
          onClick={() => setActiveNode(index)}
          whileHover={{
            scale: 1.02,
          }}
          animate={{
  scale: activeNode === index ? 1.04 : 1,
  opacity: activeNode === index ? 1 : 0.75,
}}
          transition={{
  scale: {
    duration: 0.4,
  },
  opacity: {
    duration: 0.4,
  },
}}
          className="
            absolute
            z-30
            group
            will-change-transform
          "
          style={node.position}
        >

          <div
            className="
              w-[190px]
h-[190px]
              rounded-full
              border
              border-lime-300/45
              bg-black/70
              backdrop-blur-lg
              flex
              items-center
              justify-center
              text-center
              transition-all
              duration-500
              border-lime-200/20
              shadow-[0_0_40px_rgba(190,242,100,0.08)]
group-hover:shadow-[0_0_80px_rgba(190,242,100,0.18)]
            "
          >

            <p
              className="
                text-[20px]
                uppercase
                tracking-[0.22em]
                text-lime-100/90
                px-2
              "
            >
              {node.title}
            </p>

          </div>

        </motion.button>

      ))}

      {/* Description Panel */}

      <motion.div
        key={activeNode}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          absolute
          bottom-16
          max-w-2xl
          rounded-3xl
          border
          border-lime-100/15
          bg-black/60
          backdrop-blur-xl
          px-8
          py-6
          z-40
          shadow-[0_0_120px_rgba(190,242,100,0.18)]
        "
      >

        <p
          className="
            text-lime-200
            uppercase
            tracking-[0.35em]
            text-sm
            mb-4
          "
        >
          {visionNodes[activeNode].title}
        </p>

        <p
          className="
            text-gray-300
            text-lg
            leading-relaxed
          "
        >
          {visionNodes[activeNode].description}
        </p>

      </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(120)].map((_, i) => (
    <motion.div
  key={i}
  className="absolute rounded-full bg-lime-200/40"
  animate={{
    y: [0, -12, 0],
    x: [0, 6, 0],
    opacity: [0.2, 0.8, 0.2],
    scale: [1, 1.8, 1],
  }}
  transition={{
    duration: 4 + i * 0.3,
    repeat: Infinity,
    ease: "easeInOut",
    delay: i * 0.15,
  }}
  style={{
    width: "4px",
    height: "4px",
    left: `${(i * 13) % 100}%`,
    top: `${(i * 17) % 100}%`,
    filter: "blur(0.5px)",
  }}
/>
  ))}
</div>
    </section>
    
  );
}