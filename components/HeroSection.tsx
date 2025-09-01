'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState('');
  const fullText = "I build automation and analytics tools that help creators earn more with less work";
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
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "1000%", label: "Etsy Growth", icon: "📈" },
    { value: "3", label: "SaaS Launches", icon: "🚀" },
    { value: "80%", label: "Time Saved", icon: "⚡" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
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

      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 md:h-2 md:w-2 rounded-full bg-[#c6f91f]/40"
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
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {currentText}
                  {isTyping && (
                    <span className="ml-2 inline-block h-6 w-1 md:h-8 md:w-1 animate-pulse bg-[#33658a] dark:bg-[#33658a]" />
                  )}
                </span>
              </motion.h1>
              
              <motion.p
                className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl md:text-2xl max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                From scaling Etsy revenue by 1000% in a year to launching AI-powered SaaS prototypes, 
                I create systems that drive growth and cut busywork.
              </motion.p>
            </div>
            
            <motion.div
              className="flex flex-col gap-3 sm:gap-4 md:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#33658a] to-[#28965a] px-6 py-3 md:px-8 md:py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm md:text-base"
              >
                <span className="relative z-10">👉 Let&apos;s Build Something</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#28965a] to-[#e09f3e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              
              <Link
                href="/projects"
                className="group rounded-xl border-2 border-slate-300 px-6 py-3 md:px-8 md:py-3 text-center font-semibold text-slate-700 transition-all duration-300 hover:border-[#e09f3e] hover:bg-[#e09f3e]/5 hover:text-[#e09f3e] dark:border-slate-600 dark:text-slate-300 dark:hover:border-[#e09f3e] dark:hover:bg-[#e09f3e]/10 dark:hover:text-[#e09f3e] text-sm md:text-base"
              >
                See My Work
              </Link>
            </motion.div>
            
            {/* Enhanced Stats - Responsive grid */}
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8"
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
                  <div className="mb-2 text-xl md:text-2xl">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-[#33658a] dark:text-[#33658a]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Hero Visual - Mobile optimized */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Card - Responsive sizing */}
              <motion.div
                className="aspect-square w-64 md:w-80 lg:w-96 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#33658a] via-[#28965a] to-[#e09f3e] p-6 md:p-8 shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex h-full flex-col items-center justify-center text-center text-white">
                  <motion.div
                    className="mb-4 md:mb-6 text-6xl md:text-8xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🤖
                  </motion.div>
                  <div className="space-y-2">
                    <div className="text-xl md:text-2xl font-bold">Creator Automation</div>
                    <div className="text-xs md:text-sm opacity-90">Social Media • E-commerce • AI Tools</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements - Hidden on mobile for cleaner look */}
              <motion.div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#28965a] to-[#c6f91f] p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white text-sm md:text-base">📱</div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#e09f3e] to-[#c6f91f] p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-white text-sm md:text-base">💰</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
