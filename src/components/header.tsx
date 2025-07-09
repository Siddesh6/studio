"use client";

import Link from "next/link";
import { MountainIcon, Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#gallery", label: "Gallery" },
    { href: "#publications", label: "Publications" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="sr-only">PortfoliAI</span>
      </Link>
      <span className="font-headline text-xl font-bold ml-2">PortfoliAI</span>
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4 lg:ml-4">
        <ThemeToggle />
        <Link href="/admin" prefetch={false}>
          <Settings className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          <span className="sr-only">Edit Details</span>
        </Link>
      </div>
    </header>
  );
}
