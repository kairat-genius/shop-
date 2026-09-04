import Link from "next/link";
import { homeCategoriesData } from "../data/homeCategories.data";
import { generateProductSlug } from "@/shared/utils/slug"
const CategorySection = () => {
  return (
    <section className="container grid grid-cols-6 gap-[.8rem] mt-6">
      {homeCategoriesData.map((item, index) => (
        <Link key={index} className="flex flex-col items-center justify-center bg-linear-to-b from-slate-50 to-white flex-[0_1_10rem]" 
        href={`/category/${generateProductSlug(item.name, item.id)}`}>
          <img className="object-contain aspect-square w-[6.25rem] h-[6.25rem]" src={item.image} alt="" />
          <div className="text-[.9rem] font-bold leading-[normal]">{item.name}</div>
        </Link>
      ))}
    </section>
  );
};

export default CategorySection;
