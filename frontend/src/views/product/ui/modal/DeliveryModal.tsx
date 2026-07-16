import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface DeliveryModalProps {
  onClose: () => void;
}

const DeliveryModal = ({ onClose }: DeliveryModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal onClose={onClose} className="bg-white max-w-154 rounded-sm">
      <div
        className="flex items-center justify-between px-8 py-6 border-b"
        style={{ borderColor: "rgba(5, 5, 5, 0.06)" }}
      >
        <h2 className="font-roboto_condensed leading-5.75 text-[20px] font-bold">
          ДОСТАВКА
        </h2>
        <Button
          type="button"
          className="opacity-70 transition-opacity hover:opacity-100 text-slate-500"
          onClick={onClose}
        >
          <Icon icon="x" width={22} height={22} />
        </Button>
      </div>
      <div className="p-8 flex flex-col gap-8">
        <div className="space-y-3">
          <div className="text-[16px] font-extrabold leading-5">
            Пункт выдачи
          </div>
          <div className="text-[14px] leading-[100%]">
            Добавьте ближайший пункт выдачи и отслеживайте статус доставки.
          </div>
          <Button className="w-full rounded-sm bg-teal-350 gap-1 py-[12.5px] mt-1">
            <img
              className="pA"
              src="https://cdn-img.thepoizon.ru/node-common/440c1bd6-dbd3-a8ac-eaba-31811b847679-55-54.png?x-oss-process=image/resize,s_96/format,webp"
              alt="address"
              width={18}
              height={18}
            />
            <span className="font-roboto_condensed text-[16px] leading-[100%] font-bold">
              Выбрать на карте
            </span>
          </Button>
        </div>
        <div className="space-y-3">
          <div className="text-[16px] font-extrabold leading-5">
            Способ доставки
          </div>
          <div className="text-[14px] leading-[100%]">
            Вы можете выбрать ускоренную доставку на странице оформления заказа.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeliveryModal;
