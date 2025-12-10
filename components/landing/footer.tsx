import Link from "next/link";
import { CopyIcon, TwitterIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Security", href: "#" },
            { label: "Roadmap", href: "#" },
        ],
        company: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#" },
        ],
        legal: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "GDPR", href: "#" },
        ],
        resources: [
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Support", href: "#" },
            { label: "Community", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: TwitterIcon, href: "#", label: "Twitter" },
        { icon: GithubIcon, href: "#", label: "GitHub" },
        { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
        { icon: MailIcon, href: "#", label: "Email" },
    ];

    return (
        <footer className="border-t bg-background">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                {/* Top Section - Brand and Description */}
                <div className="grid md:grid-cols-5 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4 hover:opacity-80 transition-opacity">
                            <div className="rounded-md bg-primary p-1.5 text-primary-foreground">
                                <CopyIcon className="h-4 w-4" />
                            </div>
                            <span>ChatPDF</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            Chat with your PDFs. Understand instantly. The simplest way to interact with your documents.
                        </p>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="font-semibold text-foreground text-sm mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground text-sm mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground text-sm mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground text-sm mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator />

                {/* Bottom Section - Copyright and Social */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <p>© {currentYear} ChatPDF. All rights reserved.</p>
                        <Link href="#" className="hover:text-foreground transition-colors">
                            Status
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="h-9 w-9 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
