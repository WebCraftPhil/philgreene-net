'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

export default function HeroSection() {
  const [currentText, setCurrentText] = useState('');
  const fullText =
    'Phil Greene — Building creative tools, designs, and systems that pay for themselves.';
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-secondary/20 to-accent-green/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-accent-orange/20 to-accent-lime/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 md:h-2 md:w-2 rounded-full bg-accent-lime/40"
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
        {/* Asymmetric grid: visual left, text right on desktop; stacked on mobile */}
        <div className="grid min-h-screen items-center gap-8 lg:gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Hero Content */}
          <motion.div
            className="space-y-6 md:space-y-8 order-2 lg:order-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                className="text-3xl font-bold tracking-tight font-display text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {currentText}
                  {isTyping && (
                    <span className="ml-2 inline-block h-6 w-1 md:h-8 md:w-1 animate-pulse bg-secondary" />
                  )}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg leading-relaxed text-foreground/70 sm:text-xl md:text-2xl max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Creative commerce, smart contracts, and AI automation — built to be beautiful, useful, and profitable.
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
                onClick={() => trackEvent('book_call')}
                className="btn-primary text-sm md:text-base"
              >
                <span className="relative z-10">Work with me</span>
              </Link>

              <Link
                href="/projects"
                className="group rounded-xl border-2 border-border px-6 py-3 md:px-8 md:py-3 text-center font-semibold text-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary/10 hover:text-secondary text-sm md:text-base underline-grow"
              >
                See My Work
              </Link>
            </motion.div>

            <motion.div
              className="pt-6 md:pt-8 space-y-2 text-center text-sm text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p>Who I work with: creators, small businesses, and startups.</p>
              <p>Built with Next.js, Tailwind, and Vercel.</p>
            </motion.div>
          </motion.div>

          {/* Enhanced Hero Visual - left-aligned card, staggered accents */}
          <motion.div
            className="relative order-1 lg:order-1 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex justify-start lg:justify-start">
              {/* Main Card - Professional Portrait Style */}
              <motion.div
                className="aspect-square w-64 md:w-80 lg:w-96 rounded-2xl md:rounded-3xl bg-gradient-to-br from-secondary via-accent-green to-accent-orange p-6 md:p-8 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Portrait Placeholder - Replace with your actual photo */}
                <div className="relative h-full w-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  
                  {/* Portrait Circle */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Placeholder for your photo - replace with <img> tag */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
                      <motion.div
                        className="text-4xl md:text-5xl lg:text-6xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        👨‍💻
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Tech Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-white text-sm">⚡</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    animate={{ y: [0, 8, 0], rotate: [360, 180, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <span className="text-white text-sm">🚀</span>
                  </motion.div>
                  
                  {/* Bottom Text */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-white text-sm md:text-base font-semibold">
                      Phil Greene
                    </div>
                    <div className="text-white/80 text-xs md:text-sm">
                      Creator Automation Expert
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Staggered Accent Cards */}
              <motion.div
                className="absolute -top-4 -right-6 md:-top-6 md:-right-8 h-12 w-12 md:h-16 md:w-16 rounded-xl bg-gradient-to-br from-accent-green to-accent-lime p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-white text-sm md:text-base">✨</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-4 md:-bottom-6 md:-left-8 h-12 w-12 md:h-16 md:w-16 rounded-xl bg-gradient-to-br from-accent-orange to-accent-lime p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <div className="text-white text-sm md:text-base">⚙️</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="divider-fractal" />
    </section>
  );
}
