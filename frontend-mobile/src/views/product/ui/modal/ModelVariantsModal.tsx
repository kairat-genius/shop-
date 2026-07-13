import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { cn } from "@/shared/utils/clsx";

interface ModelVariantsModalProps {
  onClose: () => void;
  variants: {
    alt: string;
    image: string;
    is_current: boolean;
  }[];
}

const ModelVariantsModal = ({ onClose, variants }: ModelVariantsModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between border-b border-slate-100 h-[14.4vw] px-[3.733vw]">
        <h2 className="font-roboto_condensed leading-[5.6vw] text-[4.8vw] font-bold">
          Модель KAI 2 (15 товаров)
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="px-[3.733vw]">
        <div className="pt-[2.133vw] pb-[19.2vw] grid grid-cols-4 [&>*:nth-child(-n+4)]:border-t [&>*:nth-child(-n+4)]:border-t-slate-100 [&>*:nth-child(4n+1)]:border-l [&>*:nth-child(4n+1)]:border-l-slate-100">
          {variants.map((item, index) => (
            <div
              key={index}
              className={cn(
                "pb-[1.6vw] border-r border-b border-slate-100",
                item.is_current &&
                  "relative after:-top-px after:-left-px after:w-full after:h-full after:absolute after:border after:border-slate-950",
              )}
            >
              <div className="w-[22.667vw] h-[22.667vw]">
                <img
                  loading="lazy"
                  className="w-full h-full aspect-square"
                  src={item.image}
                  alt=""
                />
              </div>
              <span className="text-[3.733vw] font-bold font-roboto_condensed leading-[4.376vw] mt-[1.067vw] flex items-center justify-center">
                12&nbsp;026&nbsp;₽
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModelVariantsModal;
