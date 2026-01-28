"use client";

import React, { useState } from "react";
import { Plus, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const faqData = [
    {
        q: "How accurate are the AI responses?",
        a: "Extremely. By using Pinecone for semantic retrieval, we only feed the most relevant parts of your PDF to the LLM. This minimizes hallucinations and ensures every answer is grounded in your document's actual text."
    },
    {
        q: "Does it support scanned PDFs or images?",
        a: "Yes. Our Pro and Enterprise plans include OCR (Optical Character Recognition) processing, allowing you to chat with scanned documents and handwritten notes as easily as digital files."
    },
    {
        q: "Where is my data stored?",
        a: "Your files are stored in encrypted S3 buckets, and your document's mathematical 'fingerprints' are stored in private, isolated namespaces within Pinecone. We never share data between users."
    },
    {
        q: "Do you train your AI on my documents?",
        a: "No. We have a strict privacy policy. Your data is used only for your specific session. We do not use user-uploaded content to train or improve global LLM models."
    },
    {
        q: "Is there a limit on PDF length?",
        a: "Free users can process up to 100 pages. Pro users can upload documents up to 2,000 pages or 500MB. For larger sets, our Enterprise plan offers custom indexing."
    }
];

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                
                {/* Header Area */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                        Questions? <span className="text-neutral-400 font-medium italic">Answered.</span>
                    </h2>
                    <p className="text-neutral-500 text-lg">
                        Everything you need to know about ChatPDF.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqData.map((faq, idx) => {
                        const isOpen = activeIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={false}
                                className={`group rounded-[24px] border transition-all duration-300 ${
                                    isOpen 
                                    ? "bg-neutral-50 border-neutral-200 shadow-sm" 
                                    : "bg-white border-transparent hover:border-neutral-200"
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg md:text-xl font-semibold text-neutral-900 pr-8">
                                        {faq.q}
                                    </span>
                                    <div className={`relative flex items-center justify-center h-8 w-8 rounded-full border border-neutral-200 bg-white transition-transform duration-500 ${isOpen ? "rotate-[135deg] border-neutral-900 bg-black" : ""}`}>
                                        <Plus className={`h-4 w-4 transition-colors ${isOpen ? "text-white" : "text-neutral-600"}`} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="h-px bg-neutral-200 mb-6" />
                                                <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Support Footer */}
                <div className="mt-20 flex flex-col items-center justify-center p-12 rounded-[40px] bg-neutral-900 text-white text-center overflow-hidden relative">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-neutral-400 mb-8 max-w-md">
                        Our support team is online 24/7 to help you with your PDF workflows.
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 rounded-xl font-bold transition-all">
                        <Mail className="mr-2 h-4 w-4" /> Message Support
                    </Button>
                </div>
            </div>
        </section>
    );
}