"use client";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ProductList from "./ProductList";

const SearchView = () => {
  const { filters } = useFiltersNuqs();
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <header className="px-[3.733vw] h-[11.733vw] sticky top-0 bg-white z-30 flex items-center">
        <Button className="w-[6.4vw] h-[6.4vw]" onClick={handleBack}>
          <Icon
            icon="chevron-right"
            className="w-full h-full rotate-180 text-slate-500"
          />
        </Button>
        <div className="ml-[2.133vw] h-[8.533vw] flex items-center justify-between rounded-[1.067vw] gap-[1.067vw] w-full border border-slate-500">
          <Link
            href={`/goods/searchHistory?keyword=${filters.keyword}`}
            className="py-[2.133vw] pl-[2.133vw] block w-full"
          >
            <div className="text-[3.2vw] leading-[normal] truncate py-[.533vw] px-[1.067vw]">{filters.keyword}</div>
          </Link>
          <Link className="pr-[2.667vw] h-full flex items-center justify-center" href="/goods/searchHistory">
            <Icon icon="x" className="w-[3.2vw] h-[3.2vw] text-slate-500" />
          </Link>
        </div>
      </header>
      <main>
       <ProductList/>
      </main>
    </>
  );
};

export default SearchView;
