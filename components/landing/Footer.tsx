"use client";

import Link from "next/link";

export default function Footer() {
    return <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
                    <div className="font-brand italic text-xl text-slate-900 dark:text-white">Workspace OS</div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    <div>© 2026 Workspace OS. All rights reserved.</div>
                </div>
            </footer>
}