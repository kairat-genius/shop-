import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";
import dynamic from "next/dynamic";
import { useState } from "react";
import Popover from "@/shared/ui/popover";

const SizeFinderModal = dynamic(() => import("../modal/SizeFinderModal"), {
  ssr: false,
});

interface SizeSelectorProps {
  saleProperty: SalePropertiesType;
}

const SizeSelector = ({ saleProperty }: SizeSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    activeSku,
    selectSku,
    productData: {
      buyDialogModel: { skus, offSizeInfo },
    },
    productId,
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

  const activeSize = defaultSizes.find((item) =>
    activeSku?.properties.some(
      (property) => property.propertyValueId === item.propertyValueId,
    ),
  );

  const activeFootLength = activeSize?.sizeParameterList?.[0]?.sizeValue;

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate font-roboto_condensed text-[16px] font-bold">
          {saleProperty.name}:
          <span className="ml-1 font-roboto text-[14px] font-bold">
            <span>{defaultSizeKey}</span>

            {secondarySizeGroup && (
              <span className="ml-0.5 text-slate-500">
                ({secondarySizeGroup.propertyKey})
              </span>
            )}
          </span>
        </span>

        {saleProperty.showGuide === 1 && (
          <button
            type="button"
            className="flex shrink-0 items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              className="pS"
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

      <div
        className={cn(
          "grid grid-cols-4 text-center",
          "[&>*:nth-child(-n+4)]:border-t",
          "[&>*:nth-child(-n+4)]:border-t-slate-100",
          "[&>*:nth-child(4n+1)]:border-l",
          "[&>*:nth-child(4n+1)]:border-l-slate-100",
        )}
      >
        {defaultSizes.map((defaultItem, index) => {
          const secondaryItem = secondarySizes[index];

          const sku = skus.find((item) =>
            item.properties.some(
              (property) =>
                property.propertyValueId === defaultItem.propertyValueId,
            ),
          );

          const isSelected = activeSku?.skuId === sku?.skuId;

          const price =
            sku?.skuSpeedInfo?.[0]?.speedPrice?.localizedDisplayText;

          const itemFootLength = defaultItem.sizeParameterList?.[0]?.sizeValue;

          return (
            <div
              key={defaultItem.propertyValueId}
              onClick={() => selectSku(defaultItem.propertyValueId)}
              className={cn(
                "group relative flex h-12 flex-col items-center justify-center border-b border-r border-slate-100 px-2 cursor-pointer",
                isSelected &&
                  "after:absolute after:-left-px after:-top-px after:h-full after:w-full after:border after:border-slate-950",
              )}
            >
              {/* Поповер при наведении сверху */}
              {itemFootLength && (
                <Popover>
                  <div className="max-w-70 flex items-center text-[12px] h-6">
                    <span className="text-slate-500 mr-0.5">Длина стопы:</span>{" "}
                    <span>{itemFootLength}</span>
                  </div>
                </Popover>
              )}

              <div
                className={cn(
                  "truncate font-medium text-[14px] leading-4",
                  !price && "text-slate-300",
                )}
              >
                <span>{defaultItem.value}</span>

                {secondaryItem && (
                  <span className={cn("ml-0.5", price && "text-slate-500")}>
                    ({secondaryItem.value})
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "mt-0.5 truncate text-[12px] leading-3.5",
                  !price && "text-slate-300",
                )}
              >
                {price ?? "-- ₽"}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-2 flex items-center justify-between rounded-sm px-3 py-1"
        style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
      >
        <div className="text-[12px] leading-[14.06px]">
          <span className="ml-0.5 font-light text-slate-500">Длина стопы:</span>

          <span className="ml-0.5">{activeFootLength ?? "--"}</span>
        </div>

        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="shrink-0 text-slate-500"
        />
      </div>
      {offSizeInfo?.deviationSizeTips && (
        <div
          className="mt-3 rounded-xs flex items-center p-1"
          style={{
            background: "linear-gradient(90deg, #fff1f0, #fff)",
          }}
        >
          <img
            className="w-[0.7rem] h-[0.7rem] object-contain"
            src="https://cdn-img.thepoizon.ru/node-common/a1a369ec-79eb-6fd2-c7f5-316db29ff085-42-42.png?x-oss-process=image/resize,s_96/format,webp"
            alt=""
          />

          <div className="text-[12px] ml-1 font-light text-slate-500 leading-[normal]">
            {offSizeInfo.deviationSizeTips}
          </div>
        </div>
      )}
      {isModalOpen && (
        <SizeFinderModal
          onClose={() => setIsModalOpen(false)}
          productId={productId}
        />
      )}
    </div>
  );
};

export default SizeSelector;
