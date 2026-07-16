import Link from "next/link";
import { homeBrandsData } from "../data/homeBrands.data";
import Icon from "@/shared/icon";

const BrandSection = () => {
  return (
    <section className="container grid grid-cols-8 gap-[.8rem] items-center mt-[2rem]">
      {homeBrandsData.map((item, index) => (
        <Link
          key={index}
          className="flex items-center justify-center"
          href={item.href}
        >
          <img
            className="w-[7.3rem] h-[4.5rem] object-contain"
            src={item.image}
            alt=""
          />
        </Link>
      ))}
      <Link
        className="flex items-center justify-center gap-1 h-[2.5rem] border rounded-xs font-medium text-[.9rem] min-w-[7.3rem]"
        href=""
        style={{
          borderColor: "rgba(170, 170, 187, .3)",
        }}
      >
        Все бренды
        <Icon icon={"chevron-right"} width={16} height={16} />
      </Link>
    </section>
  );
};

export default BrandSection;
