import { FileTextIcon, ZapIcon, LockIcon, SearchIcon, SparklesIcon, MessageSquareIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const features = [
    {
        icon: FileTextIcon,
        title: "Instant Summaries",
        description: "Get concise summaries of long documents in seconds. Understand the core message without reading every page."
    },
    {
        icon: MessageSquareIcon,
        title: "Chat Naturally",
        description: "Ask questions as if you were talking to an expert. Our AI usage precise context from your PDF."
    },
    {
        icon: SearchIcon,
        title: "Deep Search",
        description: "Find specific information, data points, or references instantly. No more CTRL+F scrolling."
    },
    {
        icon: SparklesIcon,
        title: "Smart Citations",
        description: "Every answer includes citations linking back to the exact page and paragraph in your source document."
    },
    {
        icon: LockIcon,
        title: "Private & Secure",
        description: "Your documents are encrypted and processed securely. We never train our models on your private data."
    },
    {
        icon: ZapIcon,
        title: "Lightning Fast",
        description: "Experience zero latency. Our optimized pipeline processes even large PDFs faster than you can blink."
    }
];

export function Features() {
    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-200">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                        Capabilities
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Everything you need to master your documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, i) => (
                        <MotionWrapper key={i} delay={i * 0.1} className="group p-8 bg-white rounded-lg border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-black">{feature.title}</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
