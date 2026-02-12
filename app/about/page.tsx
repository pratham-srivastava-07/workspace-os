"use client";

import { FadeIn, GlassCard } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* <Navbar session={null} /> */}

            <main className="max-w-7xl mx-auto px-6 py-20">
                {/* Hero Section */}
                <section className="text-center mb-32">
                    <FadeIn>
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-950/30 rounded-full">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-7xl font-brand italic mb-8 bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-400 dark:to-white bg-clip-text text-transparent">
                            Reimagining the Workspace.
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-12">
                            Workspace OS was born from a simple idea: that your digital environment should be as elegant as it is powerful. We build tools that fade into the background, so your focus stays on what matters.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 h-14 text-lg">
                                <Link href="/auth/signup">Join the Future</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg backdrop-blur-xl bg-white/10">
                                View Features
                            </Button>
                        </div>
                    </FadeIn>
                </section>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <FadeIn delay={0.1}>
                        <GlassCard className="p-10 h-full border-none bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/10">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-8">
                                <Zap className="text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Velocity</h3>
                            <p className="text-slate-500 leading-relaxed">
                                We believe in tools that move at the speed of thought. Zero friction, instant feedback, and seamless transitions between tasks.
                            </p>
                        </GlassCard>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <GlassCard className="p-10 h-full border-none bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-900 dark:to-purple-950/10">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-8">
                                <Shield className="text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Privacy</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Your workspace is your sanctuary. We build with end-to-end security and privacy-first principles in mind.
                            </p>
                        </GlassCard>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <GlassCard className="p-10 h-full border-none bg-gradient-to-br from-white to-pink-50/30 dark:from-slate-900 dark:to-pink-950/10">
                            <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/50 rounded-2xl flex items-center justify-center mb-8">
                                <Heart className="text-pink-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Elegance</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Beyond utility, we care about the soul of the interface. Every pixel is crafted to bring a sense of calm and clarity.
                            </p>
                        </GlassCard>
                    </FadeIn>
                </div>

                {/* Vision Section */}
                <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 text-white p-12 md:p-24 mb-32">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/20 blur-[120px] -mr-32" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-brand italic mb-8">Guided by Simplicity.</h2>
                        <p className="text-xl text-slate-300 leading-relaxed mb-12">
                            The future of work isn&apos;t about more tabs or more notifications. It&apos;s about a unified interface that understands your workflow and stays out of your way.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800" />
                                ))}
                            </div>
                            <p className="text-slate-400 text-sm font-medium">Joined by 10k+ innovators</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Ready to revolutionize your workflow?</h2>
                        <Button asChild size="lg" className="rounded-full px-12 bg-white text-slate-900 hover:bg-slate-100 h-14 font-bold">
                            <Link href="/auth/signup">Get Started Now</Link>
                        </Button>
                    </div>
                </FadeIn>
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-500 text-sm">© 2026 Workspace OS. Crafted with heart.</p>
                    <div className="flex gap-8">
                        <Link href="/terms" className="text-sm text-slate-500 hover:text-indigo-500">Terms</Link>
                        <Link href="/privacy" className="text-sm text-slate-500 hover:text-indigo-500">Privacy</Link>
                        <Link href="https://x.com/_pratham_rs" className="text-sm text-slate-500 hover:text-indigo-500">Twitter</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
