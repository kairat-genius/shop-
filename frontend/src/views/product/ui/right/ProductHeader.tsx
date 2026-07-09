import Link from "next/link";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";

const ProductHeader = () => (
  <>
    <h1 className="font-roboto_condensed text-xl font-bold mt-0.5 leading-[1.2]">
      Nike Hyperdunk 2017 Low Топ Баскетбольные кроссовки Мужские Розовые
    </h1>
    <div className="flex flex-wrap justify-between items-center mt-2">
      <div className="flex items-center gap-0.5">
        <div className="text-2xl font-bold font-roboto_condensed leading-7">
          6&nbsp;777&nbsp;₽
        </div>
        <Button className="text-slate-500">
          <Icon icon="circle-question-mark" width={14} height={14} />
        </Button>
      </div>
      <Button className="text-slate-500 text-xs font-light leading-3.5">
        U***U недавно купил(а)
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="shrink-0"
        />
      </Button>
    </div>
    <div className="flex items-center gap-1.5 mt-2">
      <Link
        className="px-1 py-0.5 flex items-center rounded-xs text-xs leading-[1.2] border border-slate-200 text-slate-500"
        href="/ranking/hot-picks-nike-basketball-72?spuId=8900150153356263&amp;rank=%E2%84%961&amp;track_referer_page_id=2301"
        target="_blank"
      >
        <img
          className="aspect-square mr-0.5"
          width={14}
          height={14}
          src="https://cdn-img.thepoizon.ru/node-common/03bf4860-cd8f-d56b-8ff5-cefbfe6ef458-42-42.png?x-oss-process=image/format,webp"
          alt="ranking"
        />
        <div className="font-roboto_condensed font-semibold opacity-[.7] mr-0.5">
          №1
        </div>
        <div className="font-light">В тренде: Nike Баскетбол</div>
        <Icon icon="chevron-right" width={12} height={12} />
      </Link>
      <div className="px-1 py-0.5 rounded-xs text-xs leading-[1.2] font-light border border-slate-200 text-slate-500">
        Лучшая цена за 30 дней
      </div>
    </div>
    <Link
      href="/about-us"
      className="flex items-center relative overflow-hidden h-10.25 px-3.5 py-2 mt-3 rounded-sm"
      style={{
        background:
          "linear-gradient(180deg, #fff, hsla(0, 0%, 100%, 0)), rgba(0, 219, 219, .1);",
      }}
    >
      <img
        className="pS"
        src="https://cdn-img.thepoizon.ru/node-common/6497afdb-3c52-716a-fb70-034489baa14d-75-66.png?x-oss-process=image/resize,s_96/format,webp"
        alt="100% authenticated"
        width={25}
        height={25}
      />
      <Icon icon="separator" width={1} height={10} className="shrink-0 mx-2" />
      <div className="font-roboto_condensed text-sm font-medium leading-[1.2]">
        Разнообразные категории
      </div>
      <Icon
        icon="chevron-right"
        width={12}
        height={12}
        className="shrink-0 ml-auto text-slate-500"
      />
      <img
        className="object-contain absolute top-2 right-6.5 w-12.75 h-11.25"
        src="https://cdn-img.thepoizon.ru/node-common/85e7e421-3782-1936-a2f4-d734bd1d7b88-153-96.png?x-oss-process=image/resize,s_96/format,webp"
        alt="100% authenticated"
        width={51}
        height={45}
      />
    </Link>
  </>
);

export default ProductHeader;
