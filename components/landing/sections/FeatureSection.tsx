"use client";

import { CheckCircle2, ChevronRight, Layout, Users, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import FeatureCard from "../FeatureCard";

export default function FeatureSection() {
    return <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl md:text-6xl font-brand italic mb-6 leading-tight">Built for Deep <br /> Flow States.</h2>
                            <p className="text-lg text-slate-500 leading-relaxed">Stop context switching. Workspace OS brings your entire toolchain into a single, cohesive environment designed for focus.</p>
                        </div>
                        <Link href="/features" className="text-indigo-500 font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2">
                            Explore full feature set <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Layout className="w-7 h-7 text-indigo-500" />}
                            title="Infinite Canvas"
                            description="Arrange your work in any layout. Modular panels that snap, dock, and float exactly how you want them."
                            tag="Modular"
                        />
                        <FeatureCard
                            icon={<Zap className="w-7 h-7 text-yellow-500" />}
                            title="Instant Sync"
                            description="Zero lag. Every change is reflected across your team and devices in less than 50 milliseconds."
                            tag="Real-time"
                        />
                        <FeatureCard
                            icon={<Workflow className="w-7 h-7 text-emerald-500" />}
                            title="Auto Orchestration"
                            description="Let AI handle your file tagging, organization, and workflow scheduling while you focus on creation."
                            tag="AI-Powered"
                        />
                        <FeatureCard
                            icon={<Users className="w-7 h-7 text-pink-500" />}
                            title="Team Pulse"
                            description="See who is working on what in real-time without the distraction of constant meetings or chat."
                            tag="Collaboration"
                        />
                        <FeatureCard
                            icon={<CheckCircle2 className="w-7 h-7 text-blue-500" />}
                            title="Project Health"
                            description="Visual heatmaps and complexity analysis for every project in your unified dashboard."
                            tag="Analytics"
                        />
                        <FeatureCard
                            icon={<Layout className="w-7 h-7 text-purple-500" />}
                            title="Enterprise Security"
                            description="Bank-grade encryption for all your notes and workflow data. You own your data, full stop."
                            tag="Security"
                        />
                    </div>
                </div>
            </section>
}