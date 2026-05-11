"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import FloatingNavbar from "../components/FloatingNavbar";

import { motion } from "framer-motion";
import TurningPoints from "../components/TurningPoints";
import Projects from "../components/Projects";
import CurrentChapter from "../components/CurrentChapter";
import Vision from "../components/Vision";
import SystemsExploring from "../components/SystemsExploring";
export default function Home() {
const [showNavbar, setShowNavbar] = useState(false);
const [activeSection, setActiveSection] = useState("hero");
const [visible, setVisible] = useState(false);
  useEffect(() => {

  const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
  lerp: 0.08,
});

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // SHOW NAVBAR AFTER SCROLL
  const handleScroll = () => {

  setShowNavbar(window.scrollY > 500);

  const sections = [
    "hero",
    "timeline",
    "turning-points",
    "projects",
    "current-chapter",
    "vision",
  ];

  for (const section of sections) {

    const el = document.getElementById(section);

    if (!el) continue;

    const rect = el.getBoundingClientRect();

    if (rect.top <= 200 && rect.bottom >= 200) {
      setActiveSection(section);
    }

  }
};

  lenis.on("scroll", handleScroll);

  return () => {

    window.removeEventListener("scroll", handleScroll);

    lenis.destroy();
  };

}, []);

  return (
    <>
    <FloatingNavbar
  visible={visible}
  activeSection={activeSection}
  setActiveSection={setActiveSection}
/>
    <motion.main
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Hero />
      <Timeline />
      <TurningPoints />
      <Projects />
      <CurrentChapter />
      <SystemsExploring/>
      <Vision/>
    </motion.main>
    </>
  );
}