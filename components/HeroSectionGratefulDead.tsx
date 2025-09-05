'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

export default function HeroSectionGratefulDead() {
  const [currentText, setCurrentText] = useState('');
  const fullText =
    'I build automation and analytics tools that help creators earn more with less work';
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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Psychedelic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-red-500/30 to-yellow-500/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-green-500/30 to-blue-500/30 blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Dancing Bears */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🐻
          </motion.div>
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
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block">
                  {currentText}
                  {isTyping && (
                    <span className="ml-2 inline-block h-6 w-1 md:h-8 md:w-1 animate-pulse bg-yellow-400" />
                  )}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg leading-relaxed text-blue-100 sm:text-xl md:text-2xl max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                &ldquo;What a long, strange trip it&apos;s been&rdquo; — from Etsy scaling to AI automation, 
                I help creators turn their wildest ideas into profitable reality.
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
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 px-6 py-3 md:px-8 md:py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm md:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <span className="relative z-10">Let&apos;s Jam Together</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/projects"
                className="group rounded-xl border-2 border-white/30 px-6 py-3 md:px-8 md:py-3 text-center font-semibold text-white transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400 text-sm md:text-base"
              >
                See My Journey
              </Link>
            </motion.div>

            <motion.div
              className="pt-6 md:pt-8 space-y-2 text-center text-sm text-blue-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p>Building the future, one automation at a time.</p>
              <p>⚡ Built with Next.js, Tailwind, and good vibes.</p>
            </motion.div>
          </motion.div>

          {/* Grateful Dead Style Visual */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Lightning Bolt Card */}
              <motion.div
                className="aspect-square w-64 md:w-80 lg:w-96 rounded-2xl md:rounded-3xl bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 p-6 md:p-8 shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-full flex-col items-center justify-center text-center text-white">
                  <motion.div
                    className="mb-4 md:mb-6 text-6xl md:text-8xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ⚡
                  </motion.div>
                  <div className="space-y-2">
                    <div className="text-xl md:text-2xl font-bold">
                      Creator Automation
                    </div>
                    <div className="text-xs md:text-sm opacity-90">
                      What a long, strange trip it&apos;s been
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-white text-sm md:text-base">🎸</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, 10, 0], rotate: [360, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <div className="text-white text-sm md:text-base">🌹</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
