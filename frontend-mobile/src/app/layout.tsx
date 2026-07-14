import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { robotoFont, robotoCondensedFont } from "@/shared/fonts";
import Footer from "@/widgets/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body
        className={`${robotoFont.variable} ${robotoCondensedFont.variable} min-h-full flex flex-col antialiased`}
      >
        <NextTopLoader
          color="#ff3a5c"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease-in-out"
          speed={200}
          shadow="0 0 10px #ff3a5c,0 0 5px #ff3a5c"
        />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Footer />
      </body>
    </html>
  );
}
