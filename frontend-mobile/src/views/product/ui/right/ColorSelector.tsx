"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";

interface ColorSelectorProps {
  saleProperty: SalePropertiesType;
}

const ColorSelector = ({ saleProperty }: ColorSelectorProps) => {
  const {
    activeSku,
    selectSku,
    selectProduct,
    selectedPropertyValueIds,
    productData: {
      buyDialogModel: {
        detail: { spuId: currentSpuId },
      },
    },
  } = useProductDetailData();

  const defaultSizeKey = saleProperty.defaultShow;

  const defaultSizeGroup = saleProperty.propertyList.find(
    (property) => property.propertyKey === defaultSizeKey,
  );

  const defaultSizes = defaultSizeGroup?.propertyItemModels ?? [];
  const activeValueId =
    selectedPropertyValueIds[saleProperty.definitionId] ??
    activeSku?.properties.find((property) =>
      defaultSizes.some(
        (item) => item.propertyValueId === property.propertyValueId,
      ),
    )?.propertyValueId ??
    null;

  if (defaultSizes.length <= 0) {
    return null;
  }
  return (
    <div className="flex items-center justify-between">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-[1.067vw] max-w-[84vw]">
          {defaultSizes.map((defaultItem) => {
            const isSelected = defaultItem.propertyValueId === activeValueId;

            return (
              <Button
                key={defaultItem.propertyValueId}
                onClick={() =>
                  defaultItem.spuId === currentSpuId
                    ? selectSku(defaultItem.propertyValueId)
                    : void selectProduct(defaultItem.spuId)
                }
                className={cn(
                  "border rounded-[2.133vw] shrink-0 first:ml-[3.733vw] overflow-hidden",
                  isSelected
                    ? "border-slate-950"
                    : "border-[rgba(199,199,215,.5)]",
                )}
              >
                <img
                  className="aspect-square w-[11.733vw] h-[11.733vw] object-contain"
                  src={defaultItem.url}
                  alt={defaultItem.value}
                />
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex pr-[3.733vw]">
        <div className="w-[3.733vw] h-full bg-linear-to-l from-white to-transparent" />
        <Button className="bg-white ml-[1.6vw] text-slate-500">
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </Button>
      </div>
    </div>
  );
};

export default ColorSelector;
