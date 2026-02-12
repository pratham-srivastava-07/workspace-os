"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { MotionNav, motion, AnimatePresence } from '@/components/ui/motion';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';

import { Session } from 'next-auth';

export default function Navbar({ session }: { session: Session | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: "/" },
        { name: 'Demo', href: '/demo' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'About', href: '/about' },
    ];

    return (
        <MotionNav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 w-full glass border-b border-white/10 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="font-brand italic text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-indigo-500 fill-indigo-500/20" />
                    Workspace OS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-500 hover:text-indigo-500 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-sm font-bold text-indigo-500">
                                Dashboard
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut()}
                                className="rounded-full text-slate-500 hover:text-slate-900"
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth/signin" className="text-sm font-medium text-slate-500 hover:text-indigo-500">
                                Sign In
                            </Link>
                            <Button asChild size="sm" className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
                                <Link href="/auth/signup">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </Link>
                            ))}
                            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
                            {session ? (
                                <div className="flex flex-col gap-4">
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-indigo-500">
                                        Go to Dashboard
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl py-6"
                                        onClick={() => signOut()}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">
                                        Sign In
                                    </Link>
                                    <Button asChild className="w-full rounded-2xl py-6 bg-indigo-600">
                                        <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>Get Started Free</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionNav>
    );
}

