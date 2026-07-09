"use client";

import Link from "next/link";
import { footerData } from "../data/footer.data";
import Icon from "@/shared/icon";
import EmailSubscription from "@/features/email-subscription";
import FooterCategories from "./FooterCategories";

const Footer = () => {
  return (
    <footer className="py-18 bg-slate-150">
      <div className="container px-5">
        <div className="grid grid-cols-3 gap-20">
          <div className="space-y-13.5">
            <div>
              <h3 className="text-xl font-bold leading-[23.44px] mb-4">
                {footerData.about.title}
              </h3>
              <div className="flex flex-col gap-5 font-light text-sm leading-4">
                {footerData.about.links.map((item, index) => (
                  <Link key={index} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold leading-[23.44px] mb-4">
                {footerData.support.title}
              </h3>
              <div className="flex flex-col gap-5 font-light text-sm leading-4">
                {footerData.support.links.map((item, index) => (
                  <Link key={index} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-13.5">
            <div>
              <h3 className="text-xl font-bold leading-[23.44px] mb-4">
                {footerData.verification.title}
              </h3>
              <div className="flex flex-col gap-5 font-light text-sm leading-4">
                {footerData.verification.links.map((item, index) => (
                  <Link key={index} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold leading-[23.44px] mb-4">
                Подписывайтесь на нас
              </h3>
              <div className="flex gap-6 items-center">
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
          </div>
          <div className="max-w-140">
            <div className="text-xl font-bold leading-[23.44px] mb-4">
              Получить наше информационное письмо
            </div>
            <EmailSubscription />
            <div className="text-sm font-light pr-5.75 leading-6.5">
              Подписываясь, вы соглашаетесь с нашей Политикой
              конфиденциальности. Отказаться от подписки можно в любое время в
              нижней части наших писем.
            </div>
          </div>
        </div>
        <FooterCategories />
        <div
          className="my-12"
          style={{
            backgroundColor: "rgba(0, 0, 0, .3)",
            height: ".5px",
          }}
        />
        <div className="text-sm flex justify-between items-center font-light">
          <div>© ПРО НЬЮ ВОРД (Гонконг) Лимитед Все права защищены</div>
          <div>support@thePoizon.ru</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
