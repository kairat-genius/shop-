import Loader from "@/shared/ui/loader";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
