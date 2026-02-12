import { PricingCard } from "../PricingCard";

export default function PricingSection() {
    return <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-2xl mx-auto">
                <h2 className="text-5xl font-brand italic mb-6">Scalable Plans</h2>
                <p className="text-slate-500 text-lg">Start small, grow big. Our pricing is as flexible as our workspace.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <PricingCard
                    tier="Starter"
                    price="$0"
                    features={["3 Connected Modules", "Personal Dashboard", "7-day History", "Cloud Sync"]}
                />
                <PricingCard
                    tier="Professional"
                    price="$14"
                    features={["Unlimited Modules", "Advanced Analytics", "30-day History", "Priority Support", "AI Assistant"]}
                    highlight
                />
                <PricingCard
                    tier="Organization"
                    price="$39"
                    features={["Admin Console", "Shared Workspaces", "SSO & SAML", "Dedicated Rep", "Unlimited History"]}
                />
            </div>
        </div>
    </section>
}

PricingCard.displayName = "PricingCard";