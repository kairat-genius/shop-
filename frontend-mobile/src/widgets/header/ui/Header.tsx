"use client";

import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";
import Search from "./Search";
import { useState } from "react";
import dynamic from "next/dynamic";

const BurgerMenu = dynamic(() => import("./BurgerMenu"), {
  ssr: false,
});

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <header className="sticky z-50 top-0">
      <div
        className="flex items-center px-[3.733vw] min-h-[12.8vw]"
        style={{
          backgroundImage: "url('/static-media/header/bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex items-center flex-1">
          <Button
            className="mr-[2.667vw]"
            onClick={() => setIsBurgerOpen(true)}
          >
            <img
              src="https://cdn-img.thepoizon.ru/node-common/607a8ef5-f971-cddd-5ecf-1259c592fc6b-72-72.png?x-oss-process=image/resize,s_96/format,webp"
              alt="menu"
              width={28}
              height={28}
              className="shrink-0 w-[6.4vw] h-[6.4vw]"
            />
          </Button>
          <Link href="/" title="POIZON" className="shrink-0 mr-[3.2vw] block">
            <img
              className="w-[9.333vw] h-[9.333vw] object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/66761ca0-ca01-1761-ea4e-079ba4b97eb8-135-143.png?x-oss-process=image/format,webp"
              alt="POIZON"
              width={37}
              height={37}
            />
          </Link>
          <Search />
        </div>
        <div className="flex gap-[2.133vw] items-center ml-[4.267vw]">
          <Link
            className="flex flex-col font-medium items-center"
            href="/authentication/home"
          >
            <Icon icon="scan-search" className="h-[8vw] w-[8.533vw]" />
          </Link>
          <Link
            className="flex flex-col font-medium items-center"
            href="/authentication/home"
          >
            <Icon icon="heart-list" className="h-[8vw] w-[8.533vw]" />
          </Link>
        </div>
      </div>

      {isBurgerOpen && <BurgerMenu onClose={() => setIsBurgerOpen(false)} />}
    </header>
  );
};

export default Header;
