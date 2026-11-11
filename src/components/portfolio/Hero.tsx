import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { Particles } from "./Particles";
import { TypingText } from "./TypingText";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0">
        <Particles />
      </div>
      <div className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-primary/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-[460px] rounded-full bg-secondary/20 blur-3xl animate-float-slower" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-secondary" />
            M.Sc. Computer Science Student · RPTU
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight">
            {portfolio.name.split(" ")[0]}{" "}
            <span className="text-gradient-accent">
              {portfolio.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
            I'm a <TypingText words={portfolio.typingRoles} className="font-semibold" />
          </p>

          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {portfolio.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" /> {portfolio.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-4 text-primary" /> {portfolio.email}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.8)] transition-transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href={portfolio.resume}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              <Download className="size-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Visual: monogram + orbiting glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden aspect-square w-full max-w-md justify-self-center md:block"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-2xl" />
          <div className="glass relative grid size-full place-items-center rounded-[2rem]">
            <div className="relative grid size-56 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_80px_-10px_rgba(139,92,246,0.8)]">
              <span className="font-display text-7xl font-bold text-white tracking-tight">
                {portfolio.initials}
              </span>
              <motion.div
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-18px] rounded-full border border-dashed border-white/20"
              />
              <motion.div
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-36px] rounded-full border border-white/10"
              />
            </div>

            <div className="glass absolute -bottom-6 -left-4 rounded-2xl px-4 py-3 text-left shadow-elegant">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Studying</div>
              <div className="text-sm font-medium">M.Sc. Computer Science · RPTU</div>
            </div>
            <div className="glass absolute -right-4 -top-2 rounded-2xl px-4 py-3 text-left shadow-elegant">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Recognition</div>
              <div className="text-sm font-medium">MedConnect Patent</div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-xs"
        >
          Scroll
          <ArrowDown className="size-4" />
        </motion.div>
      </a>
    </section>
  );
}
