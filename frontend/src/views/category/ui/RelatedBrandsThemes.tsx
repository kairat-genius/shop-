import Accordion from "@/shared/ui/accordion";
import { cn } from "@/shared/utils/clsx";
import Link from "next/link";

const brands = [
  { label: "Nike Мужские Кроссовки", href: "/browse/nike-sneakers-men" },
  { label: "Jordan Мужские Кроссовки", href: "/browse/jordan-sneakers-men" },
  { label: "Adidas Мужские Кроссовки", href: "/browse/adidas-sneakers-men" },
  {
    label: "New Balance Мужские Кроссовки",
    href: "/browse/new-balance-sneakers-men",
  },
  { label: "PUMA Мужские Кроссовки", href: "/browse/puma-sneakers-men" },
  {
    label: "Skechers Мужские Кроссовки",
    href: "/browse/skechers-sneakers-men",
  },
  { label: "Asics Мужские Кроссовки", href: "/browse/asics-sneakers-men" },
  {
    label: "Converse Мужские Кроссовки",
    href: "/browse/converse-sneakers-men",
  },
  { label: "Reebok Мужские Кроссовки", href: "/browse/reebok-sneakers-men" },
  { label: "UGG Обувь Кроссовки", href: "/browse/ugg-shoes-women" },
];

const themes = [
  {
    label: "Мужчины зеленый Кроссовки Nike",
    href: "/trends/nike-green-sneakers-men",
  },
  {
    label: "Мужчины синий Кроссовки Jordan",
    href: "/trends/jordan-blue-sneakers-men",
  },
  {
    label: "Скучать Фиолетовый Кроссовки Adidas",
    href: "/trends/adidas-purple-sneakers-women",
  },
  {
    label: "Мужчины зеленый Кроссовки New Balance",
    href: "/trends/new balance-green-sneakers-men",
  },
  {
    label: "Мужчины синий Кроссовки PUMA",
    href: "/trends/puma-blue-sneakers-men",
  },
  {
    label: "Мужчины Фиолетовый Кроссовки Skechers",
    href: "/trends/skechers-purple-sneakers-men",
  },
  {
    label: "Мужчины зеленый Кроссовки Asics",
    href: "/trends/asics-green-sneakers-men",
  },
  {
    label: "Скучать синий Кроссовки Converse",
    href: "/trends/converse-blue-sneakers-women",
  },
  {
    label: "Мужчины Фиолетовый Кроссовки Reebok",
    href: "/trends/reebok-purple-sneakers-men",
  },
  { label: "Скучать сапоги UGG", href: "/trends/ugg--shoes-women" },
];

interface RelatedBrandsThemesProps {
  className?: string;
}

const RelatedBrandsThemes = ({ className }: RelatedBrandsThemesProps) => {
  return (
    <section className={cn("mb-10", className)}>
      <Accordion
        chevronClassName="w-4 h-4"
        className="justify-start gap-2.5 mb-0"
        title={
          <h2 className="font-roboto_condensed text-[24px] font-bold leading-[1.2]">
            СВЯЗАННЫЙ БРЕНД ИЛИ ТЕМЫ
          </h2>
        }
      >
        <div className="mt-4.5">
          <div className="grid grid-cols-5 gap-3">
            {brands.map((item) => (
              <Link
                key={item.href}
                className="text-[14px] font-light leading-[1.2] truncate"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="my-3 bg-slate-100" style={{ height: ".5px" }} />
          <div className="grid grid-cols-5 gap-3">
            {themes.map((item) => (
              <Link
                key={item.href}
                className="text-[14px] font-light leading-[1.2] truncate"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Accordion>
    </section>
  );
};

export default RelatedBrandsThemes;
