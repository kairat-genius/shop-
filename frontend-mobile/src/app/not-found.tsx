import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/widgets/header";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default async function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white h-screen">
        <section className="pt-[24vw] text-center">
          <div className="leading-[7.467vw] text-[6.4vw] font-bold font-roboto_condensed">
            Ой! Мы не можем найти
          </div>
          <div className="leading-[7.467vw] text-[6.4vw] font-bold font-roboto_condensed">
            страницу, которую вы ищете
          </div>
          <div className="text-[3.467vw] leading-[4.8vw] font-light mt-[3.2vw] mb-[7.733vw]">
            Вот здесь несколько полезных ссылок:
          </div>
          <div className="underline font-semibold leading-[normal] text-[3.733vw] text-center mb-[8vw] capitalize">
            <Link href="/">Главная</Link>
          </div>
        </section>
      </main>
    </>
  );
}
