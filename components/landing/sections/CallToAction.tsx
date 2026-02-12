"use client";

import Link from "next/link";
import { Button } from "../../ui/button";

export default function CTA() {
    return <section className="py-32 px-6 mb-20 relative">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-indigo-600 p-12 md:p-24 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 -z-10" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <h2 className="text-5xl md:text-7xl font-brand italic mb-8 leading-tight">Build the Future of <br /> Your Process.</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">Join 15,000+ creators and engineers building the next generation of digital workflows.</p>

            <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-12 py-8 text-xl font-bold transition-all hover:scale-110 shadow-xl" asChild>
                    <Link href="/auth/signup">Get Started Now</Link>
                </Button>
            </div>
        </div>
    </section>
}