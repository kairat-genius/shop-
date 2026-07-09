import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface BreadcrumbsProps {
  items: { title: string; href?: string }[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <section className="px-[3.733vw] pt-[1.6vw]">
        <div className="text-[3.2vw] leading-4 text-slate-500 flex flex-wrap items-center">
          {items.map((item, index) => (
            <Fragment key={item.title}>
              {item.href ? (
                <Link href={item.href}>{item.title}</Link>
              ) : (
                <h1>{item.title}</h1>

              )}

              {index < items.length - 1 && <span className="flex items-center justify-center mx-[.8vw] w-[2.133vw]">/</span>}
            </Fragment>
          ))}
        </div>
    </section>
  );
};

export default Breadcrumbs;
