import type { Metadata } from "next";
import { Suspense } from "react";
import "@/shared/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { robotoFont, robotoCondensedFont } from "@/shared/fonts";
import Footer from "@/widgets/footer";
import Header from "@/widgets/header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
      style={{
        fontSize:
          "clamp(14.2222px, calc(14.2222px + (100vw - 1024px) / 72), 20px)",
      }}
    >
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

        <NuqsAdapter>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
        </NuqsAdapter>

        <Footer />
      </body>
    </html>
  );
}
