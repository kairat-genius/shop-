import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default async function NotFound() {
  return (
    <main className="bg-white">
      <section className="px-3.75 md:px-5 pb-15 pt-15 text-center container">
        <h1 className="font-bold text-[20px] md:text-[28px] leading-[1.2]">
          4😥4 - Page not found
        </h1>

        <div className="pt-3.75 md:pt-5 leading-normal  md:text-[14px]">
          We&apos;re sorry, but we can&apos;t seem to find the page you are
          looking for.
        </div>
        <Link
          href="/"
          className="mx-auto w-fit block mt-6 px-5 py-3 text-[14px] font-semibold border border-black hover:bg-black hover:text-white transition-colors"
        >
          Главная страница
        </Link>
      </section>
      <section className="container lg:px-5 pb-5"></section>
    </main>
  );
}
