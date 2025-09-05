'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '../lib/analytics';
import Image from 'next/image';

export default function HeroSectionWithPhoto() {
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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background Elements */}
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
            ease: 'linear',
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
            ease: 'linear',
          }}
        />
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
                Achieved 10x Etsy revenue growth — see{' '}
                <Link href="/projects/etsy-analytics" className="underline">
                  case study
                </Link>{' '}
                — and launched AI-powered SaaS prototypes to drive growth and
                cut busywork.
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
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#33658a] to-[#28965a] px-6 py-3 md:px-8 md:py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm md:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33658a]"
              >
                <span className="relative z-10">Book a 20-min Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#28965a] to-[#e09f3e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/projects"
                className="group rounded-xl border-2 border-slate-300 px-6 py-3 md:px-8 md:py-3 text-center font-semibold text-slate-700 transition-all duration-300 hover:border-[#e09f3e] hover:bg-[#e09f3e]/5 hover:text-[#e09f3e] dark:border-slate-600 dark:text-slate-300 dark:hover:border-[#e09f3e] dark:hover:bg-[#e09f3e]/10 dark:hover:text-[#e09f3e] text-sm md:text-base"
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

          {/* Professional Portrait Visual */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex justify-center lg:justify-end">
              {/* Main Portrait Card */}
              <motion.div
                className="aspect-square w-64 md:w-80 lg:w-96 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#33658a] via-[#28965a] to-[#e09f3e] p-6 md:p-8 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative h-full w-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  
                  {/* Portrait Circle */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl overflow-hidden"
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
                    {/* Replace this with your actual photo */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
                      {/* 
                        TO ADD YOUR PHOTO:
                        1. Put your photo in /public/images/phil-portrait.jpg
                        2. Replace the div below with:
                        
                        <Image
                          src="/images/phil-portrait.jpg"
                          alt="Phil Greene"
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-full"
                        />
                      */}
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

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#28965a] to-[#c6f91f] p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-white text-sm md:text-base">📱</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#e09f3e] to-[#c6f91f] p-3 md:p-4 shadow-lg hidden md:block"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
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
