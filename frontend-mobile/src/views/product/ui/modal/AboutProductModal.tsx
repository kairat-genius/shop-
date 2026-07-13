import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface AboutProductModalProps {
  onClose: () => void;
  featureGroups: { title: string; items: { label: string; value: string }[] }[];
}

const AboutProductModal = ({
  onClose,
  featureGroups,
}: AboutProductModalProps) => {
  useBodyScrollLock(true);
  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div
        className="flex items-center justify-between px-[3.733vw] py-[4.8vw] border-b border-slate-100 h-[16vw]"
      >
        <h2 className="text-[4.8vw] font-bold leading-[normal] font-roboto_condensed">
          О ТОВАРЕ
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="py-[4.267vw] px-[3.733vw]">
        {featureGroups.map((feature, index) => (
          <div key={index} className="mb-[5.333vw]">
            <h3 className="mb-[3.2vw] text-[3.733vw] font-medium">{feature.title}</h3>
            <div className="flex flex-col gap-[3.2vw] text-[3.2vw] leading-[3.733vw]">
              {feature.items.map((item) => (
                <div
                  key={index}
                  className="grid grid-cols-2 items-center gap-[3.2vw]"
                >
                  <span className="font-light text-slate-500">
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AboutProductModal;
