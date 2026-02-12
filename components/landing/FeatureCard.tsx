import { motion } from "framer-motion";
import { GlassCard } from "../ui/motion";
    

export default function FeatureCard({ icon, title, description, tag }: { icon: React.ReactNode, title: string, description: string, tag?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard className="flex flex-col gap-5 p-8 h-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 group hover:border-indigo-500/50 transition-colors duration-500">
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-500/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-all duration-500">
                        <div className="group-hover:text-white transition-colors duration-500">
                            {icon}
                        </div>
                    </div>
                    {tag && (
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-all duration-500">
                            {tag}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-2xl font-brand italic mb-3 group-hover:text-indigo-500 transition-colors duration-500">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
            </GlassCard>
        </motion.div>
    );
}