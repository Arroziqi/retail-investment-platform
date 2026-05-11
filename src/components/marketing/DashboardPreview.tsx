"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DashboardPreview() {
  return (
    <section id="preview" className="bg-muted/30 py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Powerful Analytics at Your Fingertips
          </h2>
          <p className="mt-4 max-w-[42rem] text-muted-foreground sm:text-lg">
            Experience the full potential of your investment data with our 
            intuitive dashboard. Real-time updates, advanced charting, and 
            comprehensive portfolio insights.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/50 bg-background shadow-2xl"
        >
          <div className="flex h-10 items-center gap-1.5 border-b bg-muted/50 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
            <div className="ml-4 h-4 w-1/3 rounded bg-muted-foreground/10" />
          </div>
          <Image
            src="/dashboard-preview.png"
            alt="Retail Investment Dashboard Preview"
            width={1200}
            height={800}
            className="w-full"
            priority
            unoptimized
          />
          {/* Overlay to blend with site branding if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
