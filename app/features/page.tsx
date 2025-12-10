import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ZapIcon,
  ShieldIcon,
  FileTextIcon,
  MessageCircleIcon,
  BarChartIcon,
  SparklesIcon,
  LockIcon,
  CloudIcon,
  Users2Icon,
  SearchIcon,
  TimerIcon,
} from "lucide-react";

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: MessageCircleIcon,
      title: "Chat with PDFs",
      description:
        "Ask questions about your documents and get instant answers. Our AI understands context and provides precise responses.",
    },
    {
      icon: ZapIcon,
      title: "Lightning Fast",
      description:
        "Get answers in seconds. Our optimized infrastructure ensures zero lag and blazing-fast performance.",
    },
    {
      icon: ShieldIcon,
      title: "Enterprise Security",
      description:
        "Bank-level encryption protects your documents. GDPR compliant and fully HIPAA certified.",
    },
    {
      icon: CloudIcon,
      title: "Cloud Storage",
      description:
        "Store unlimited documents with automatic backup. Access your files anywhere, anytime.",
    },
    {
      icon: Users2Icon,
      title: "Team Collaboration",
      description:
        "Share documents with teammates and collaborate in real-time. Role-based permissions for control.",
    },
    {
      icon: BarChartIcon,
      title: "Analytics & Insights",
      description:
        "Track usage patterns and document interactions. Get valuable insights from your data.",
    },
  ];

  const advancedFeatures = [
    {
      icon: SearchIcon,
      title: "Advanced Search",
      description: "Full-text search across all your documents with smart filtering and sorting options.",
    },
    {
      icon: SparklesIcon,
      title: "Smart Summarization",
      description: "Auto-summarize documents in seconds. Extract key points and insights instantly.",
    },
    {
      icon: TimerIcon,
      title: "Version History",
      description: "Track changes and restore previous versions. Full audit trail for compliance.",
    },
    {
      icon: FileTextIcon,
      title: "Multi-Format Support",
      description: "Works with PDF, DOCX, PPT, and more. Universal document support.",
    },
    {
      icon: LockIcon,
      title: "Access Control",
      description: "Fine-grained permissions. Share with specific people or make documents public.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Powerful Features for Your Documents
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Everything you need to chat with, understand, and manage your PDFs efficiently.
            </p>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {mainFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="group p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:bg-muted/30">
                      <div className="mb-4 h-12 w-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Divider Section */}
        <section className="py-12 bg-muted/20 border-t border-b">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
              Advanced Capabilities
            </p>
          </div>
        </section>

        {/* Advanced Features Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              Advanced Features
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advancedFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="group p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:bg-muted/30">
                      <div className="mb-4 h-12 w-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 md:py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              Why Choose ChatPDF?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <ZapIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get answers in seconds instead of hours of manual reading.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <ShieldIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your documents never leave your account. Military-grade encryption.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users2Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Easy Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborate with your team with granular permission controls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Timeline / Roadmap Preview */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              Coming Soon
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-lg border border-border/50 hover:border-border transition-colors">
                <div className="h-3 w-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">AI-Powered Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic extraction of key metrics, entities, and sentiment analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-lg border border-border/50 hover:border-border transition-colors">
                <div className="h-3 w-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Custom Models</h3>
                  <p className="text-sm text-muted-foreground">
                    Fine-tune AI models on your specific use cases and domains.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-lg border border-border/50 hover:border-border transition-colors">
                <div className="h-3 w-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Mobile Apps</h3>
                  <p className="text-sm text-muted-foreground">
                    Native iOS and Android apps for on-the-go document access.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-lg border border-border/50 hover:border-border transition-colors">
                <div className="h-3 w-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Advanced OCR</h3>
                  <p className="text-sm text-muted-foreground">
                    Extract text from scanned documents and images with 99% accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Experience All Features Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start free and explore every feature. No credit card required.
            </p>
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
