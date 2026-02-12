"use client";

import Footer from "./Footer";
import CTA from "./sections/CallToAction";
import PricingSection from "./sections/PricingSection";
import TrustedBySection from "./sections/TrustedBySection";
import FeatureSection from "./sections/FeatureSection";
import QuoteSection from "./sections/QuoteSection";
import HeroSection from "./sections/HeroSection";

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <HeroSection />

            {/* Trusted By Section */}
            <TrustedBySection />

            {/* Features Section */}
            <FeatureSection />

            {/* Quote / Social Proof Section */}
           <QuoteSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* Call to Action */}
            <CTA />

            {/* Footer */}
            <Footer />
        </div>
    );
}