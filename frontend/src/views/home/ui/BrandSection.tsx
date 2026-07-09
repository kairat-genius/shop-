import Link from "next/link";
import { homeBrandsData } from "../data/homeBrands.data";
import Icon from "@/shared/icon";

const BrandSection = () => {
  return (
    <section className="container grid grid-cols-8 gap-4 items-center mt-10 px-5">
      {homeBrandsData.map((item, index) => (
        <Link
          key={index}
          className="flex items-center justify-center"
          href={item.href}
        >
          <img
            className="w-full h-full max-w-36.5 max-h-22.5 object-contain"
            src={item.image}
            alt=""
          />
        </Link>
      ))}
      <Link
        className="flex items-center justify-center gap-1 h-12.5 border rounded-xs font-medium text-lg leading-5.25"
        href=""
        style={{
          borderColor: "rgba(170, 170, 187, .3)",
        }}
      >
        Все бренды
        <Icon icon={"chevron-right"} className="" width={16} height={16} />
      </Link>
    </section>
  );
};

export default BrandSection;
