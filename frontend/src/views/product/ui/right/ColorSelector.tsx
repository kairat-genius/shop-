import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/shared/ui/action";

const SizeGuideModal = dynamic(() => import("../modal/SizeGuideModal"), {
  ssr: false,
});

interface ColorSelectorProps {
  saleProperty: SalePropertiesType;
}

const ColorSelector = ({ saleProperty }: ColorSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    activeSku,
    selectSku,
    selectProduct,
    selectedPropertyValueIds,
    productData: {
      sizeImageList,
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

  if (defaultSizes.length <= 1) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate font-roboto_condensed text-[16px] font-bold">
          {saleProperty.name}:
          <span className="ml-1 font-roboto text-[14px] font-bold">
            {
              defaultSizes.find(
                (item) => item.propertyValueId === activeValueId,
              )?.value
            }
          </span>
        </span>

        {saleProperty.showGuide === 1 && (
          <button
            type="button"
            className="flex shrink-0 items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="https://cdn-img.thepoizon.ru/node-common/935e5df6-1d97-27c8-3944-f1ad4784f80d.svg"
              alt="Показать гайд размера"
            />

            <span className="text-[12px] text-slate-500">
              {saleProperty.guideTip}
            </span>

            <Icon
              icon="chevron-right"
              width={12}
              height={12}
              className="shrink-0 text-slate-500"
            />
          </button>
        )}
      </div>

      <div className="grid grid-cols-6">
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
                "border shrink-0",
                isSelected
                  ? "border-slate-950"
                  : "border-[rgba(20,21,26,0.03)]",
              )}
            >
              <img
                className="aspect-square object-contain"
                src={defaultItem.url}
                alt={defaultItem.value}
              />
            </Button>
          );
        })}
      </div>
      {isModalOpen && (
        <SizeGuideModal
          onClose={() => setIsModalOpen(false)}
          sizeImageList={sizeImageList}
          title={saleProperty.guideTip}
        />
      )}
    </div>
  );
};

export default ColorSelector;
