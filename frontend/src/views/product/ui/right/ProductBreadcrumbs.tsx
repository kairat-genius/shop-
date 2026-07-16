"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import { useState } from "react";

const ShareModal = dynamic(() => import("../modal/ShareModal"), { ssr: false });

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const ProductBreadcrumbs = ({ items }: ProductBreadcrumbsProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="text-[12px] font-light">
        {items.map((item, index) => (
          <span key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {index < items.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>
      <Button onClick={() => setIsShareModalOpen(true)}>
        <img
          src={"/static-media/detail/share.png"}
          alt="share"
          className="w-[1rem] h-[1rem]"
        />
      </Button>
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductBreadcrumbs;
