import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
}

export default function SeoHead({ title, description, canonicalPath }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (name: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        if (property) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      return tag;
    };

    const ensureCanonical = () => {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      return link;
    };

    const ensureSchema = () => {
      let script = document.head.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      return script;
    };

    ensureMeta("description").setAttribute("content", description);
    ensureMeta("robots").setAttribute("content", "index, follow");
    
    // Open Graph
    ensureMeta("", "og:title").setAttribute("content", title);
    ensureMeta("", "og:description").setAttribute("content", description);
    ensureMeta("", "og:type").setAttribute("content", "website");
    
    // Twitter
    ensureMeta("twitter:title").setAttribute("content", title);
    ensureMeta("twitter:description").setAttribute("content", description);
    ensureMeta("twitter:card").setAttribute("content", "summary_large_image");

    const canonicalUrl = `https://philgreene.net${canonicalPath}`;
    ensureCanonical().setAttribute("href", canonicalUrl);

    // Inject Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Phil Greene",
      "jobTitle": "Data Analyst & SEO Automation Specialist",
      "url": "https://philgreene.net",
      "sameAs": [
        "https://linkedin.com/in/phil.greene1",
        "https://github.com/WebCraftPhil",
        "https://twitter.com/vtguy65"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Southern New Hampshire University",
        "description": "B.S. Data Science (In Progress)"
      },
      "knowsAbout": [
        "Data Analysis",
        "SEO Automation",
        "Python",
        "SQL",
        "Machine Learning",
        "Local SEO",
        "E-commerce"
      ]
    };
    ensureSchema().textContent = JSON.stringify(schema);
  }, [canonicalPath, description, title]);

  return null;
}
