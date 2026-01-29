import type { Child } from "hono/jsx";
import { html, raw } from "hono/html";
import { getAllCSS } from "./styles/css.ts";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hanna Mikulska-Delgaldo",
  jobTitle: "Professional Buyer",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PL",
  },
};

export function Layout({ children }: { children: Child }) {
  const css = getAllCSS();

  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hanna Mikulska-Delgaldo — Professional Buyer</title>
        <meta
          name="description"
          content="Hanna Mikulska-Delgaldo is a professional buyer based in Poland, specializing in procurement and sourcing."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hannamd.com/" />

        <!-- Open Graph -->
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Hanna Mikulska-Delgaldo — Professional Buyer"
        />
        <meta
          property="og:description"
          content="Professional buyer based in Poland."
        />
        <meta property="og:url" content="https://hannamd.com/" />
        <meta
          property="og:image"
          content="https://hannamd.com/images/og-image.jpg"
        />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />

        <!-- Structured Data -->
        <script type="application/ld+json">
          ${raw(JSON.stringify(structuredData))}
        </script>

        <!-- Inlined Critical CSS -->
        <style>
          ${raw(css)}
        </style>
      </head>
      <body>
        <div class="pageWrapper">${children}</div>
      </body>
    </html>`;
}
