"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useState } from "react";
import dynamic from "next/dynamic";
import { SeriesDialogModelType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";

const ModelVariantsModal = dynamic(
  () => import("@/features/model-variants"),
  {
    ssr: false,
  },
);

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
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const { selectProduct, isLoading } = useProductDetailData();

  return (
    <div className="flex">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-[1.067vw] max-w-[84vw]">
          {seriesDialogModel.seriesSpuList.map((item) => (
            <Button
              key={item.spuId}
              onClick={() => selectProduct(item.spuId)}
              disabled={isLoading || item.spuId === productId}
              className={cn(
                "border rounded-[2.133vw] shrink-0 first:ml-[3.733vw] overflow-hidden",
                item.spuId === productId
                  ? "border-slate-950"
                  : "border-[rgba(199,199,215,.5)]",
              )}
            >
              <img
                className="aspect-square w-[11.733vw] h-[11.733vw] object-contain"
                src={item.logoUrl}
                alt={`${item.spuId}`}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex pr-[3.733vw]">
        <div className="w-[3.733vw] h-full bg-linear-to-l from-white to-transparent" />
        <Button
          className="bg-white ml-[1.6vw] text-slate-500"
          onClick={() => setIsModelModalOpen(true)}
        >
          <div className="text-[3.2vw] leading-[3.749vw]">
            +{seriesDialogModel.spuCount}
          </div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </Button>
      </div>

      {isModelModalOpen && (
        <ModelVariantsModal
          categoryId={categoryId}
          dialogTitle={seriesDialogModel.dialogTitle}
          seriesId={seriesDialogModel.seriesId}
          selectProduct={selectProduct}
          onClose={() => setIsModelModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ModelVariants;
