"use client";
import Icon from "@/shared/icon";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useProductDetailData } from "../../context/useCatalogData";
import { SalePropertiesType } from "@/types/product-detail.type";
import { cn } from "@/shared/utils/clsx";

const SizeSelectorModal = dynamic(() => import("../modal/SizeSelectorModal"), {
  ssr: false,
});

interface SizeSelectorProps {
  saleProperty: SalePropertiesType;
}

const SizeSelector = ({ saleProperty }: SizeSelectorProps) => {
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const {
    activeSku,
    selectSku,
    productData: {
      buyDialogModel: { skus, saleProperties },
    },
  } = useProductDetailData();

  const defaultSizeKey = saleProperty.defaultShow;

  const defaultSizeGroup = saleProperty.propertyList.find(
    (property) => property.propertyKey === defaultSizeKey,
  );

  const secondarySizeGroup = saleProperty.propertyList.find(
    (property) => property.propertyKey !== defaultSizeKey,
  );

  const defaultSizes = defaultSizeGroup?.propertyItemModels ?? [];
  const secondarySizes = secondarySizeGroup?.propertyItemModels ?? [];

  const activeValueId =
    activeSku?.properties.find((property) =>
      defaultSizes.some(
        (item) => item.propertyValueId === property.propertyValueId,
      ),
    )?.propertyValueId ?? null;

  const activeColorValueId =
    activeSku?.properties.find((property) =>
      saleProperties.some(
        (salePropertyItem) =>
          salePropertyItem.definitionId === 1 &&
          salePropertyItem.propertyList.some((group) =>
            group.propertyItemModels.some(
              (item) => item.propertyValueId === property.propertyValueId,
            ),
          ),
      ),
    )?.propertyValueId ?? null;

  const activeEditionValueId =
    activeSku?.properties.find((property) =>
      saleProperties.some(
        (salePropertyItem) =>
          salePropertyItem.definitionId === 12 &&
          salePropertyItem.propertyList.some((group) =>
            group.propertyItemModels.some(
              (item) => item.propertyValueId === property.propertyValueId,
            ),
          ),
      ),
    )?.propertyValueId ?? null;

  const activeSize = defaultSizes.find(
    (item) => item.propertyValueId === activeValueId,
  );

  const activeFootLength = activeSize?.sizeParameterList?.[0]?.sizeValue;

  return (
    <div className="mt-[2.667vw] mb-[3.2vw]">
      <div className="flex items-center justify-between mb-[2.133vw] px-[3.733vw]">
        <span className="truncate text-[3.2vw] leading-[3.749vw]">Размер</span>
        <div className="flex items-center gap-[.533vw]">
          <img
            className="w-[3.2vw] h-[3.2vw] ml-[.533vw]"
            src="https://cdn-img.thepoizon.ru/node-common/935e5df6-1d97-27c8-3944-f1ad4784f80d.svg"
            alt="showsizeguide"
          />

          <div className="text-[2.933vw] leading-[normal] text-slate-500">
            Гайд размера
          </div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </div>
      </div>
      <div className="flex relative px-[3.733vw] overflow-hidden">
        <div className="flex flex-col items-center justify-between gap-[.533vw] pr-[1.067vw] py-[1.6vw] text-[3.733vw] leading-[100%] max-w-[18.667vw] font-medium">
          <div>RU</div>
          <div className="text-slate-500">EU</div>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <div className="flex pb-px gap-[1.067vw] text-[3.733vw] leading-[4.376vw]">
            {defaultSizes.map((defaultItem, index) => {
              const secondaryItem = secondarySizes[index];

              const sku = skus.find(
                (item) =>
                  item.properties.some(
                    (property) =>
                      property.propertyValueId === defaultItem.propertyValueId,
                  ) &&
                  (activeColorValueId === null ||
                    item.properties.some(
                      (property) =>
                        property.propertyValueId === activeColorValueId,
                    )) &&
                  (activeEditionValueId === null ||
                    item.properties.some(
                      (property) =>
                        property.propertyValueId === activeEditionValueId,
                    )),
              );

              const isSelected = defaultItem.propertyValueId === activeValueId;

              const price =
                sku?.skuSpeedInfo?.[0]?.speedPrice?.localizedDisplayText;

              return (
                <div
                  key={index}
                  onClick={() => selectSku(defaultItem.propertyValueId)}
                  className="relative px-[3.733vw] py-[1.6vw] max-w-[53.333vw] flex flex-col items-center justify-center last:pr-[10.667vw]"
                >
                  <div
                    className={cn(
                      "mt-[.533vw] font-light",
                      !price && "text-slate-300",
                    )}
                  >
                    {defaultItem.value}
                  </div>
                  {secondaryItem && (
                    <span className="text-slate-300 mt-[.533vw] font-light">
                      {secondaryItem.value}
                    </span>
                  )}
                  <div
                    className={cn(
                      "absolute rounded-[2.133vw] border pointer-events-none",
                      isSelected ? "border-slate-950 w-full h-full" : "border-slate-300 scale-50  border-dashed w-[200%] h-[200%]"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="h-full absolute right-0 top-0 flex items-center"
          onClick={() => setIsSizeModalOpen(true)}
        >
          <div className="h-full w-[3.733vw] bg-linear-to-l from-white to-transparent" />
          <div className="bg-white h-full flex items-center w-[8.533vw]">
            <Icon
              icon="chevron-right"
              className="w-[3.2vw] h-[3.2vw] ml-[1.6vw] text-slate-400"
            />
          </div>
        </div>
      </div>
      <div className="rounded-[1.067vw] flex items-center justify-between mt-[2.133vw] py-[1.067vw] px-[3.2vw] bg-[rgba(245,245,249,.6)] mx-[3.733vw]">
        <div className="text-[3.2vw] leading-[3.749vw]">
          <span className="text-slate-500 mr-[.533vw] font-light">
            Длина стопы:
          </span>
          <span>{activeFootLength ?? "--"}</span>
        </div>
        <Icon
          icon="chevron-right"
          className="w-[3.2vw] h-[3.2vw] text-slate-400"
        />
      </div>
      {isSizeModalOpen && (
        <SizeSelectorModal onClose={() => setIsSizeModalOpen(false)} />
      )}
    </div>
  );
};

export default SizeSelector;
