"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {useState,useEffect} from "react";
const smoothEase = [0.22, 1, 0.36, 1];
const timelineData = [
  {
    date: "03/2019",
    title: "The Foundation",
    images: [
  "/images/timeline/biztech.jpeg",
  "/images/timeline/exebit.jpeg",
  "/images/timeline/intramun.jpeg",
],
    description:
      "Served as Vice President while simultaneously leading multiple student-driven initiatives across academics, innovation, and public engagement. \nDirected the Commerce Club, contributed to the MUN Secretariat, and led the School Innovation Council: building strong foundations in leadership, organization, and collaborative problem-solving. \nAlongside academics, actively participated in hackathons, public speaking events, and idea-driven competitions that sparked an early interest in technology, systems, and creative thinking.",
  },
  {
    date: "08/2020",
    title: "The Exploration",
    images: [
  "/images/timeline/bhumi.jpg",
  "/images/timeline/debate.jpeg",
  "/images/timeline/linguaero.jpeg",
],
    description:
      "Entered college with a growing interest in technology, digital systems, and emerging ecosystems. Became part of the MUNSoc society and the Web3 Club, exploring communication, decentralized technologies, and collaborative innovation. Alongside campus involvement, contributed to volunteering initiatives with a student-data-focused NGO, gaining exposure to real-world impact, research-driven thinking, and community-centered work.",
  },
  {
    date: "02/2022",
    title: "Building Forward",
    images: [
  "/images/timeline/unvotes.jpeg",
  "/images/timeline/aquahero.png",
  "/images/timeline/image.png",
],
    description:
      "Currently focused on building immersive digital experiences that combine technology, storytelling, and human interaction. Exploring the intersection of design, systems thinking, and emerging technologies through projects, experimentation, and creative development. Driven by curiosity, adaptability, and a long-term vision to create experiences that feel intelligent, cinematic, and deeply engaging.",
  },
];
export default function Timeline() {
    const containerRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
});

const backgroundY = useTransform(
  scrollYProgress,
  [0, 1],
  [-100, 100]
);
const [activeImages, setActiveImages] = useState(
    timelineData.map(() => 0)
  )
  useEffect(() => {
  const interval = setInterval(() => {
    setActiveImages((prev) =>
      prev.map((value, index) => {
        const total = timelineData[index].images.length
        return (value + 1) % total
      })
    )
  }, 3000)

  return () => clearInterval(interval)
}, [])
  return (
    <section ref={containerRef}id="timeline" className="relative bg-black text-white py-40 px-6 overflow-hidden">
      {/* Interactive Grid Background */}

<motion.div
  style={{
    y: backgroundY,
  }}
  className="absolute inset-0 opacity-[0.04]"
>

  <div
    className="
      w-full h-[200%]
      bg-[linear-gradient(rgba(163,230,53,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.08)_1px,transparent_1px)]
      bg-[size:80px_80px]
    "
  />

</motion.div>
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-green-400/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lime-200/10 blur-3xl rounded-full" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-32">

        <p className="uppercase tracking-[0.5em] text-yellow-100 text-lg md:text-xl mb-8">
          TIMELINE
        </p>

        <h2 className="text-5xl md:text-7xl font-black">
          <>
        The <span className="text-lime-200">Journey</span> So Far
</>
        </h2>

      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        

          {timelineData.map((item, index) => (

            <motion.div
  key={index}
  initial={
  index === 0
    ? false
    : { opacity: 0, y: 40 }
}
  whileInView={
  index === 0
    ? undefined
    : { opacity: 1, y: 0 }
}
  transition={{
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
}}
  viewport={{ once: true }}
  className="relative grid md:grid-cols-[80px_1fr_1fr] gap-12 items-center"
>

  {/* Timeline Dot */}
  <div className="relative flex justify-center">

  {/* Vertical Line */}
  <motion.div className="absolute top-[-120px] bottom-[-120px] w-[3px] bg-gradient-to-b from-lime-200/20 via-white/10 to-lime-200/20" 
  animate={{
  y: [0, -6, 0],
  opacity: [0.7, 1, 0.7],
}}

transition={{
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut",
}}/>

  {/* Timeline Node */}
  <div className="relative w-6 h-6 rounded-full bg-lime-200 shadow-[0_0_40px_rgba(163,230,53,0.8)] z-20" />

</div>

    {/* Hover Glow */}
    <motion.div
  whileHover={{
    y: -4,
  }}
  className={`relative bg-[#050505]/90 border border-white/5 rounded-[28px] p-10 min-h-[460px] flex flex-col justify-center transition duration-500 hover:border-lime-200/20 ${
    index % 2 === 0 ? "md:mr-10" : "md:order-3 md:ml-10"
  }`}
>

  <div className="relative z-10">

    <p className="text-lime-100 text-sm tracking-[0.3em] uppercase mb-4">
      {item.date}
    </p>

    {/* Timeline Accent */}
    <div className="w-16 h-[2px] bg-lime-200/40 mb-8" />

    <h3 className="text-4xl leading-snug font-bold mb-8">
      {item.title}
    </h3>

    <p className="text-gray-400 text-lg leading-loose">
      {item.description}
    </p>

  </div>

</motion.div>



  {/* RIGHT IMAGE */}
  <motion.div
  initial={{
    opacity: 0.5,
    scale: 0.92,
    filter: "brightness(0.5)",
  }}
  whileInView={{
    opacity: 1,
    scale: 1,
    filter: "brightness(1)",
  }}
  transition={{
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
  viewport={{ once: false, amount: 0.4 }}
  whileHover={{
    scale: 1.02,
  }}
  className={`relative overflow-hidden rounded-[28px] ${
    index % 2 === 0 ? "md:ml-20" : "md:order-1 md:mr-20"
  }`}
>

  <div className="relative w-full h-[420px] overflow-hidden rounded-[28px] border border-lime-200/10">

  {item.images.map((img, imgIndex) => (
    <motion.img
      key={imgIndex}
      src={img}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0 }}
      animate={{
        opacity: activeImages[index] === imgIndex ? 1 : 0,
        scale: activeImages[index] === imgIndex ? 1 : 1.06,
      }}
      transition={{
        duration: 1.4,
        ease: "easeInOut",
      }}
    />
  ))}

  {/* cinematic overlays */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

  <div className="absolute inset-0 bg-lime-200/[0.03]" />

  {/* image indicators */}
  <div className="absolute bottom-6 left-6 flex gap-2 z-20">
    {item.images.map((_, dotIndex) => (
      <div
        key={dotIndex}
        className={`h-1 rounded-full transition-all duration-500 ${
          activeImages[index] === dotIndex
            ? "w-8 bg-lime-300"
            : "w-3 bg-white/30"
        }`}
      />
    ))}
  </div>

</div>
  {/* Cinematic Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

</motion.div>

</motion.div>

          ))}

        </div>


    </section>
  );
}