import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {portfolio.name}. Crafted with care.
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            aria-label="Email"
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={portfolio.resume}
            download
            className="ml-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Resume
          </a>
          <a
            href="#hero"
            aria-label="Back to top"
            className="ml-1 grid size-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.7)]"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
