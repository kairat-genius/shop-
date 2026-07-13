import Link from "next/link";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";

const ProductHeader = () => (
  <>
    <div className="flex flex-wrap justify-between items-center mt-[3.2vw] px-[3.733vw] gap-[1.067vw]">
      <div className="flex items-end gap-[.533vw]">
        <div className="text-[5.333vw] font-bold font-roboto_condensed leading-[1.3]">
          6&nbsp;777&nbsp;₽
        </div>
        <Button className="text-slate-500 h-[5.333vw]">
          <Icon icon="circle-question-mark" className="w-[3.733vw] h-[3.733vw]" />
        </Button>
      </div>
      <Button className="text-slate-500 text-[3.467vw] font-light leading-[normal] h-[5.867vw]">
        U***U недавно купил(а)
        <Icon
          icon="chevron-right"
          className="w-[3.2vw] h-[3.2vw] text-slate-400"
        />
      </Button>
    </div>
    <h1 className="text-[4.267vw] font-light mt-[3.2vw] leading-[5.333vw] px-[3.733vw]">
      Nike Hyperdunk 2017 Low Топ Баскетбольные кроссовки Мужские Розовые
    </h1>
    <div className="flex items-center gap-[1.6vw] mt-[3.2vw] px-[3.733vw] pb-[.533vw]">
      <Link
        className="w-[39.467vw] py-[.533vw] px-[1.067vw] flex items-center leading-[normal]  rounded-[1.067vw] border border-slate-200 text-slate-500 text-[3.2vw]"
        href="/ranking/hot-picks-nike-basketball-72?spuId=8900150153356263&amp;rank=%E2%84%961&amp;track_referer_page_id=2301"
        target="_blank"
      >
        <img
          className="aspect-square mr-0.5 w-[3.733vw] h-[3.733vw]"
          src="https://cdn-img.thepoizon.ru/node-common/03bf4860-cd8f-d56b-8ff5-cefbfe6ef458-42-42.png?x-oss-process=image/format,webp"
          alt="ranking"
        />
        <div className="font-roboto_condensed font-semibold opacity-[.7] ml-[.533vw]">
          №1
        </div>
        <div className="font-light truncate">В тренде: Nike Баскетбол</div>
        <Icon icon="chevron-right" className="w-[3.2vw] h-[3.2vw] text-slate-400" />
      </Link>
      <div className="py-[.533vw] px-[1.067vw] rounded-[1.067vw] text-[3.2vw] leading-[normal] font-light border border-slate-200 text-slate-500">
        Лучшая цена за 30 дней
      </div>
    </div>
  </>
);

export default ProductHeader;
