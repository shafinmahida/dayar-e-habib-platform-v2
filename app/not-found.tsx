import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EBDB] px-6">
      <div className="text-center max-w-md space-y-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-heading font-black text-accent/20 leading-none">404</h1>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Page Not Found
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-accent transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 text-[10px] font-black uppercase tracking-[0.2em] border border-border bg-transparent text-foreground hover:bg-card transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
