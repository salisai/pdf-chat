import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                
                <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-90 transition-opacity">
                    <div className="rounded-md bg-primary p-1 text-primary-foreground">
                        <CopyIcon className="h-4 w-4" />
                    </div>
                    <span>ChatPDF</span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                </nav>
                
                <div className="flex items-center gap-2">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
