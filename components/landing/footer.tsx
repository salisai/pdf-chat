import Link from "next/link";
import { Twitter, Github, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const links = [
    { title: "Product", items: ["Features", "Pricing", "Security", "Status"] },
    { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
    { title: "Legal", items: ["Privacy", "Terms", "Cookies"] },
  ];

  return (
    <footer className="bg-white pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="h-6 w-6 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              ChatPDF
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              The next-generation document analysis engine. <br />
              Powered by Pinecone vector storage and semantic AI.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="p-2 rounded-full border border-neutral-100 hover:bg-neutral-50 transition-colors text-neutral-400 hover:text-black">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {links.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-neutral-400 hover:text-black transition-colors inline-flex items-center group">
                      {item}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-400 uppercase tracking-widest">
          <p>© 2026 ChatPDF Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-black transition-colors">Built by Gemini</Link>
            <Link href="#" className="flex items-center gap-2 hover:text-black transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> System Operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}