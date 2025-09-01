'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState('');
  const fullText = "Data Analyst & Full Stack Developer";
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
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "4+", label: "Years Experience", icon: "🚀" },
    { value: "50+", label: "Projects Completed", icon: "✨" },
    { value: "$2M+", label: "Revenue Generated", icon: "💰" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#33658a]/20 to-[#28965a]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-[#e09f3e]/20 to-[#c6f91f]/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#c6f91f]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen items-center gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {currentText}
                  {isTyping && (
                    <span className="ml-2 inline-block h-8 w-1 animate-pulse bg-[#33658a] dark:bg-[#33658a]" />
                  )}
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 sm:text-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I build data-driven solutions that drive business growth. 
                Specializing in AI automation, analytics platforms, and scalable web applications.
              </motion.p>
            </div>
            
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#33658a] to-[#28965a] px-8 py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#28965a] to-[#e09f3e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              
              <Link
                href="/contact"
                className="group rounded-xl border-2 border-slate-300 px-8 py-3 text-center font-semibold text-slate-700 transition-all duration-300 hover:border-[#e09f3e] hover:bg-[#e09f3e]/5 hover:text-[#e09f3e] dark:border-slate-600 dark:text-slate-300 dark:hover:border-[#e09f3e] dark:hover:bg-[#e09f3e]/10 dark:hover:text-[#e09f3e]"
              >
                Work With Me
              </Link>
            </motion.div>
            
            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="group text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-2 text-2xl">{stat.icon}</div>
                  <div className="text-3xl font-bold text-[#33658a] dark:text-[#33658a]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Hero Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="aspect-square rounded-3xl bg-gradient-to-br from-[#33658a] via-[#28965a] to-[#e09f3e] p-8 shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex h-full flex-col items-center justify-center text-center text-white">
                  <motion.div
                    className="mb-6 text-8xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    📊
                  </motion.div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">Data-Driven Solutions</div>
                    <div className="text-sm opacity-90">AI • Analytics • Automation</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#28965a] to-[#c6f91f] p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white">🚀</div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#e09f3e] to-[#c6f91f] p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-white">✨</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
