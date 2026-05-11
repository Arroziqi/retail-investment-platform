"use client";

import { motion } from "framer-motion";
import { 
  UserCheck, 
  BarChart4, 
  Wallet, 
  LineChart, 
  ShieldAlert, 
  Layers 
} from "lucide-react";

const features = [
  {
    title: "KYC Onboarding",
    description: "Seamless, secure identity verification process to get you started in minutes.",
    icon: UserCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Risk Profiling",
    description: "Personalized assessment to tailor your investment strategy to your comfort level.",
    icon: ShieldAlert,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Portfolio Tracking",
    description: "Comprehensive view of all your holdings with real-time performance analytics.",
    icon: Wallet,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Market Insights",
    description: "Advanced charting and market data to help you make informed decisions.",
    icon: LineChart,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Mutual Funds",
    description: "Direct access to top-performing mutual funds with automated purchase flows.",
    icon: Layers,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Analytics",
    description: "Deep dive into your investment history and future wealth projections.",
    icon: BarChart4,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 max-w-[42rem] text-muted-foreground sm:text-lg">
            Our platform combines professional-grade tools with a user-friendly 
            interface to empower every investor.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl border border-border/50 bg-background p-8 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-marketing-brand transition-all group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
