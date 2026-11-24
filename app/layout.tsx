import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import { KurmiProvider } from "@/lib/context";
import { GrainFilter } from "@/components/illustrations/GrainFilter";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { InterestDrawer } from "@/components/ui/InterestDrawer";
import { InquiryModal } from "@/components/ui/InquiryModal";
import { SizeGuideDrawer } from "@/components/ui/SizeGuideDrawer";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MobileBottomBar } from "@/components/ui/MobileBottomBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kurmi.fashions"),
  title: "KURMI.FASHIONS | Wear the wild. Carry the calm.",
  description:
    "Pre-launch demand-validation website for men's and women's shirts and tees with original wildlife & nature illustrations. 1,000 inquiries unlock our first sustainable manufacturing run. Zero payment today.",
  keywords: [
    "wildlife apparel",
    "nature illustrations",
    "organic cotton t-shirts",
    "linen shirts",
    "sustainable fashion",
    "demand validation",
    "pre-launch drop",
    "India fashion",
  ],
  authors: [{ name: "KURMI FASHIONS" }],
  openGraph: {
    title: "KURMI.FASHIONS | Wear the wild. Carry the calm.",
    description:
      "Original nature-inspired shirts and tees, made only when you ask for them. Join 1,000 early supporters to unlock Drop 01.",
    url: "https://kurmi.fashions",
    siteName: "KURMI FASHIONS",
    images: [
      {
        url: "/images/kurmi-logo.jpg",
        width: 800,
        height: 800,
        alt: "KURMI FASHIONS Wildlife Seal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KURMI.FASHIONS | Wear the wild. Carry the calm.",
    description: "Original nature-inspired shirts and tees. Join 1,000 supporters to unlock our first drop.",
    images: ["/images/kurmi-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KURMI FASHIONS",
    url: "https://kurmi.fashions",
    logo: "https://kurmi.fashions/images/kurmi-logo.jpg",
    description:
      "Pre-launch demand validation apparel brand featuring hand-drawn botanical and wildlife illustrations on combed cotton.",
    slogan: "Wear the wild. Carry the calm.",
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-terracotta selection:text-white">
        <KurmiProvider>
          {/* 3% SVG Noise Grain Overlay */}
          <GrainFilter />

          {/* Desktop Custom Paw/Circle Cursor */}
          <CustomCursor />

          {/* Top Skip to main link for WCAG AA Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-surface focus:rounded-full focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>

          {/* Global Sticky Navigation */}
          <Header />

          {/* Main App Content */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Global Drawers & Modals */}
          <InterestDrawer />
          <InquiryModal />
          <SizeGuideDrawer />

          {/* Mobile Bottom Sticky Bar */}
          <MobileBottomBar />

          {/* Global Footer */}
          <Footer />
        </KurmiProvider>
      </body>
    </html>
  );
}
