"use client";

import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";
import Search from "./Search";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/clsx";
import CategorySwiper from "./CategorySwiper";
import CategoriesDropdown from "./CategoriesDropdown";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className="sticky z-50 top-0 border-b border-slate-100"
      style={{
        backgroundImage: "url('/static-media/header/bg.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex items-center gap-4 md:gap-8 container px-4 md:px-5 min-h-13.75 md:min-h-16">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
            <Link href="/" title="POIZON" className="shrink-0">
              <img
                className="w-10 md:w-11.25 h-10 md:h-11.25 object-contain"
                src="https://cdn-img.thepoizon.ru/node-common/66761ca0-ca01-1761-ea4e-079ba4b97eb8-135-143.png?x-oss-process=image/format,webp"
                alt="POIZON"
              />
            </Link>
          <Search />
        </div>
        <div className="flex gap-8 items-center">
          <Link
            className={cn(
              "flex font-medium leading-4 h-16 text-sm items-center gap-1",
              pathname === "/authentication/home"
                ? "text-teal-600"
                : "text-slate-950 hover:text-teal-600",
            )}
            href="/authentication/home"
          >
            <Icon
              icon="scan-search"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span
              className={cn(
                "block relative",
                pathname === "/authentication/home" &&
                  "after:absolute after:max-w-14 after:w-full after:h-0.5 after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:bg-teal-600",
              )}
            >
              Онлайн-проверка
            </span>
          </Link>
          <Link
            className={cn(
              "flex font-medium leading-4 h-16 text-sm items-center gap-1 justify-center",
              pathname === "/about-us"
                ? "text-teal-600"
                : "text-slate-950 hover:text-teal-600",
            )}
            href="/about-us"
          >
            <Icon icon="about-us" width={22} height={22} className="shrink-0" />
            <span
              className={cn(
                "block relative",
                pathname === "/about-us" &&
                  "after:absolute after:max-w-14 after:w-full after:h-0.5 after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:bg-teal-600",
              )}
            >
              О нас
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Button className="hover:text-teal-600 text-slate-950">
            <Icon icon="user" width={22} height={22} className="shrink-0" />
          </Button>
          <Link
            href="/wish-list"
            className="hover:text-teal-600 text-slate-950"
          >
            <Icon
              icon="heart-list"
              width={22}
              height={22}
              className="shrink-0"
            />
          </Link>
        </div>
      </div>
      <div className="h-11 flex gap-8 items-center container px-4 md:px-5">
        <CategoriesDropdown/>
        <CategorySwiper/>
      </div>
    </header>
  );
};

export default Header;
