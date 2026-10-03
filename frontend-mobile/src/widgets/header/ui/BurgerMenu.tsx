"use client";
import { useState } from "react";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import Link from "next/link";
import { cn } from "@/shared/utils/clsx";
import { useCatalogData } from "@/shared/context/catalog-data";
import { generateProductSlug } from "@/shared/utils/slug";

interface BurgerMenuProps {
  onClose: () => void;
}

const contactLinks = [
  { label: "Отслеживание заказа", href: "/order-tracking" },
  { label: "Онлайн-чат", href: "/live-chat" },
];

const BurgerMenu = ({ onClose }: BurgerMenuProps) => {
  useBodyScrollLock(true);
  const [activePanel, setActivePanel] = useState<number | string | null>(null);

  const { categoryData } = useCatalogData();
  const handleCategoryClick = (id: number) => {
    setActivePanel(id);
  };

  const handleContactClick = () => {
    setActivePanel("contact");
  };

  const handleBack = () => {
    setActivePanel(null);
  };

  // Данные для панели категорий
  const activeCategory =
    activePanel && activePanel !== "contact"
      ? categoryData.categories.find((cat) => cat.id === activePanel)
      : null;

  return (
    <Modal onClose={onClose} className="w-full h-full px-[5.333vw]">
      <div className="flex items-center justify-between h-[13.867vw] w-full">
        <Link href="/" onClick={onClose}>
          <img
            className="w-[9.333vw] h-[9.333vw] object-contain"
            src="https://cdn-img.thepoizon.ru/node-common/66761ca0-ca01-1761-ea4e-079ba4b97eb8-135-143.png?x-oss-process=image/format,webp"
            alt="POIZON"
            width={37}
            height={37}
          />
        </Link>
        <Button onClick={onClose} className="text-slate-500">
          <Icon icon="x" className="w-[5.333vw] h-[5.333vw]" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className={cn(activePanel && "hidden")}>
          <div className="pb-[4.8vw]">
            <ul className="space-y-[4.8vw] leading-[5.067vw] text-[4.267vw]">
              <li>
                <Link
                  href="/all-categories"
                  className="flex items-center justify-between"
                  onClick={onClose}
                >
                  Все категории
                  <Icon
                    icon="chevron-right"
                    className="text-slate-500 h-[4.267vw] w-[4.267vw]"
                  />
                </Link>
              </li>
              {categoryData.categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.title}
                  <Icon
                    icon="chevron-right"
                    className="text-slate-500 h-[4.267vw] w-[4.267vw]"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="py-[4.8vw] border-t border-b border-slate-300">
            <ul className="space-y-[4.8vw] leading-[5.067vw] text-[4.267vw]">
              <li>
                <Link href="/about-us" onClick={onClose}>
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/69ef1fbe15fe3c0c13956dfb"
                  className="flex items-center justify-between"
                  onClick={onClose}
                >
                  Справочный центр
                  <Icon
                    icon="chevron-right"
                    className="text-slate-500 h-[4.267vw] w-[4.267vw]"
                  />
                </Link>
              </li>
              <li
                className="flex items-center justify-between cursor-pointer"
                onClick={handleContactClick}
              >
                Связаться с нами
                <Icon
                  icon="chevron-right"
                  className="text-slate-500 h-[4.267vw] w-[4.267vw]"
                />
              </li>
            </ul>
          </div>

          <div className="mb-[26.667vw] mt-[9.6vw]">
            <Button className="font-bold font-roboto_condensed text-[4.267vw] w-full h-[11.733vw] border border-slate-950 rounded-[1.067vw]">
              Зарегистрироваться
            </Button>
            <Button className="font-bold font-roboto_condensed text-[4.267vw] w-full h-[11.733vw] bg-teal-350 border border-teal-350 rounded-[1.067vw] mt-[3.733vw]">
              Войти
            </Button>
          </div>
        </div>

        {activeCategory && (
          <div className="py-[11.2vw]">
            <div
              className="pb-[3.733vw] flex items-center gap-[1.6vw] cursor-pointer"
              onClick={handleBack}
            >
              <Icon
                icon="chevron-right"
                className="h-[4.8vw] w-[4.8vw] rotate-180"
              />
              <h3 className="text-[4.267vw] leading-[5.067vw] font-medium">
                {activeCategory.title}
              </h3>
            </div>
            <ul className="mt-[6.4vw] ml-[6.4vw] mr-[3.2vw] space-y-[6.4vw] text-[4.267vw] leading-[5.067vw] pb-[8vw]">
              {activeCategory.childTreeNode.map((child) => (
                <li key={child.id}>
                  <Link
                    href={`/category/${generateProductSlug(child.title, child.id)}`}
                    onClick={onClose}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/category/${generateProductSlug(activeCategory.title, activeCategory.id)}`}
                  onClick={onClose}
                >
                  Все
                </Link>
              </li>
            </ul>
          </div>
        )}

        {activePanel === "contact" && (
          <div className="py-[11.2vw]">
            <div
              className="pb-[3.733vw] flex items-center gap-[1.6vw] cursor-pointer"
              onClick={handleBack}
            >
              <Icon
                icon="chevron-right"
                className="h-[4.8vw] w-[4.8vw] rotate-180"
              />
              <h3 className="text-[4.267vw] leading-[5.067vw] font-medium">
                Связаться с нами
              </h3>
            </div>
            <ul className="mt-[6.4vw] ml-[6.4vw] mr-[3.2vw] space-y-[6.4vw] text-[4.267vw] leading-[5.067vw] pb-[8vw]">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BurgerMenu;
