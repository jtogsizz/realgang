import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import AudioToggle from "@/components/AudioToggle";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JTO | REALGANG",
  description: "Digital identity and underground aesthetic hub.",
  // COMO USAR O FAVICON:
  // Substitua as imagens na raiz da pasta public/ com seus respectivos tamanhos.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "JTO | REALGANG",
    description: "Digital identity and underground aesthetic hub.",
    url: "https://realgang.life",
    siteName: "REALGANG",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-[#6d28d9] selection:text-white">
        <Background />
        <CustomCursor />
        {children}
        <AudioToggle />
      </body>
    </html>
  );
}
