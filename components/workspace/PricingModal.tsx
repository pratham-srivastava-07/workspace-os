"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const plans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for individuals and side projects.",
        features: ["5 Workspaces", "10 Pipelines", "Basic Analytics", "Community Support"],
        icon: Zap,
        color: "slate",
        buttonText: "Current Plan",
        current: true,
    },
    {
        name: "Pro",
        price: "$19",
        description: "Advanced tools for power users and professionals.",
        features: ["Unlimited Workspaces", "Custom Pipelines", "Advanced AI Insights", "Priority Support", "Team Collaboration"],
        icon: Rocket,
        color: "indigo",
        buttonText: "Upgrade Now",
        current: false,
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Scaling with your organization's needs.",
        features: ["Everything in Pro", "SSO & SAML", "Unlimited Storage", "Dedicated Manager", "Custom Training"],
        icon: Shield,
        color: "purple",
        buttonText: "Contact Sales",
        current: false,
    },
];

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] sm:max-w-6xl rounded-3xl p-0 overflow-hidden glass border-white/20">
                <div className="max-h-[90vh] overflow-y-auto p-6 md:p-12 lg:p-16 scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
                    <DialogHeader className="text-center mb-6 md:mb-10">
                        <DialogTitle className="text-2xl md:text-3xl lg:text-4xl font-brand italic text-slate-900 mb-2">
                            Elevate your <span className="text-indigo-600">Workspace</span>
                        </DialogTitle>
                        <DialogDescription className="text-sm md:text-base lg:text-lg text-slate-500">
                            Choose the plan that's right for your productivity journey.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={cn(
                                    "relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center text-center group",
                                    plan.highlight
                                        ? "bg-white/40 border-indigo-200 shadow-xl shadow-indigo-500/10 scale-105 z-10"
                                        : "bg-white/20 border-white/20 hover:border-slate-300"
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold py-1 px-3 rounded-full tracking-widest uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <div className={cn(
                                    "p-3 rounded-2xl mb-4",
                                    plan.highlight ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"
                                )}>
                                    <plan.icon size={24} />
                                </div>

                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-3">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-sm text-slate-500">/mo</span>}
                                </div>
                                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="w-full space-y-3 mb-8 text-left">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-2 text-xs">
                                            <Check size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                                            <span className="text-slate-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className={cn(
                                        "w-full rounded-xl py-6 h-auto font-bold transition-all mt-auto",
                                        plan.highlight
                                            ? "bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/25"
                                            : plan.current
                                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
                                    )}
                                    disabled={plan.current}
                                >
                                    {plan.buttonText}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
