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
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between border-b border-slate-100 h-[14.4vw] px-[3.733vw]">
        <h2 className="font-roboto_condensed leading-[5.6vw] text-[4.8vw] font-bold">
          ДОСТАВКА
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="pt-[3.733vw] pb-[10.667vw]">
        <div className="space-y-[3.2vw] pb-[5.333vw] border-b border-slate-100 px-[3.733vw]">
          <div className="text-[3.733vw] font-medium leading-[100%]">
            Пункт выдачи
          </div>
          <div className="text-[3.2vw] leading-[4.8vw] font-light">
            Добавьте ближайший пункт выдачи и отслеживайте статус доставки.
          </div>
          <Button className="w-full rounded-[1.067vw] bg-teal-350 gap-[1.067vw] py-[2.267vw] mt-[3.2vw]">
            <img
              className="w-[4.8vw] h-[4.8vw]"
              src="https://cdn-img.thepoizon.ru/node-common/440c1bd6-dbd3-a8ac-eaba-31811b847679-55-54.png?x-oss-process=image/resize,s_96/format,webp"
              alt="address"
            />
            <span className="font-roboto_condensed text-[4.267vw] leading-[100%] font-bold">
              Выбрать на карте
            </span>
          </Button>
        </div>
        <div className="space-y-[3.2vw] mt-[5.333vw] px-[3.733vw]">
          <div className="text-[3.733vw] font-medium leading-[100%]">
            Способ доставки
          </div>
          <div className="text-[3.2vw] leading-[4.8vw] font-light">
            Вы можете выбрать ускоренную доставку на странице оформления заказа.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeliveryModal;
