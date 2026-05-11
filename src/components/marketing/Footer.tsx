import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold">Product</h3>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-marketing-brand">Features</Link>
            <Link href="#preview" className="text-sm text-muted-foreground hover:text-marketing-brand">Dashboard</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-marketing-brand">Pricing (Coming Soon)</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold">Resources</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-marketing-brand">Documentation</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-marketing-brand">Storybook</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold">Company</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-marketing-brand">About</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-marketing-brand">Blog</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold">Social</h3>
            <a href="https://github.com" className="text-sm text-muted-foreground hover:text-marketing-brand">GitHub</a>
            <a href="https://linkedin.com" className="text-sm text-muted-foreground hover:text-marketing-brand">LinkedIn</a>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t pt-8">
          <p className="text-xs text-muted-foreground">
            © 2026 Retail Investment Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-xs text-muted-foreground hover:underline">Privacy</Link>
            <Link href="/" className="text-xs text-muted-foreground hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
