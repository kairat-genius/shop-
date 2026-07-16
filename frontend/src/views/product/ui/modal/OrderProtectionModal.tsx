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
    <Modal onClose={onClose} className="bg-white max-w-160 rounded-sm">
      <div
        className="flex items-center justify-between px-8 py-6 border-b"
        style={{ borderColor: "rgba(5, 5, 5, 0.06)" }}
      >
        <h2 className="font-roboto_condensed leading-5.75 text-[20px] font-bold">
          Защита заказа
        </h2>
        <Button
          type="button"
          className="opacity-70 transition-opacity hover:opacity-100 text-slate-500"
          onClick={onClose}
        >
          <Icon icon="x" width={22} height={22} />
        </Button>
      </div>
      <div className="px-8 pt-5 pb-11 flex flex-col gap-6 text-[14px] leading-[100%]">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[16px] font-medium leading-[18.75px]">
              7-дневный безусловный возврат
            </div>
            <div className="flex items-center gap-0.5 text-slate-500">
              <div className="text-[12px] font-light leading-[100%]">
                Подробнее
              </div>
              <Icon icon="chevron-right" width={14} height={14} />
            </div>
          </div>
          <div className="text-[14px] leading-5 text-slate-800 font-light">
            Вы можете вернуть товар в течение 7 дней после получения, если он
            соответствует условиям возврата, и получить полный возврат средств.
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[16px] font-extrabold font-roboto_condensed tracking-[.5px]">
            Поддержка 24/7
          </div>
          <div className="text-[14px] leading-5 text-slate-800 font-light">
            Электронная почта: support@thePoizon.ru
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[16px] font-extrabold font-roboto_condensed tracking-[.5px]">
            Покупка с уверенностью
          </div>
          <div className="text-[14px] leading-5 text-slate-800 font-light">
            Бесплатная защита заказов от ДЭВУ распространяется на
            соответствующие условиям заказы, отменённые по вине продавца. Мы
            найдём для вас тот же товар или оформим полный возврат средств.
          </div>
        </div>
        <Button className="rounded-sm border border-slate-950 gap-1 h-11">
          <img
            className="aspect-square"
            src="https://cdn-img.thepoizon.ru/node-common/434c72cd-c509-3e7c-ea87-05c431c174c9-48-48.png?x-oss-process=image/resize,s_96/format,webp"
            alt="contact"
            width={20}
            height={20}
          />
          <span className="font-roboto_condensed font-bold text-lg">
            Онлайн-чат
          </span>
        </Button>
      </div>
    </Modal>
  );
};

export default OrderProtectionModal;
