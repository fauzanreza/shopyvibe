import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopyVibe - Web Builder for UMKM",
  description: "Create your professional digital identity with ease.",
  icons: {
    
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
