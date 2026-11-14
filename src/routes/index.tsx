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
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akshay Murali — Data Analyst & Business Intelligence Portfolio" },
      {
        name: "description",
        content:
          "Akshay Murali is an M.Sc. Computer Science student at RPTU, interested in Data Analyst and Business Intelligence opportunities.",
      },
      {
        property: "og:title",
        content: "Akshay Murali — Data Analyst & Business Intelligence Portfolio",
      },
      {
        property: "og:description",
        content:
          "M.Sc. Computer Science student with experience in data analysis, dashboards, Python, and machine learning.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Akshay Murali — Data Analyst & Business Intelligence Portfolio",
      },
      {
        name: "twitter:description",
        content:
          "M.Sc. Computer Science student with experience in data analysis, dashboards, Python, and machine learning.",
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
              jobTitle:
                "M.Sc. Computer Science Student; Data Analyst and Business Intelligence interests",
              description: portfolio.tagline,
              email: `mailto:${portfolio.email}`,
              url: "/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kaiserslautern",
                addressCountry: "DE",
              },
              alumniOf: portfolio.education.map((e) => ({
                "@type": "CollegeOrUniversity",
                name: e.school,
              })),
              knowsAbout: [
                "Data Analysis",
                "Business Intelligence",
                "Machine Learning",
                "Python",
                "SQL",
                "Power BI",
                "Fraud Detection",
                "PostgreSQL",
              ],
              knowsLanguage: portfolio.languages,
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
              name: `${portfolio.name} — Data Analyst & Business Intelligence Portfolio`,
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
                { "@type": "WebPageElement", name: "Languages", url: "/#languages" },
                { "@type": "WebPageElement", name: "Contact", url: "/#contact" },
              ],
            },
            {
              "@type": "ItemList",
              "@id": "/#projects",
              name: "Data Analytics Projects",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "CreativeWork",
                  name: p.title,
                  description: p.summary,
                  keywords: p.technologies.join(", "),
                  url: `https://akshay-creative-hub.lovable.app/projects/${p.slug}`,
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
                  startDate: e.startDate,
                  endDate: e.endDate,
                  worksFor: { "@type": "Organization", name: e.company },
                },
              })),
            },
            {
              "@type": "ItemList",
              "@id": "/#education",
              name: "Education",
              itemListElement: portfolio.education.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "EducationalOccupationalProgram",
                  name: e.degree,
                  provider: { "@type": "CollegeOrUniversity", name: e.school },
                  location: e.location,
                  ...(e.cgpa ? { description: `CGPA: ${e.cgpa}` } : {}),
                },
              })),
            },
            {
              "@type": "ItemList",
              "@id": "/#achievements",
              name: "Achievements",
              itemListElement: portfolio.achievements.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: { "@type": "CreativeWork", name: a.title, description: a.detail },
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
