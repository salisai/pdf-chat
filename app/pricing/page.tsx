"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/landing/faq";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "For individuals exploring AI document analysis.",
      features: ["3 Documents per month", "20 Questions per day", "10MB File size limit", "Standard Latency"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$12",
      description: "For power users and researchers needing speed.",
      features: ["Unlimited Documents", "Unlimited Questions", "500MB File size limit", "Priority Vector Processing", "Smart Citations", "Early Access to v3.0"],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for teams and organizations.",
      features: ["Dedicated Pinecone Index", "Custom LLM Fine-tuning", "SSO & SAML Auth", "White-glove Onboarding", "Dedicated Support Engine"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="container mx-auto px-6 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Ready to work <span className="text-neutral-400 font-medium italic">faster?</span>
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Transparent pricing designed for everyone—from students to global enterprises.
            </p>
          </motion.div>
        </section>

        {/* Pricing Cards Container */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 rounded-[32px] border transition-all duration-300 ${
                  plan.highlighted 
                  ? "bg-neutral-900 text-white border-neutral-800 shadow-2xl scale-105 z-10" 
                  : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-300"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-neutral-200 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 fill-black" /> Recommended
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className={`text-sm ${plan.highlighted ? "text-neutral-400" : "text-neutral-500"}`}>/month</span>
                    )}
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${plan.highlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${plan.highlighted ? "bg-white/10" : "bg-black/5"}`}>
                        <Check className={`h-3 w-3 ${plan.highlighted ? "text-white" : "text-black"}`} />
                      </div>
                      <span className={`text-sm font-medium ${plan.highlighted ? "text-neutral-300" : "text-neutral-600"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={plan.price === "Custom" ? "mailto:sales@chatpdf.com" : "/signup"}>
                  <Button 
                    className={`w-full h-12 rounded-2xl text-sm font-bold transition-transform active:scale-95 ${
                      plan.highlighted 
                      ? "bg-white text-black hover:bg-neutral-100" 
                      : "bg-black text-white hover:bg-neutral-800 shadow-lg shadow-neutral-200"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section with Clean Design */}
        <FAQ/>
      </main>

      <Footer />
    </div>
  );
}