import { useEffect } from "react";

export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | BookVerse` : "BookVerse | Modern Book Discovery & Shop";
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [title, description]);
  return null;
}
