import Link from "next/link";
import { catalogRows } from "../data/homeCatalog.data";

const Catalog = () => {
  return (
    <section className="items-center px-[1.2vw] mb-[2.133vw]">
      {catalogRows.map((row, i) => (
        <div key={i} className="grid grid-cols-5 items-center gap-[1.067vw]">
          {row.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className="flex flex-col items-center"
            >
              <img className="w-[15.467vw] h-[15.467vw] aspect-square" src={item.image} alt={item.alt} />
              <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light wrap-break-word w-full h-[7.467vw] mt-[-1.6vw]">{item.label}</div>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Catalog;
