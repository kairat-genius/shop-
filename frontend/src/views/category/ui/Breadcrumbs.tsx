import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface BreadcrumbsProps {
  title: string;
  items: { title: string; href?: string }[];
}

const Breadcrumbs = ({ title, items }: BreadcrumbsProps) => {
  return (
    <section className="container mt-10 mb-8 px-5">
      <div className="pb-4 border-b border-slate-100">
        <div className="text-sm leading-4.25 text-slate-800 uppercase flex flex-wrap items-center">
          {items.map((item, index) => (
            <Fragment key={item.title}>
              {item.href ? (
                <Link href={item.href}>{item.title}</Link>
              ) : (
                <span>{item.title}</span>
              )}

              {index < items.length - 1 && <span className="mx-1 w-2">/</span>}
            </Fragment>
          ))}
        </div>
        <h1 className="mt-2 font-bold text-2xl leading-7">{title}</h1>
      </div>
    </section>
  );
};

export default Breadcrumbs;
