import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
