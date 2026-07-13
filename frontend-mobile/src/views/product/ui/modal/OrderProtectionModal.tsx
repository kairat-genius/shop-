import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface OrderProtectionModalProps {
  onClose: () => void;
}

const OrderProtectionModal = ({ onClose }: OrderProtectionModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between py-[4.267vw] px-[3.733vw] border-b border-slate-100 h-[14.4vw]">
        <h2 className="font-roboto_condensed leading-[5.6vw] text-[4.8vw] font-bold">
          Защита заказа
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="pt-[5.333vw] px-[3.733vw] pb-[6.4vw] space-y-[6.4vw]">
        <div className="space-y-[2.133vw]">
          <div className="flex items-center justify-between gap-[2.133vw]">
            <div className="text-[3.733vw] font-medium leading-[4.8vw]">
              7-дневный безусловный возврат
            </div>
            <div className="flex items-center text-slate-500">
              <div className="text-[3.2vw] font-light leading-[normal]">
                Подробнее
              </div>
              <Icon icon="chevron-right" className="w-[3.733vw] h-[3.733vw] text-slate-400" />
            </div>
          </div>
          <div className="text-[3.2vw] leading-[5.333vw] tracking-[.5px] font-light">
            Вы можете вернуть товар в течение 7 дней после получения, если он
            соответствует условиям возврата, и получить полный возврат средств.
          </div>
        </div>
        <div className="space-y-[2.133vw]">
          <div className="text-[3.733vw] font-medium leading-[4.8vw]">
            Поддержка 24/7
          </div>
          <div className="text-[3.2vw] leading-[5.333vw] tracking-[.5px] font-light">
            Электронная почта: support@thePoizon.ru
          </div>
        </div>
        <div className="space-y-[2.133vw]">
          <div className="text-[3.733vw] font-medium leading-[4.8vw]">
            Покупка с уверенностью
          </div>
          <div className="text-[3.2vw] leading-[5.333vw] tracking-[.5px] font-light">
            Бесплатная защита заказов от ДЭВУ распространяется на
            соответствующие условиям заказы, отменённые по вине продавца. Мы
            найдём для вас тот же товар или оформим полный возврат средств.
          </div>
        </div>
        <Button className="rounded-[1.067vw] border border-slate-950 gap-[1.067vw] h-[11.733vw] w-full">
          <Icon icon="headset" className="w-[4.533vw] h-[4.533vw]" />
          <span className="font-roboto_condensed font-bold text-[4.267vw] leading-[11.733vw]">
            Онлайн-чат
          </span>
        </Button>
      </div>
    </Modal>
  );
};

export default OrderProtectionModal;
