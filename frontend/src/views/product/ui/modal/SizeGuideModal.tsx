import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { SizeImageListType } from "@/types/product-detail.type";

interface SizeGuideModalProps {
  onClose: () => void;
  sizeImageList?: SizeImageListType[];
  title?: string;
}

const SizeGuideModal = ({
  onClose,
  sizeImageList,
  title = "Гайд размера",
}: SizeGuideModalProps) => {
  useBodyScrollLock(true);

  return (
    <Modal onClose={onClose} className="bg-white max-w-160 flex flex-col rounded-sm">
      <div className="flex items-center justify-between px-6 py-4 h-13.75 w-full relative border-b border-slate-100">
        <h2 className="text-[20px] font-bold text-center tracking-[-.5px] leading-5.75 font-roboto_condensed">
          {title}
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" width={20} height={20} />
        </Button>
      </div>

      <div className="overflow-y-auto h-full pt-6 px-6 pb-8 max-h-[70vh] space-y-4">
        {sizeImageList?.map((item, index) => (
          <div key={index}>
            <h3 className="text-[16px] leading-[normal] font-bold font-roboto_condensed mb-3">
              {item.title.charAt(0).toUpperCase() +
                item.title.slice(1).toLowerCase()}
            </h3>
            {item.images.map((image, imageIndex) => (
              <div key={imageIndex}>
                <img className="object-contain" src={image.url} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SizeGuideModal;
