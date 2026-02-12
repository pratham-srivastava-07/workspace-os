import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { memo } from "react";
import { GlassCard } from "../ui/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const PricingCard = memo(({ tier, price, features, highlight = false }: { tier: string, price: string, features: string[], highlight?: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <GlassCard className={cn("relative h-full flex flex-col gap-6 p-10 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-3xl cursor-pointer hover:bg-white/5 transition-colors", highlight && "border-indigo-500 ring-2 ring-indigo-500/20 shadow-2xl shadow-indigo-500/10 scale-105 z-10")}>
                {highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20">
                        Recommended
                    </span>
                )}
                <div className="text-center">
                    <h3 className="text-lg font-bold tracking-tight text-slate-500 mb-2 uppercase">{tier}</h3>
                    <div className="text-5xl font-black mb-4 flex items-end justify-center">
                        {price}
                        <span className="text-lg font-normal text-slate-400 ml-1 mb-1">/mo</span>
                    </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-4" />
                <ul className="flex flex-col gap-4 mb-10 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            </div>
                            {f}
                        </li>
                    ))}
                </ul>
                <Button variant={highlight ? "default" : "outline"} className={cn("w-full py-8 rounded-2xl text-lg font-bold transition-all", highlight ? "bg-indigo-600 hover:bg-indigo-700 shadow-xl" : "hover:bg-slate-50")}>
                    {tier === "Starter" ? "Start Free" : "Get Started"}
                </Button>
            </GlassCard>
        </motion.div>
    );
});

PricingCard.displayName = "PricingCard";