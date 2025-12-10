import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQ } from "@/components/landing/faq";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals",
      price: "$0",
      period: "forever",
      features: [
        "Up to 3 documents",
        "Basic chat features",
        "1 GB storage",
        "Community support",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Professional",
      description: "For regular users",
      price: "$9",
      period: "per month",
      features: [
        "Unlimited documents",
        "Advanced chat features",
        "50 GB storage",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "Custom",
      period: "contact sales",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "Team collaboration",
        "Dedicated support",
        "Custom security",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      highlighted: false,
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Choose the plan that fits your needs. No hidden fees. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                    plan.highlighted
                      ? "md:scale-105 border-2 border-primary shadow-2xl"
                      : "border border-border hover:border-border/80 shadow-sm hover:shadow-lg"
                  }`}
                >
                  {/* Background Gradient */}
                  {plan.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                  )}

                  {plan.highlighted && (
                    <div className="relative bg-primary text-primary-foreground px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                        </span>
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="relative flex flex-col flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-border/50">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {plan.period}
                        </span>
                      </div>
                      {plan.price !== "Custom" && (
                        <p className="text-xs text-muted-foreground">
                          Billed {plan.period === "forever" ? "once" : "monthly"}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            <CheckIcon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-sm text-foreground leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href="/signup" className="w-full">
                      <Button
                        variant={plan.highlighted ? "default" : "outline"}
                        className={`w-full h-11 font-semibold transition-all ${
                          plan.highlighted
                            ? "hover:shadow-lg hover:scale-105"
                            : "hover:bg-muted"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <FAQ
              items={[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
                },
                {
                  question: "Is there a free trial for Professional?",
                  answer:
                    "Yes, you get 14 days free to try Professional. No credit card required.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
                },
                {
                  question: "Can I get a refund?",
                  answer:
                    "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your purchase.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Absolutely. We use enterprise-grade encryption and comply with GDPR and SOC 2 standards. Your documents are encrypted at rest and in transit.",
                },
                {
                  question: "Do you offer team collaboration?",
                  answer:
                    "Team collaboration is available on the Professional plan and above. You can invite teammates and manage permissions from your dashboard.",
                },
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Start your free plan today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No credit card required. Get instant access to ChatPDF.
            </p>
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
