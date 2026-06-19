import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { portfolio } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshay Murali — Data Scientist & ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Akshay Murali — Data Scientist, ML Enthusiast, and Python Developer building fraud-detection pipelines, AI-powered tools, and intelligent IoT systems.",
      },
      { property: "og:title", content: "Akshay Murali — Data Scientist & ML Engineer" },
      {
        property: "og:description",
        content:
          "Data-driven CS engineer building ML pipelines, analytics dashboards, and AI-powered tools.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Akshay Murali — Data Scientist & ML Engineer" },
      {
        name: "twitter:description",
        content:
          "Data-driven CS engineer building ML pipelines, analytics dashboards, and AI-powered tools.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: portfolio.name,
          jobTitle: "Data Scientist",
          email: `mailto:${portfolio.email}`,
          url: "/",
          address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
          sameAs: [portfolio.linkedin, portfolio.github],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
