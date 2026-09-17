import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import type { SeriesDialogModelType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";
import { useState } from "react";
import dynamic from "next/dynamic";

const ModelVariantsModal = dynamic(() => import("@/features/model-variants"), {
  ssr: false,
});

interface ModelVariantsProps {
  seriesDialogModel: SeriesDialogModelType;
  productId: number;
  categoryId: number;
}

const ModelVariants = ({
  seriesDialogModel,
  productId,
  categoryId,
}: ModelVariantsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectProduct, isLoading } = useProductDetailData();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-roboto_condensed font-bold text-[16px] leading-4">
          {seriesDialogModel.dialogTitle}
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer"
        >
          <Icon
            icon="chevron-right"
            width={12}
            height={12}
            className="text-slate-500"
          />
        </button>
      </div>
      <div className="grid grid-cols-6">
        {seriesDialogModel.seriesSpuList.map((item) => (
          <Button
            key={item.spuId}
            onClick={() => selectProduct(item.spuId)}
            disabled={isLoading || item.spuId === productId}
            className={cn(
              "border shrink-0",
              item.spuId === productId
                ? "border-slate-950"
                : "border-[rgba(20,21,26,0.03)]",
            )}
          >
            <img
              className="aspect-square object-contain"
              src={item.logoUrl}
              alt={`${item.spuId}`}
            />
          </Button>
        ))}
      </div>
      {isModalOpen && (
        <ModelVariantsModal
          categoryId={categoryId}
          dialogTitle={seriesDialogModel.dialogTitle}
          selectProduct={selectProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ModelVariants;
