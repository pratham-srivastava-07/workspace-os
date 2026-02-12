"use client";

import { motion } from "framer-motion";
import { FadeIn, GlassCard } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import {
    Zap,
    Layers,
    Plus,
    Layout,
    Workflow,
    ChevronRight,
    Sparkles,
    Monitor,
    MousePointer2
} from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <main className="max-w-7xl mx-auto px-6 py-20">
                {/* Hero Section */}
                <section className="text-center mb-32">
                    <FadeIn>
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-950/30 rounded-full">
                            Guided Tour
                        </span>
                        <h1 className="text-5xl md:text-7xl font-brand italic mb-8 bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-400 dark:to-white bg-clip-text text-transparent">
                            Master Your Workspace.
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-12">
                            Workspace OS is designed for power and simplicity. Follow this guide to unlock the full potential of your unified digital environment.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 h-14 text-lg">
                                <Link href="/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </section>

                {/* Instruction Steps */}
                <div className="space-y-32 mb-32">
                    {/* Step 1: Quick Create */}
                    <FadeIn>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <GlassCard className="aspect-video relative overflow-hidden flex items-center justify-center p-0 border-none bg-slate-900 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                                    <div className="relative group cursor-pointer p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 transition-transform">
                                        <Plus className="text-white w-12 h-12" />
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <div className="h-2 w-32 bg-white/20 rounded-full ml-4" />
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center mb-6">
                                    <Zap className="text-indigo-600" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">1. Instant Creation</h2>
                                <p className="text-slate-500 leading-relaxed mb-6">
                                    Stop jumping through menus. Click the <strong>Quick Create</strong> button on your dashboard to instantly add a Task, Note, or Bookmark without leaving your current view.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <ChevronRight className="w-4 h-4 text-indigo-500" /> Add tasks to stay on track
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <ChevronRight className="w-4 h-4 text-indigo-500" /> Capture thoughts with quick notes
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <ChevronRight className="w-4 h-4 text-indigo-500" /> Save references with bookmarks
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Step 2: Modular Widgets */}
                    <FadeIn delay={0.2}>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6">
                                    <Layout className="text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">2. Modular Control</h2>
                                <p className="text-slate-500 leading-relaxed mb-6">
                                    Your dashboard is yours to command. Visit the <strong>Manage Widgets</strong> panel to toggle different views on or off. Workspace OS adapts to the way YOU work.
                                </p>
                                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <div className="w-10 h-6 bg-indigo-600 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                    <span className="text-sm font-medium">Enable Pipelines View</span>
                                </div>
                            </div>
                            <div>
                                <GlassCard className="aspect-video relative overflow-hidden flex items-center justify-center p-0 border-none bg-indigo-600 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-purple-700" />
                                    <div className="grid grid-cols-2 gap-4 p-8 w-full">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-16 bg-white/10 rounded-xl border border-white/20 animate-pulse" />
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Step 3: Deep Work Modules */}
                    <FadeIn delay={0.4}>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <GlassCard className="aspect-video relative overflow-hidden flex items-center justify-center p-0 border-none bg-slate-900 shadow-2xl">
                                    <div className="flex gap-4 p-6 w-full h-full">
                                        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4">
                                            <div className="h-2 w-12 bg-indigo-500 rounded-full mb-4" />
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full bg-white/10 rounded-full" />
                                                <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4">
                                            <div className="h-2 w-12 bg-emerald-500 rounded-full mb-4" />
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full bg-white/10 rounded-full" />
                                                <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-6">
                                    <Workflow className="text-purple-600" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">3. Deep Flow Modules</h2>
                                <p className="text-slate-500 leading-relaxed mb-6">
                                    Beyond the dashboard, explore full-screen modules for **Tasks**, **Notes**, and **Pipelines**. Each is architected for deep focus and efficient data management.
                                </p>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-bold text-slate-500">DRAG & DROP</div>
                                    <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-bold text-slate-500">AUTO-SAVE</div>
                                    <div className="px-3 py-1 bg-indigo-500/10 rounded-md text-xs font-bold text-indigo-500">PRO READY</div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Final Call to Action */}
                <FadeIn>
                    <GlassCard className="text-center p-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <h2 className="text-4xl font-brand italic mb-6 relative z-10">Start Your Journey.</h2>
                        <p className="text-indigo-100 mb-10 max-w-xl mx-auto relative z-10">
                            Ready to experience the next generation of digital workspaces? Jump back into your dashboard and start building.
                        </p>
                        <Button asChild size="lg" className="rounded-full px-12 bg-white text-indigo-600 hover:bg-slate-100 h-14 font-bold relative z-10 shadow-xl">
                            <Link href="/dashboard">Enter Workspace</Link>
                        </Button>
                    </GlassCard>
                </FadeIn>
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <p className="text-slate-500 text-sm">© 2026 Workspace OS. The guide to modern work.</p>
                    <div className="flex gap-8">
                        <Link href="/" className="text-sm text-slate-500 hover:text-indigo-500 underline underline-offset-4">Return Home</Link>
                        <Link href="/about" className="text-sm text-slate-500 hover:text-indigo-500">About Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
