import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronRight } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-32 pb-24 lg:pt-48 lg:pb-40">
            {/* Soft Radial Gradient for Depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-100/50 via-transparent to-transparent -z-10" />

            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
                
                {/* Badge: v2.0 */}
                <MotionWrapper delay={0.1}>
                    <div className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/50 px-4 py-1.5 text-sm font-medium transition-all hover:border-neutral-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                        </span>
                        <span className="text-neutral-900">v2.0 is now live</span>
                        <ChevronRight className="h-3 w-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </MotionWrapper>

                {/* Main Headline */}
                <MotionWrapper delay={0.2} className="mt-8 max-w-4xl">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black leading-[1.1] mb-6">
                        Your PDFs, <br />
                        <span className="bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-400 bg-clip-text text-transparent">
                            now conversational.
                        </span>
                    </h1>
                </MotionWrapper>

                {/* Sub-headline */}
                <MotionWrapper delay={0.3} className="max-w-2xl">
                    <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed">
                        Transform static documents into dynamic knowledge. Powered by high-speed vector search for precise, instant answers.
                    </p>
                </MotionWrapper>

                {/* CTAs */}
                <MotionWrapper delay={0.4} className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
                    <Link href="/signup" className="w-full sm:w-auto">
                        <Button 
                            size="lg" 
                            className="group relative w-full sm:w-auto h-14 px-10 overflow-hidden rounded-full bg-black text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-4 hover:ring-neutral-200/50 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-base font-semibold tracking-tight">
                                Get Started Free 
                                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            {/* Subtle Gradient Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </Link>
                    
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button 
                            variant="outline"
                            size="lg" 
                            className="w-full sm:w-auto h-14 px-10 rounded-full border-neutral-200 bg-white text-base font-semibold text-neutral-600 hover:text-black hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300 active:scale-95"
                        >
                            Live Demo
                        </Button>
                    </Link>
                </MotionWrapper>
            </div>
        </section>
    );
}