import Script from "next/script";
import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";
import HashScroll from "./components/hash-scroll";
import { siteTitle } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebbas = Bebas_Neue({
  variable: "--font-bebas",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteTitle,
  description:
    "Official website of Inter Racial Football Club (IRFC). A diverse football community based in the heart of Dumaguete City, Philippines.",
  keywords: [
    "IRFC",
    "Football Dumaguete",
    "Soccer Philippines",
    "Dumaguete Sports",
    "Inter Racial Football Club",
  ],
  openGraph: {
    title: siteTitle,
    description: "United by the beautiful game in Dumaguete City.",
    url: "https://interracialfc.com",
    siteName: "IRFC",
    images: [
      {
        url: "/imgs/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${bebbas.variable} antialiased`}>
        {/* 1. The fb-root div must be at the top level of the body */}
        <div id="fb-root"></div>

        <HashScroll />

        {children}

        {/* 2. The SDK Script using Next.js optimization */}
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0&appId=250706382314503"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
