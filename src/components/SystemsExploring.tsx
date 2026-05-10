"use client";

import { motion } from "framer-motion";

const systems = [
  {
    title: "Data Pipelines",
    description:
      "Exploring how information flows through scalable systems — from ingestion and transformation to meaningful output.",
    tags: ["ETL", "Data Flow", "Scalability"],
  },
  {
    title: "Visualization Systems",
    description:
      "Interested in transforming complex datasets into intuitive and interactive digital experiences.",
    tags: ["Dashboards", "Interaction", "Storytelling"],
  },
  {
    title: "Intelligent Infrastructure",
    description:
      "Learning how modern systems combine automation, AI workflows, and structured architecture to support decision-making.",
    tags: ["AI Systems", "Automation", "Architecture"],
  },
  {
    title: "Network Thinking",
    description:
      "Fascinated by connected systems, relationships between data, and the hidden structures behind digital ecosystems.",
    tags: ["Graphs", "Systems", "Patterns"],
  },
];

export default function SystemsExploring() {
  return (
    <section
      id="systems-exploring"
      className="relative min-h-screen bg-black text-white py-40 px-6 overflow-hidden"
    >
      {/* background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-300/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[140px] rounded-full" />

      {/* giant background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[18vw] font-black tracking-[-0.08em] text-white/[0.03] select-none">
          SYSTEMS
        </h1>
      </div>

      {/* neural grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full
          bg-[linear-gradient(rgba(163,230,53,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.08)_1px,transparent_1px)]
          bg-[size:70px_70px]"
        />
      </div>

      {/* floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-lime-200/40"
            style={{
              width: "2px",
              height: "2px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-28"
        >
          <p className="uppercase tracking-[0.45em] text-lime-200 text-sm md:text-base mb-8">
  TURNING_POINTS.sol
</p>
<h2 className="text-5xl md:text-7xl font-black leading-[0.95] max-w-5xl">
  Systems I’m
  <span className="text-lime-200"> Exploring</span>
</h2>

          <p className="mt-10 text-white/60 text-lg md:text-xl leading-[1.9] max-w-3xl">
            Drawn toward the infrastructure behind intelligent digital
            experiences — exploring how data, systems, and interaction come
            together to shape modern technology.
          </p>
        </motion.div>

        {/* systems grid */}
        <div className="grid md:grid-cols-2 gap-10 relative">
          {systems.map((system, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[32px] border border-lime-200/10 bg-white/[0.02] backdrop-blur-sm p-10"
            >
              {/* glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_left,rgba(190,242,100,0.10),transparent_60%)]" />

              {/* top system line */}
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-lime-300 shadow-[0_0_20px_rgba(190,242,100,0.8)]" />

                  <div className="w-20 h-px bg-lime-200/20" />
                </div>

                <p className="text-white/30 text-xs tracking-[0.35em] uppercase">
                  0{index + 1}
                </p>
              </div>

                            {/* content */}
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-lime-200 transition-colors duration-500">
                  {system.title}
                </h3>

                <p className="text-white/60 leading-[1.9] text-lg mb-10">
                  {system.description}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-3">
                  {system.tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-5 py-2 rounded-full border border-white/10 text-sm text-white/70 group-hover:border-lime-200/20 transition-colors duration-500"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* corner glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-lime-200/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
