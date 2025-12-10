import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircleIcon, HeartIcon, LightbulbIcon, ZapIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              About ChatPDF
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're building the simplest way to interact with your documents.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that understanding information should be instant and effortless. ChatPDF transforms how you interact with documents by making every PDF searchable, understandable, and actionable.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Why We Built This
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Reading through lengthy PDFs to find specific information is tedious. We created ChatPDF to eliminate that friction. Now, ask your documents anything and get precise answers in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <LightbulbIcon className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Simplicity</h3>
                  <p className="text-muted-foreground">
                    We remove complexity so you can focus on what matters.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ZapIcon className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Speed</h3>
                  <p className="text-muted-foreground">
                    Get answers instantly, not hours or days later.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Accuracy</h3>
                  <p className="text-muted-foreground">
                    Precise results you can trust and rely on.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <HeartIcon className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Trust</h3>
                  <p className="text-muted-foreground">
                    Your documents stay private and secure with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ready to chat with your PDFs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start for free and experience the difference.
            </p>
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
