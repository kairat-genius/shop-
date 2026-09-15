import Popover from "@/shared/ui/popover";
import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";

interface EditionSelectorProps {
  saleProperty: SalePropertiesType;
}

const EditionSelector = ({ saleProperty }: EditionSelectorProps) => {
  const { activeSku, selectSku } = useProductDetailData();

  const activeValueId =
    activeSku?.properties.find((property) =>
      saleProperty.propertyList.some((group) =>
        group.propertyItemModels.some(
          (item) => item.propertyValueId === property.propertyValueId,
        ),
      ),
    )?.propertyValueId ?? null;

  const items = saleProperty.propertyList.flatMap(
    (property) => property.propertyItemModels,
  );

  return (
    <div className="mt-6">
      <div className="mb-2 font-roboto_condensed font-bold text-[16px] leading-[100%] line-clamp-1">
        {saleProperty.name}
      </div>
      <div className="grid grid-cols-3">
        {items.map((item) => {
          const isSelected = item.propertyValueId === activeValueId;

          return (
            <div
              key={item.propertyValueId}
              onClick={() => selectSku(item.propertyValueId)}
              className={cn(
                "group relative flex items-center justify-center flex-col h-12 cursor-pointer px-2",
                isSelected
                  ? "border border-slate-950"
                  : "border-t border-r border-b border-slate-100",
              )}
            >
              <Popover>
                <div className="flex h-6 max-w-70 font-light items-center text-[12px]">
                  {item.value}
                </div>
              </Popover>
              <div className="text-[14px] leading-4 line-clamp-1 font-medium text-center">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditionSelector;
