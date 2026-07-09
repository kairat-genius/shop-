import Link from "next/link";
import { homeCategoriesData } from "../data/homeCategories.data";

const CategorySection = () => {
  return (
    <section className="container grid grid-cols-6 gap-4 mt-6 px-5">
      {homeCategoriesData.map((item, index) => (
        <Link key={index} className="flex flex-col items-center justify-center bg-linear-to-b from-slate-50 to-white" href={item.href}>
          <img className="object-contain aspect-square h-full w-full max-w-31.25 max-h-31.25" src={item.image} alt="" />
          <div className="text-lg font-bold leading-5.25">{item.title}</div>
        </Link>
      ))}
    </section>
  );
};

export default CategorySection;
