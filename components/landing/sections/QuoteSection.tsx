import { Zap } from "lucide-react";

export default function QuoteSection() {
    return <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="flex justify-center mb-8">
                {[1, 2, 3, 4, 5].map(i => <Zap key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />)}
            </div>
            <blockquote className="text-3xl md:text-5xl font-brand italic mb-12 leading-tight">
                &quot;Workspace OS didn&apos;t just organize my tools; it organized my mind. It&apos;s the first application that actually stays out of the way while empowering my work.&quot;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800" />
                <div className="text-left">
                    <p className="font-bold">Pratham Srivastava</p>
                    <p className="text-slate-500 text-sm">Lead Architect, Jupiter Systems</p>
                </div>
            </div>
        </div>
    </section>
}