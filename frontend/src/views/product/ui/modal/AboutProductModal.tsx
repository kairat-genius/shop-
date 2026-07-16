import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface AboutProductModalProps {
  onClose: () => void;
  features: { label: string; value: string }[];
}

const AboutProductModal = ({ onClose, features }: AboutProductModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal
      onClose={onClose}
      className="bg-white h-full max-w-135"
      overlayClassName="justify-end"
    >
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "rgba(5, 5, 5, 0.06)" }}
      >
        <h2 className="text-[24px] font-bold leading-[1.4]">О ТОВАРЕ</h2>
        <Button
          type="button"
          className="opacity-70 transition-opacity hover:opacity-100 text-slate-500"
          onClick={onClose}
        >
          <Icon icon="x" width={22} height={22} />
        </Button>
      </div>
      <div className="p-6 flex flex-col gap-3 text-[14px] leading-[100%]">
        {features.map((feature, index) => (
          <div key={index} className="grid grid-cols-2 items-center gap-3">
            <span className="font-light text-slate-500">{feature.label}</span>
            <span>{feature.value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AboutProductModal;
