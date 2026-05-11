import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight text-marketing-brand">RAP</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-marketing-brand">Features</Link>
            <Link href="#preview" className="text-sm font-medium transition-colors hover:text-marketing-brand">Platform</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-marketing-brand hover:bg-marketing-brand/90">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
