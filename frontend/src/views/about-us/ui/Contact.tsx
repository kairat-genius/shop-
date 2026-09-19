import Icon from "@/shared/icon";

const BestService = () => {
  return (
    <section className="w-[64rem] mx-auto mt-[4rem] pb-[4rem]">
      <div>
        <div className="text-[2.1rem] leading-[2.4rem] font-bold font-roboto_condensed">
          Подписывайтесь на нас
        </div>
        <div className="shadow-[0_2px_12px_rgba(20,21,26,0.04)] bg-slate-50 px-6 py-7 mt-6">
          <div className="flex items-center text-[16px] leading-4.5">
            <img
              className="w-[1rem] h-[1rem] mr-2"
              src="https://cdn-img.thepoizon.ru/node-common/b08e0e4c-6b60-b5b0-bf4d-c76f973ae905-42-42.png?x-oss-process=image/format,webp"
              alt=""
            />

            <span>Email: </span>
            <a
              className="ml-1 underline underline-offset-2"
              href="mailto:support@thePoizon.ru"
            >
              support@thePoizon.ru
            </a>
          </div>
          <div
            className="border-t border-slate-100 py-5"
            aria-hidden="true"
          ></div>
          <div className="text-slate-500 text-[12px] font-light leading-3.5">
            Подписывайтесь на нас в соцсетях
          </div>
          <div className="mt-5 flex items-center gap-12.5">
            <a
              className="bg-black rounded-full"
              href="https://t.me/the_dewu_poizon"
              target="_blank"
              rel="nofollow noreferrer"
              aria-label="Telegram"
            >
              <Icon icon="tg" className="text-white" width={18} height={18} />
            </a>
            <a
              href="https://www.instagram.com/poizon_dewu_official/"
              target="_blank"
              rel="nofollow noreferrer"
              aria-label="Instagram"
            >
              <Icon
                icon={"instagram"}
                className="text-white"
                width={18}
                height={18}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="leading-4.5 text-[10px] font-light mt-4 text-slate-500">
        * Некоторые квалифицированные заказы, например от проверенных продавцов,
        могут не проходить аутентификацию, если они соответствуют всем критериям
        платформы.
      </div>
    </section>
  );
};

export default BestService;
