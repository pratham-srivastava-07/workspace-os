"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export { motion, AnimatePresence };
export const MotionNav = motion.nav;

export const FadeIn = ({ children, delay = 0, className }: { children: ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const GlassCard = ({ children, className }: { children: ReactNode, className?: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={cn("glass rounded-3xl p-6 transition-all duration-300", className)}
    >
        {children}
    </motion.div>
);

