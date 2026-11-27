import { useEffect, useState } from "react";
import { Menu, X, Download, Moon, Sun } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useTheme } from "@/lib/theme";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#languages", label: "Languages" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-elegant" : "border border-transparent"
          }`}
          aria-label="Primary"
        >
          <a href="#hero" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.6)]">
              {portfolio.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">
              {portfolio.shortName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-tint hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={portfolio.resume}
              download
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.7)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              <Download className="size-4" /> Resume
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="relative grid size-10 place-items-center rounded-lg border border-tint-strong bg-tint text-foreground transition-colors hover:bg-tint-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "light"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Sun className="size-5 rotate-90 scale-0 transition-transform duration-300 light:rotate-0 light:scale-100" aria-hidden="true" />
              <Moon className="absolute size-5 rotate-0 scale-100 transition-transform duration-300 light:-rotate-90 light:scale-0" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-lg border border-tint-strong bg-tint text-foreground md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-3 md:hidden">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-tint hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={portfolio.resume}
                  download
                  className="mt-1 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-2.5 text-sm font-medium text-white"
                >
                  <Download className="size-4" /> Download Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
