import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface StarRatingInfoModalProps {
  onClose: () => void;
}

const StarRatingInfoModal = ({ onClose }: StarRatingInfoModalProps) => {
  useBodyScrollLock(true);

  return (
    <Modal
      onClose={onClose}
      className="bg-white max-w-130 flex flex-col rounded-sm"
    >
      <div className="flex items-center justify-between px-8 py-6 w-full border-b border-slate-100">
        <h2 className="text-[20px] font-bold text-center tracking-[-.5px] leading-5.75 font-roboto_condensed">
          Рейтинг звезд
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="h-full px-8 pb-8">
        <div className="overflow-y-auto leading-4.5 max-h-[50vh] px-3.5 py-5 text-[16px]">
          Отзывы покупателей в комплекте с рейтингом звезд предоставляют богатые
          понимания наших товаров, и помогают клиентам решить, соответствует ли
          товар их потребностям. Мы используем изощренные алгоритмы машинного
          обучения вместо базового усреднения в целях обеспечения
          действительности и точности отзывов и рейтингов. Алгоритмы принимают
          во внимание множество факторов, включая новизну и релевантность
          контента, и предоставляют более детализированную оценку по
          аутентичности и надежности отзыва. Применяя многомерные критерии, в
          полной мере мы привержены усилиям предоставлять самый достоверный
          справочник по покупкам в обеспечении информированного и достоверного
          опыта у наших пользователей.
        </div>
      </div>
    </Modal>
  );
};

export default StarRatingInfoModal;
