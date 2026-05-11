"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:top-[-20%]">
        <svg viewBox="0 0 1108 632" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 h-full w-full opacity-20">
          <path d="M1107.5 631.5L0.5 0.5" stroke="url(#paint0_linear)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="paint0_linear" x1="1107.5" y1="631.5" x2="0.5" y2="0.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--marketing-brand)" />
              <stop offset="1" stopColor="var(--marketing-accent)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-marketing-brand/20 bg-marketing-brand/5 px-3 py-1 text-sm font-medium text-marketing-brand"
          >
            <Zap className="mr-2 h-3.5 w-3.5" />
            <span>Next-gen Investment Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Invest with <span className="bg-gradient-to-r from-marketing-brand to-marketing-accent bg-clip-text text-transparent">Confidence</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl"
          >
            A high-fidelity retail investment platform designed for clarity, 
            security, and performance. Manage your portfolio, assess risks, 
            and grow your wealth with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base bg-marketing-brand hover:bg-marketing-brand/90 shadow-lg shadow-marketing-brand/20">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#preview">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-marketing-brand/20 hover:bg-marketing-brand/5">
                Live Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">SEC Regulated</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Real-time Data</span>
            </div>
            <div className="hidden flex-col items-center gap-2 md:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Instant Execution</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
