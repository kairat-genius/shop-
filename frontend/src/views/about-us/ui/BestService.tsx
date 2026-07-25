const BestService = () => {
  return (
    <section className="max-w-[72rem] w-full mx-auto px-[6rem] py-20">
      <div>
        <div className="text-[2.5rem] font-bold font-roboto_condensed leading-[normal]">
          Лучший <span className="text-teal-400">сервис в своем сегменте</span>
        </div>
        <div className="flex justify-between items-baseline border-t border-slate-400 mt-10 pt-10">
          <div className="text-[2.1rem] font-bold font-roboto_condensed leading-[normal]">
            Служба поддержки
          </div>
          <div className="text-[1rem] font-light leading-[normal]">
            Email:{" "}
            <a href="mailto:support@thePoizon.ru" className="underline">
              support@thePoizon.ru
            </a>
          </div>
        </div>
      </div>
      <div className="mt-30 text-[12px] font-light leading-[normal]">
        Некоторые квалифицированные заказы, например от проверенных продавцов,
        могут не проходить аутентификацию, если они соответствуют всем критериям
        платформы.
      </div>
    </section>
  );
};

export default BestService;
