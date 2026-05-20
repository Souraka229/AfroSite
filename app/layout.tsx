import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfroSite - Agence Web Africaine",
  description: "AfroSite est une agence web specialisee dans la creation de sites web professionnels pour les entreprises africaines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased bg-background"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
