import { FileTextIcon, ZapIcon, LockIcon, SearchIcon, SparklesIcon, MessageSquareIcon } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const features = [
    {
        icon: MessageSquareIcon,
        title: "Chat Naturally",
        description: "Ask questions as if you were talking to an expert. Our AI uses Pinecone-powered vector search to pull precise context.",
        className: "md:col-span-2", // Highlight this feature
    },
    {
        icon: SparklesIcon,
        title: "Smart Citations",
        description: "Every answer includes clickable citations linking to the exact paragraph in your source document.",
        className: "md:col-span-1",
    },
    {
        icon: FileTextIcon,
        title: "Instant Summaries",
        description: "Get concise summaries of long documents in seconds. Understand the core message instantly.",
        className: "md:col-span-1",
    },
    {
        icon: SearchIcon,
        title: "Deep Semantic Search",
        description: "Find information based on meaning, not just keywords. No more CTRL+F frustration.",
        className: "md:col-span-1",
    },
    {
        icon: LockIcon,
        title: "Enterprise Security",
        description: "Your data is SOC2 compliant and encrypted. We never train our models on your private PDFs.",
        className: "md:col-span-1",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
            
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="flex flex-col items-start mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                        Master your knowledge.
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed">
                        Built for researchers, students, and professionals who need to extract value from documents at the speed of thought.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {features.map((feature, i) => (
                        <MotionWrapper 
                            key={i} 
                            delay={i * 0.1} 
                            className={`group relative p-8 bg-neutral-50/50 rounded-3xl border border-neutral-200/60 overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${feature.className}`}
                        >
                            {/* Icon with soft glow */}
                            <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <feature.icon className="w-5 h-5 text-black" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 text-neutral-900 group-hover:text-black transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-500 group-hover:text-neutral-600 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative background flare */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neutral-200/20 rounded-full blur-3xl group-hover:bg-blue-100/30 transition-colors duration-500" />
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}