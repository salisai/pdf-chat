"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Heart, Lightbulb, Zap, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* --- Hero Section: The Vision --- */}
        <section className="pt-32 pb-20 border-b border-neutral-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black leading-[0.9]">
                We turn data <br /> 
                <span className="text-neutral-300 italic font-medium">into dialogue.</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
                ChatPDF was born from a simple frustration: static documents shouldn't be a barrier to fast decision-making. 
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- Stats: The Scale --- */}
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Pages Analyzed", value: "50M+" },
                { label: "Questions Asked", value: "120M+" },
                { label: "User Trust", value: "99.9%" },
                { label: "Global Users", value: "2M+" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Narrative Section: The Philosophy --- */}
        <section className="py-32 container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <h2 className="text-3xl font-bold italic tracking-tight leading-snug">
              "The future of knowledge isn't about storing information—it's about how fast you can recall and apply it."
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                In 2024, we realized that while AI was getting smarter, our interaction with our own private data remained stuck in the 90s. We were still scrolling, searching, and skimming.
              </p>
              <p>
                By combining <strong>Advanced Vector Retrieval (RAG)</strong> with the world's most powerful LLMs, we built ChatPDF to act as a second brain. A brain that never forgets a footnote and always cites its sources.
              </p>
            </div>
          </div>
        </section>

        {/* --- Values: The Bento Grid --- */}
        <section className="py-24 bg-neutral-900 rounded-[48px] mx-4 mb-24 overflow-hidden text-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Built on solid ground.</h2>
              <p className="text-neutral-400">The core principles that guide every line of code we write.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck className="h-8 w-8 text-white mb-6" />
                <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Your data is yours. We isolate every document in private vector namespaces and never train on your content.</p>
              </div>

              {/* Value 2 (Double Width) */}
              <div className="md:col-span-2 p-8 rounded-[32px] bg-white text-black relative overflow-hidden group">
                <Globe className="absolute -right-10 -bottom-10 h-64 w-64 text-neutral-100 group-hover:text-neutral-200 transition-colors duration-700" />
                <div className="relative z-10">
                    <Zap className="h-8 w-8 text-black mb-6" />
                    <h3 className="text-2xl font-bold mb-3">Speed of Thought</h3>
                    <p className="text-neutral-600 leading-relaxed max-w-md">We optimize for low latency. From the moment you drop a PDF to your first answer, our pipeline is tuned for sub-second responses.</p>
                </div>
              </div>

              {/* Value 3 (Double Width) */}
              <div className="md:col-span-2 p-8 rounded-[32px] bg-neutral-800 border border-white/5 relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <CheckCircle2 className="h-8 w-8 text-white mb-6" />
                    <div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Uncompromising Accuracy</h3>
                        <p className="text-neutral-400 leading-relaxed max-w-lg">Hallucinations are the enemy. Every response generated by our system is backed by a verified citation from your source text.</p>
                    </div>
                </div>
              </div>

              {/* Value 4 */}
              <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Heart className="h-8 w-8 text-white mb-6" />
                <h3 className="text-xl font-bold mb-3">User Centric</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">We don't build features for the sake of it. We listen to our researchers, students, and legal pros to build what matters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="py-32 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Join the 2 million <br /> professionals using ChatPDF.</h2>
            <Link href="/signup">
                <Button size="lg" className="h-14 px-10 rounded-full bg-black text-white hover:bg-neutral-800 text-base font-bold shadow-xl shadow-neutral-200">
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}