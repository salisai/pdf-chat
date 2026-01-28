"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Zap, Shield, MessageSquare, Cloud, Users, 
  BarChart, Sparkles, Lock, Search, Timer, ArrowRight, CheckCircle2 
} from "lucide-react";

export default function FeaturesPage() {
  const mainFeatures = [
    { icon: MessageSquare, title: "Contextual Chat", desc: "Our AI doesn't just scan keywords; it understands the semantic relationships in your PDF." },
    { icon: Zap, title: "Instant Indexing", desc: "Large documents are vectorized and ready for chat in under 3 seconds using our optimized Pinecone pipeline." },
    { icon: Shield, title: "SOC2 Compliance", desc: "Enterprise-grade security is baked in. Your data is isolated and encrypted at rest." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* --- Hero Section --- */}
        <section className="pt-32 pb-20 bg-neutral-50/50 border-b border-neutral-100">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Capabilities</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
                Intelligence for your <span className="italic font-medium text-neutral-400">knowledge base.</span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed">
                We've built a suite of tools that transform static PDFs into dynamic, searchable, and collaborative assets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- Core Features: Asymmetric Layout --- */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {mainFeatures.map((f, i) => (
              <div key={i} className="group space-y-4 p-8 rounded-[32px] border border-transparent hover:border-neutral-200 hover:bg-neutral-50/50 transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg shadow-neutral-200 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black pt-4">{f.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Spotlight Feature: Semantic Search --- */}
        <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">
                  <Search className="h-3 w-3" /> Advanced Search
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Search by meaning, <br /> not just keywords.
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Powered by Pinecone vector indexes, our deep search understands nuances. 
                  Searching for "Financial health" will find sections about "Revenue growth" 
                  and "Profitability" automatically.
                </p>
                <ul className="space-y-4">
                  {['Cross-document querying', 'Semantic clustering', 'Multi-language support'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-neutral-300">
                      <CheckCircle2 className="h-5 w-5 text-white" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-[40px] border border-white/10 shadow-2xl flex items-center justify-center p-12">
                   {/* Simplified Vector Visual */}
                   <div className="w-full space-y-4">
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-white/20" />
                      </div>
                      <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                      <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- The Roadmap: Sleek Timeline --- */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold italic tracking-tight mb-2">The Roadmap</h2>
              <p className="text-neutral-500 font-medium uppercase text-xs tracking-[0.2em]">What's coming next</p>
            </div>
            
            <div className="relative border-l border-neutral-100 ml-4 space-y-12 pb-8">
              {[
                { title: "AI-Powered Insights", status: "Q1 2026", desc: "Automatic extraction of key metrics and sentiment analysis across entire folders." },
                { title: "Native Mobile Apps", status: "Q2 2026", desc: "Full-featured iOS and Android apps with offline PDF viewing capabilities." },
                { title: "Custom LLM Fine-tuning", status: "In Research", desc: "Train ChatPDF on your specific legal or medical jargon for 99.9% accuracy." }
              ].map((item, i) => (
                <div key={i} className="relative pl-10 group">
                  <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-200 border-2 border-white group-hover:bg-black transition-colors" />
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.status}</span>
                  <h4 className="text-xl font-bold text-black mt-1">{item.title}</h4>
                  <p className="text-neutral-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="pb-32 container mx-auto px-6">
          <div className="bg-neutral-50 rounded-[48px] p-12 md:p-24 text-center border border-neutral-100 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to unlock <br /> your documents?</h2>
              <Link href="/signup">
                <Button size="lg" className="h-14 px-10 rounded-full bg-black text-white hover:bg-neutral-800 text-base font-bold shadow-xl shadow-neutral-200">
                  Try for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}