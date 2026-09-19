import { partnersData } from "../data/partner.data";

const Partner = () => {
  return (
    <section className="mt-20 w-[64rem] mx-auto">
      <div className="text-[1.8rem] leading-[2.1rem] font-roboto_condensed font-bold">Официальный партнёр</div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {partnersData.map((item, index) => (
          <img
            key={index}
            className="w-[12.15rem] h-[6.8rem]"
            src={item.src}
            alt={item.alt}
          />
        ))}
      </div>
    </section>
  );
};

export default Partner;
