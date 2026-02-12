"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function HeroSection() {
    return <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto text-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 mb-8 shadow-sm"
            >
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">v2.0 Beta Now Live</span>
            </motion.div>

            <FadeIn>
                <h1 className="text-7xl md:text-9xl font-brand italic mb-8 leading-[0.9] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent pb-4">
                    Workflow <br className="hidden md:block" /> Reimagined.
                </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                    The all-in-one workspace designed to think like you do.
                    Modular, intelligent, and breathtakingly fast.
                </p>
            </FadeIn>

            <FadeIn delay={0.4}>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105" asChild>
                        <Link href="/auth/signup">Get Started Free</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all font-medium" asChild>
                        <Link href="/demo">Watch Protocol</Link>
                    </Button>
                </div>
            </FadeIn>

            {/* Dashboard Preview Mockup */}
            <FadeIn delay={0.6} className="mt-20 relative">
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10" />
                <div className="rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 shadow-2xl bg-white/10 dark:bg-slate-900/10 backdrop-blur-md p-4 max-w-5xl mx-auto">
                    <div className="rounded-2xl overflow-hidden aspect-video bg-slate-950 flex items-center justify-center group relative cursor-pointer">
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                            alt="Dashboard Preview"
                            width={1200}
                            height={675}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition duration-500 shadow-2xl">
                                <Zap className="w-8 h-8 fill-white" />
                            </div>
                            <span className="mt-4 text-sm font-bold tracking-widest text-white/50">INTERACTIVE PREVIEW</span>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
}