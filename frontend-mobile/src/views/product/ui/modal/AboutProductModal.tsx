import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { PropertyModuleType } from "@/types/product-detail.type";

interface AboutProductModalProps {
  onClose: () => void;
  propertyModule?: PropertyModuleType;
}

const AboutProductModal = ({
  onClose,
  propertyModule,
}: AboutProductModalProps) => {
  useBodyScrollLock(true);

  const propertyBlocks = propertyModule?.propertyBlocks ?? [];

  const mainBlock = propertyModule?.propertyBlocks.find(
    (block) => block.type === "main",
  );
  const otherBlocks = propertyBlocks.filter((block) => block.type !== "main");
  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between px-[3.733vw] py-[4.8vw] border-b border-slate-100 h-[16vw]">
        <h2 className="text-[4.8vw] font-bold leading-[normal] font-roboto_condensed">
          О ТОВАРЕ
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="h-[60%]">
        <div className="py-[4.267vw] px-[3.733vw] h-[60vh] scrollbar-none overflow-scroll">
          {mainBlock && (
            <div className="mb-[5.333vw] p-[3.2vw] grid grid-cols-2 gap-[3.2vw] bg-slate-150">
              {mainBlock.propertyList.map((item, index) => (
                <div className="flex flex-col gap-[1.067vw]" key={index}>
                  <div className=""></div>
                  <div className="text-[3.2vw] leading-[3.733vw] font-light line-clamp-1">
                    {item.name}
                  </div>
                  <div className="text-[3.2vw] leading-[4.8vw]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
          {otherBlocks.map((feature, index) => (
            <div key={index} className="mb-[5.333vw]">
              <h3 className="mb-[3.2vw] text-[3.733vw] font-medium">
                {feature.title}
              </h3>
              <div className="flex flex-col gap-[3.2vw] text-[3.2vw] leading-[3.733vw]">
                {feature.propertyList.map((item) => (
                  <div
                    key={`${feature.type}-${item.name}`}
                    className="grid grid-cols-2 items-center gap-[3.2vw]"
                  >
                    <span className="font-light text-slate-500">
                      {item.name}
                    </span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AboutProductModal;
