import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, UploadIcon } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-32 md:pb-48">
            <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                    v1.0 is now live
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl text-pretty">
                    Chat with your PDFs. <br className="hidden md:inline" />
                    <span className="text-muted-foreground">Understand instantly.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
                    Upload your documents and get answers in seconds. The most precise and elegant way to interact with your knowledge base.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <Link href="/signup">
                        <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                            Log In
                        </Button>
                    </Link>
                </div>

                {/* Abstract visual element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] opacity-10 bg-gradient-to-tr from-primary to-transparent blur-[100px] rounded-full pointer-events-none" />
            </div>
        </section>
    );
}
