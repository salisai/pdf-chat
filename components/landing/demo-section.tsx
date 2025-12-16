"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileTextIcon, SendIcon, SparklesIcon } from "lucide-react";

export function DemoSection() {
    const [typedText, setTypedText] = useState("");
    const fullText = "Summarize the key findings of this research paper.";

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Main Interface Window */}
                    <div className="rounded-xl border border-neutral-200 bg-white shadow-2xl overflow-hidden flex h-[600px] md:h-[700px]">

                        {/* Sidebar / PDF Viewer (Left) */}
                        <div className="hidden md:flex w-1/2 bg-neutral-50/50 border-r border-neutral-200 flex-col relative p-8 items-center justify-center">
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 opacity-80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400 opacity-80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400 opacity-80"></div>
                            </div>

                            {/* PDF Thumbnail Placeholder */}
                            <div className="w-3/4 aspect-[3/4] bg-white border border-neutral-200 shadow-sm rounded-sm p-8 flex flex-col gap-4">
                                <div className="h-4 w-3/4 bg-neutral-100 rounded-sm"></div>
                                <div className="h-4 w-1/2 bg-neutral-100 rounded-sm"></div>
                                <div className="space-y-2 mt-8">
                                    <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                                    <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                                    <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                                    <div className="h-2 w-5/6 bg-neutral-100 rounded-sm"></div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                                    <div className="h-2 w-full bg-neutral-100 rounded-sm"></div>
                                    <div className="h-2 w-4/6 bg-neutral-100 rounded-sm"></div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Interface (Right) */}
                        <div className="w-full md:w-1/2 flex flex-col bg-white">
                            {/* Messages Area */}
                            <div className="flex-1 p-6 space-y-6 flex flex-col justify-end">
                                {/* AI Welcoming Message */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                                        <SparklesIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-neutral-50 border border-neutral-100 p-4 rounded-lg rounded-tl-none text-neutral-700 text-sm leading-relaxed max-w-[90%]">
                                        <p>I've analyzed the document. I can help you summarize key points, answer questions, or extract specific data. What would you like to know?</p>
                                    </div>
                                </div>

                                {/* User Message (Typing Animation) */}
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-medium text-neutral-600">U</span>
                                    </div>
                                    <div className="bg-black p-4 rounded-lg rounded-tr-none text-white text-sm leading-relaxed max-w-[90%] shadow-sm">
                                        <p>
                                            {typedText}
                                            <span className="animate-pulse">|</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-neutral-100 bg-white">
                                <div className="relative">
                                    <input
                                        disabled
                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                        placeholder="Ask a question..."
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black rounded-md">
                                        <SendIcon className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
