"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Code2, 
  Palette, 
  Boxes, 
  Zap, 
  BookOpen, 
  LayoutTemplate, 
  TestTube2 
} from "lucide-react";

const techs = [
  { 
    name: "Next.js 15", 
    category: "Framework", 
    icon: Globe,
    description: "App Router, Server Components, and optimized rendering for maximum performance."
  },
  { 
    name: "TypeScript", 
    category: "Language", 
    icon: Code2,
    description: "Strictly typed codebase with zero-any policy ensuring runtime stability and developer confidence."
  },
  { 
    name: "Tailwind CSS", 
    category: "Styling", 
    icon: Palette,
    description: "Utility-first CSS for rapid development and consistent, highly-performant design tokens."
  },
  { 
    name: "Zustand", 
    category: "State", 
    icon: Boxes,
    description: "Lightweight, scalable state management for handling portfolio and user session data."
  },
  { 
    name: "React Query", 
    category: "Data", 
    icon: Zap,
    description: "Powerful data fetching and caching layer for real-time investment data synchronization."
  },
  { 
    name: "Storybook 8", 
    category: "Documentation", 
    icon: BookOpen,
    description: "Isolated component development and live documentation of the underlying design system."
  },
  { 
    name: "Shadcn UI", 
    category: "UI System", 
    icon: LayoutTemplate,
    description: "Highly accessible, customizable component primitives built on Radix UI."
  },
  { 
    name: "Vitest & Playwright", 
    category: "Testing", 
    icon: TestTube2,
    description: "Comprehensive unit and E2E testing strategy for critical financial user flows."
  },
];

export function TechStack() {
  return (
    <section className="bg-muted/30 py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            The Engine Behind the Platform
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-[42rem] text-muted-foreground sm:text-lg"
          >
            A carefully selected suite of modern technologies, chosen for 
            their performance, reliability, and developer experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative flex flex-col items-start p-6 rounded-2xl border bg-background hover:border-marketing-brand/30 hover:shadow-md transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-marketing-brand/10 group-hover:text-marketing-brand transition-colors mb-4">
                <tech.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {tech.category}
                </span>
                <h3 className="text-lg font-bold">{tech.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
