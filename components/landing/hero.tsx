import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-48 md:pb-32">
            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-10">
                <MotionWrapper delay={0.1}>
                    <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-50 hover:text-black">
                        <span className="flex h-2 w-2 rounded-full bg-black mr-2"></span>
                        <span className="text-neutral-600">v2.0 is now live</span>
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.2} className="max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black text-pretty leading-tight">
                        Chat with your PDFs. <br className="hidden md:inline" />
                        <span className="text-neutral-400">Understand instantly.</span>
                    </h1>
                </MotionWrapper>

                <MotionWrapper delay={0.3} className="max-w-2xl">
                    <p className="text-lg md:text-xl text-neutral-600 text-pretty leading-relaxed">
                        Upload your documents and get answers in seconds. The most precise and elegant way to interact with your knowledge base.
                    </p>
                </MotionWrapper>

                <MotionWrapper delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link href="/signup" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-medium shadow-sm hover:translate-y-[-1px] transition-all">
                            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-medium bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm">
                            Log In
                        </Button>
                    </Link>
                </MotionWrapper>
            </div>
        </section>
    );
}
