"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Shield, Target } from "lucide-react";

const goals = [
  {
    title: "The Vision",
    description: "Creating an accessible, high-fidelity investment platform that bridges the gap between complex financial tools and beginner-friendly interfaces.",
    icon: Target,
  },
  {
    title: "Technical Excellence",
    description: "Built with Next.js 15, TypeScript, and Tailwind CSS. Featuring strict type safety, modular architecture, and a robust design system.",
    icon: Code2,
  },
  {
    title: "UX First",
    description: "Prioritizing mobile-first design, WCAG 2.1 AA accessibility, and smooth, meaningful animations to enhance user engagement.",
    icon: Layout,
  },
  {
    title: "Production Ready",
    description: "Utilizing MSW for reliable API mocking, Zustand for state management, and Storybook for comprehensive component documentation.",
    icon: Shield,
  },
];

export function ProjectContext() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Engineering for Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-[42rem] text-muted-foreground sm:text-lg"
          >
            This project serves as a showcase of modern frontend engineering practices, 
            focusing on scalability, maintainability, and exceptional user experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex flex-col items-start p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="p-3 rounded-xl bg-marketing-brand/10 text-marketing-brand mb-4">
                <goal.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-3xl bg-muted/50 border border-dashed border-border flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h4 className="text-lg font-semibold mb-2">A Note for Recruiters</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every component in this platform is documented in Storybook, tested with Vitest, 
              and follows a strict &quot;zero any&quot; TypeScript policy. The architecture is designed 
              to scale from a simple MVP to a complex financial ecosystem without sacrificing 
              performance or developer experience.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-marketing-brand">95+</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Lighthouse</span>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-marketing-brand">AA</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Compliance</span>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-marketing-brand">TS</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Strict</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
