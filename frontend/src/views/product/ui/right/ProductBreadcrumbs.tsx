"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const ProductBreadcrumbs = ({ items }: ProductBreadcrumbsProps) => {
  return (
    <div className="text-[12px] font-light">
      {items.map((item, index) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {index < items.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </div>
  );
};

export default ProductBreadcrumbs;
