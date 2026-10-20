import type { Metadata, Viewport } from "next";
import { Carlito } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Carlito : clone métrique libre de Calibri, la police du CV.
const carlito = Carlito({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-carlito",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://kevindumast.vercel.app";

const title = "Kévin DUMAST · Le pont entre la tech et le business";
const description =
  "Responsable de la Performance Commerciale IARD. Plus de 10 ans de data en finance et en assurance, de Snowflake aux agents IA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    locale: "fr_FR",
    siteName: "Kévin DUMAST",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={carlito.variable}>
      {/* Des extensions (ColorZilla, Grammarly…) ajoutent des attributs au body avant l'hydratation */}
      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
