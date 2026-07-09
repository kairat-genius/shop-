"use client";

import EmailSubscription from "@/features/email-subscription";
import Icon from "@/shared/icon";
import { footerData } from "../data/footer.data";
import Accordion from "@/shared/ui/accordion";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-150">
      
      <div className="px-[8vw] py-[5.333vw] border-b border-[rgba(20,21,26,.3)]">
        {footerData.footerSections.map((item, index) => (
          <Accordion
            className="my-[1em]"
            title={<h3 className="text-[3.733vw] font-bold">{item.title}</h3>}
            key={index}
            defaultOpen={false}
          >
            <div className="text-[3.2vw] font-light leading-normal">
              {item.links.map((it, it_index) => (
                <Link
                  key={it_index}
                  href={it.href}
                  className="truncate my-[2.4vw] block"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
      <div className="px-[8vw] py-[5.333vw] border-b border-[rgba(20,21,26,.3)]">
        <Accordion
          className="mb-0 py-[2.667vw]"
          title={<h3 className="text-[3.733vw] font-bold">Проверка</h3>}
          defaultOpen={false}
        >
          <div className="flex items-center gap-[8.533vw] text-[3.2vw] leading-[6.4vw] font-light">
            {footerData.verification.map((item, index) => (
              <Link key={index} href={item.href} className="truncate">
                {item.label}
              </Link>
            ))}
          </div>
        </Accordion>
      </div>

      <div className="p-[8vw] border-b border-[rgba(20,21,26,.3)]">
        <h3 className="text-[3.733vw] font-bold leading-4.75">Помощь</h3>
        <div className="grid grid-cols-3 gap-y-[4.267vw] gap-x-[8.533vw] mt-[4.267vw] text-[3.2vw] font-light leading-4">
          {footerData.support.map((item, index) => (
            <a key={index} href={item.href} className="truncate">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="p-[8vw] border-b border-[rgba(20,21,26,.3)]">
        <div className="text-[3.733vw] leading-[4.267vw] font-bold">
          Получить наше информационное письмо
        </div>
        <EmailSubscription />
        <div className="text-[2.667vw] font-light text-black tracking-[.7px]">
          Подписываясь, вы соглашаетесь с нашей Политикой конфиденциальности.
          Отказаться от подписки можно в любое время в нижней части наших писем.
        </div>
      </div>
      <div className="p-[8vw] border-b border-[rgba(20,21,26,.3)]">
        <h3 className="text-[3.733vw] font-bold leading-4.75">
          Подписывайтесь на нас
        </h3>
        <div className="flex items-center mt-[4.267vw] gap-[6.4vw]">
          <a
            href="/"
            target="_blank"
            rel="nofollow"
            className="bg-black rounded-sm"
          >
            <Icon
              icon="vk"
              width={20}
              height={20}
              className="text-white shrink-0"
            />
          </a>
          <a
            href="/"
            target="_blank"
            rel="nofollow"
            className="bg-black rounded-full"
          >
            <Icon
              icon="tg"
              width={20}
              height={20}
              className="text-white shrink-0"
            />
          </a>
          <a
            href="/"
            target="_blank"
            rel="nofollow"
            className="bg-black rounded-md"
          >
            <Icon
              icon="dzen"
              width={20}
              height={20}
              className="text-white shrink-0"
            />
          </a>
        </div>
      </div>
      <div className="p-[8vw] text-[2.667vw] font-light leading-4">
        © Филиал ПРО НЬЮ ВОРД (Гонг Конг) Лимитед
      </div>
    </footer>
  );
};

export default Footer;
