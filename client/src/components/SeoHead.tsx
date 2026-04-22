import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
}

export default function SeoHead({ title, description, canonicalPath }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (name: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
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

    ensureMeta("description").setAttribute("content", description);
    ensureMeta("robots").setAttribute("content", "index, follow");

    const canonicalUrl = `https://www.philgreene.net${canonicalPath}`;
    ensureCanonical().setAttribute("href", canonicalUrl);
  }, [canonicalPath, description, title]);

  return null;
}
