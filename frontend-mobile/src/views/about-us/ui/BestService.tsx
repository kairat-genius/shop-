const BestService = () => {
  return (
    <section className="py-[6.4vw] px-[3.733vw] bg-[#f5f7fa] scroll-mt-[18vw]" id="support">
      <div>
        <div className="text-[6.4vw] font-bold font-roboto_condensed leading-none">
          Лучший
          <br /> <span className="text-teal-400">сервис в своем сегменте</span>
        </div>
        <div className="mt-[3.2vw] text-[3.2vw] leading-[normal]">
          Email:{" "}
          <a href="mailto:support@thePoizon.ru" className="underline">
            support@thePoizon.ru
          </a>
        </div>
      </div>
      <div className="mt-[5.333vw] text-[2.933vw] font-light leading-normal text-slate-500">
        Некоторые квалифицированные заказы, например от проверенных продавцов,
        могут не проходить аутентификацию, если они соответствуют всем критериям
        платформы.
      </div>
    </section>
  );
};

export default BestService;
