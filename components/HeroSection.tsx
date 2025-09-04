"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../lib/analytics";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState("");
  const fullText = "I build modern web experiences that drive results.";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 40); // Faster typing speed

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden hidden md:block opacity-50">
        <motion.div
          className="absolute -top-80 -right-80 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-primary/10 to-accent-green/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-80 -left-80 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-accent-orange/10 to-accent-lime/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent-lime/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <motion.div
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {currentText}
                  {isTyping && (
                    <span className="ml-2 inline-block h-8 w-1 animate-pulse bg-primary" />
                  )}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                From sleek landing pages to complex web applications, I bring your vision to life with clean code and great user experiences.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-3 sm:gap-4 md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/contact"
                onClick={() => trackEvent("start_project_call")}
                className="btn-primary"
              >
                Start a Project
              </Link>

              <Link
                href="/projects"
                className="btn-secondary"
              >
                Explore My Work
              </Link>
            </motion.div>

            <motion.div
              className="pt-6 md:pt-8 space-y-2 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p>Specializing in React, Next.js, and Tailwind CSS.</p>
            </motion.div>
          </motion.div>

          {/* Enhanced Hero Visual */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex justify-center lg:justify-end">
              <motion.div
                className="aspect-square w-64 md:w-80 lg:w-96 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-accent-green p-1 shadow-2xl"
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl md:rounded-2xl bg-background/80 backdrop-blur-sm">
                  <motion.div
                    className="text-6xl md:text-8xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🚀
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
