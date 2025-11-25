import type { Metadata } from "next";
import "@/index.css";
import "@/App.css";

export const metadata: Metadata = {
  title: "Rushi Chudasama | React Developer Portfolio",
  description:
    "I'm Rushi Chudasama, a React.js developer passionate about building user-friendly web applications. Check out my portfolio and projects!",
  keywords: [
    "Rushi Chudasama",
    "React Developer",
    "Frontend Developer",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Ahmedabad Developer",
    "Web Developer",
    "React.js",
    "Framer Motion",
    "Tailwind CSS",
  ],
  authors: [{ name: "Rushi Chudasama" }],
  robots: "index, follow",
  openGraph: {
    title: "Rushi Chudasama | React Developer Portfolio",
    description:
      "Explore my projects and experience as a frontend developer specializing in React.js, TypeScript, and Tailwind CSS. Building modern, performant web applications.",
    url: "https://rushichudasama.netlify.app/",
    siteName: "Rushi Chudasama Portfolio",
    images: [
      {
        url: "https://rushichudasama.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushi Chudasama | React Developer Portfolio",
    description:
      "Frontend Developer specializing in React.js, TypeScript, and modern web technologies. Check out my projects and experience!",
    images: ["https://rushichudasama.netlify.app/twitter-image.jpg"],
    creator: "@rushi_dev",
  },
  icons: {
    icon: "/favicon.png",
  },
  other: {
    "revisit-after": "7 days",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rushichudasama.netlify.app" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://formsubmit.co" />
        <link
          rel="preload"
          as="image"
          href="/spinner-320w.webp"
          fetchPriority="high"
          imageSrcSet="/spinner-320w.webp 320w, /spinner-480w.webp 480w, /spinner-560w.webp 560w, /spinner-600w.webp 600w"
          imageSizes="(max-width: 575px) 320px, (max-width: 768px) 480px, (max-width: 992px) 560px, 600px"
        />
        <link rel="canonical" href="https://rushichudasama.netlify.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rushi Chudasama",
              url: "https://rushichudasama.netlify.app/",
              sameAs: [
                "https://www.linkedin.com/in/rushi-chudasama/",
                "https://github.com/rushi-chudasama",
                "https://twitter.com/rushi_dev",
              ],
              jobTitle: "Frontend Developer",
              worksFor: {
                "@type": "Organization",
                name: "Bacancy Technologies",
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
