import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface PriceInfoModalProps {
  onClose: () => void;
}

const PriceInfoModal = ({ onClose }: PriceInfoModalProps) => {
  useBodyScrollLock(true);

  return (
    <Modal
      onClose={onClose}
      className="bg-white max-w-160 flex flex-col rounded-sm"
    >
      <div className="flex items-center justify-between px-8 py-6 w-full border-b border-slate-100">
        <img
          className="aspect-square"
          src="https://cdn-img.thepoizon.ru/node-common/aaa8cbf9-9541-0a96-c7ee-04a13d3f80fb-168-168.png?x-oss-process=image/format,webp"
          width={28}
          height={28}
          alt=""
        />
        <h2 className="text-[24px] font-bold text-center tracking-[-.5px] leading-[1.3] font-roboto_condensed ml-1.5">
          Вы всегда найдёте лучшие цены
        </h2>
        <Button className="text-slate-500 ml-auto" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="h-full px-8 py-6 bg-slate-150">
        <div className="bg-white p-3 rounded-sm">
          <div className="flex gap-1 items-center">
            <img
              className="w-5 h-5 object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/7b2fbc35-fd12-4ad8-09e3-638c0b84be02-48-48.png?x-oss-process=image/format,webp"
              alt=""
            />
            <div className="text-[18px] font-bold leading-normal">
              Почему цена зависит от размера?
            </div>
          </div>
          <div className="pl-6 mt-2 text-[14px] font-light leading-normal">
            На POIZON работает модель конкурентных торгов между продавцами:
            каждый размер выставляется независимо разными поставщиками. Наша
            система ранжирует их предложения по цене и доставке: приоритет
            получают те, у кого цена ниже, а срок доставки — короче. Поэтому
            стоимость одного и того же товара может отличаться в зависимости от
            размера: на неё влияют расходы поставщика и текущий спрос.
          </div>
        </div>
        <div className="bg-white p-3 rounded-sm mt-3">
          <div className="flex gap-1 items-center">
            <img
              className="w-5 h-5 object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/4b16b20b-e326-8b09-553f-87ae37a93c52-48-48.png?x-oss-process=image/format,webp"
              alt=""
            />

            <div className="text-[18px] font-bold leading-normal">
              Почему цены меняются?
            </div>
          </div>
          <div className="pl-6 mt-2 text-[14px] font-light leading-normal">
            Изменения в наличии: Когда товар по самой низкой цене распродается,
            мы автоматически показываем следующее наиболее выгодное предложение.
            <br /> Рыночная динамика: Колебания валютных курсов и изменения
            спроса и предложения (например, рост популярности лимитированных
            коллекций) приводят к корректировке цен.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PriceInfoModal;
