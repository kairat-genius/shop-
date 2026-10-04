import Link from "next/link";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { useProductDetailData } from "../../context/useCatalogData";

const ProductHeader = () => {
  const {
    productData: {
      buyDialogModel: { detail },
      rankingModule,
    },
    activeSku,
  } = useProductDetailData();

  const rankingList = rankingModule?.rankingList ?? [];
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mt-[3.2vw] px-[3.733vw] gap-[1.067vw]">
        <div className="flex items-end gap-[.533vw]">
          <div className="text-[5.333vw] font-bold font-roboto_condensed leading-[1.3]">
            {activeSku?.minPrice?.localizedDisplayText
              ? `${activeSku.minPrice.localizedDisplayText}`
              : "-- ₽"}
          </div>
          <Button className="text-slate-500 h-[5.333vw]">
            <Icon
              icon="circle-question-mark"
              className="w-[3.733vw] h-[3.733vw]"
            />
          </Button>
        </div>
      </div>
      <h1 className="text-[4.267vw] font-light mt-[3.2vw] leading-[5.333vw] px-[3.733vw]">
        {detail.title}
      </h1>
      <div className="flex items-center flex-wrap gap-[1.6vw] mt-[3.2vw] px-[3.733vw] pb-[.533vw]">
        {rankingList.map((rankInfo) => (
          <Link
            key={rankInfo.id}
            className="max-w-[39.467vw] only:max-w-full shrink-0 py-[.533vw] px-[1.067vw] flex items-center leading-[normal] rounded-[1.067vw] border border-slate-200 text-slate-500 text-[3.2vw]"
            href={rankInfo.url || "#"}
            target="_blank"
          >
            {rankInfo.icon && (
              <img
                className="aspect-square mr-0.5 w-[3.733vw] h-[3.733vw]"
                src={rankInfo.icon}
                alt={rankInfo.name || "ranking"}
              />
            )}
            {rankInfo.rank && (
              <div className="font-roboto_condensed font-semibold opacity-[.7] ml-[.533vw]">
                {rankInfo.rank}
              </div>
            )}

            {rankInfo.name && (
              <div className="font-light truncate">{rankInfo.name}</div>
            )}
            <Icon
              icon="chevron-right"
              className="w-[3.2vw] h-[3.2vw] text-slate-400"
            />
          </Link>
        ))}
        {activeSku?.hitBizTags?.map((item, index) => (
          <div
            key={index}
            className="py-[.533vw] px-[1.067vw] rounded-[1.067vw] text-[3.2vw] leading-[normal] font-light border border-slate-200 text-slate-500"
          >
            {item.name}
          </div>
        ))}
        {activeSku?.bizTagList?.map((item, index) => (
          <div
            key={index}
            className="py-[.533vw] px-[1.067vw] rounded-[1.067vw] text-[3.2vw] leading-[normal] font-light border border-slate-200 text-slate-500"
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductHeader;
