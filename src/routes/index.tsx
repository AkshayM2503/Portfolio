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
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#person",
              name: portfolio.name,
              jobTitle: "Data Scientist & Machine Learning Engineer",
              description: portfolio.tagline,
              email: `mailto:${portfolio.email}`,
              telephone: portfolio.phone,
              url: "/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: portfolio.education.school,
              },
              knowsAbout: [
                "Data Science",
                "Machine Learning",
                "Python",
                "SQL",
                "Data Analytics",
                "Power BI",
                "Fraud Detection",
                "IoT",
              ],
              sameAs: [portfolio.linkedin, portfolio.github],
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: `${portfolio.name} — Portfolio`,
              description: portfolio.tagline,
              inLanguage: "en",
              publisher: { "@id": "/#person" },
            },
            {
              "@type": "ProfilePage",
              "@id": "/#profilepage",
              url: "/",
              name: `${portfolio.name} — Data Scientist & ML Engineer`,
              about: { "@id": "/#person" },
              mainEntity: { "@id": "/#person" },
              isPartOf: { "@id": "/#website" },
              hasPart: [
                { "@type": "WebPageElement", name: "About", url: "/#about" },
                { "@type": "WebPageElement", name: "Skills", url: "/#skills" },
                { "@type": "WebPageElement", name: "Experience", url: "/#experience" },
                { "@type": "WebPageElement", name: "Projects", url: "/#projects" },
                { "@type": "WebPageElement", name: "Achievements", url: "/#achievements" },
                { "@type": "WebPageElement", name: "Education", url: "/#education" },
                { "@type": "WebPageElement", name: "Certifications", url: "/#certifications" },
                { "@type": "WebPageElement", name: "Contact", url: "/#contact" },
              ],
            },
            {
              "@type": "ItemList",
              "@id": "/#projects",
              name: "Featured Projects",
              itemListElement: portfolio.projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "CreativeWork",
                  name: p.title,
                  description: p.description,
                  keywords: p.tech.join(", "),
                  creator: { "@id": "/#person" },
                },
              })),
            },
            {
              "@type": "ItemList",
              "@id": "/#experience",
              name: "Professional Experience",
              itemListElement: portfolio.experience.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "OrganizationRole",
                  roleName: e.role,
                  startDate: e.period,
                  worksFor: { "@type": "Organization", name: e.company },
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "About", item: "/#about" },
                { "@type": "ListItem", position: 3, name: "Projects", item: "/#projects" },
                { "@type": "ListItem", position: 4, name: "Experience", item: "/#experience" },
                { "@type": "ListItem", position: 5, name: "Contact", item: "/#contact" },
              ],
            },
          ],
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
