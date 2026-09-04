import { PropertyModuleDto } from "@/shared/api/openapi";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

interface AboutProductModalProps {
  onClose: () => void;
  propertyModule?: PropertyModuleDto;
}

const AboutProductModal = ({
  onClose,
  propertyModule,
}: AboutProductModalProps) => {
  useBodyScrollLock(true);

  const propertyBlocks = propertyModule?.propertyBlocks ?? [];

  const mainBlock = propertyBlocks.find((block) => block.type === "main");

  const otherBlocks = propertyBlocks.filter((block) => block.type !== "main");

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
      <div className="p-6 flex flex-col gap-5 text-[14px] leading-[100%]">
        {mainBlock && mainBlock.propertyList.length > 0 && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-150">
            {mainBlock.propertyList.map((property, index) => (
              <div className="flex flex-col gap-1" key={`main-${index}`}>
                <span className="font-light text-slate-950">
                  {property.name}
                </span>
                <span className="leading-4.5 line-clamp-2">
                  {property.value}
                </span>
              </div>
            ))}
          </div>
        )}
        {otherBlocks.map((block, blockIndex) => (
          <div key={`${block.type}-${blockIndex}`}>
            <div className="text-[18px] font-bold mb-3">{block.title}</div>
            <div className="px-3 leading-4.5 text-[14px]">
              {block.propertyList.map((property, propertyIndex) => (
                <div
                  key={`${blockIndex}-${propertyIndex}`}
                  className="grid grid-cols-2 items-center gap-3 mb-3"
                >
                  <span className="text-slate-500 font-light">
                    {property.name}
                  </span>
                  <span>{property.value}</span>
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
