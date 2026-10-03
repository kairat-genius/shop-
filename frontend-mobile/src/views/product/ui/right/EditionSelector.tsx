import { cn } from "@/shared/utils/clsx";
import type { SalePropertiesType } from "@/types/product-detail.type";
import { useProductDetailData } from "../../context/useCatalogData";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

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
    <div className="ml-[3.733vw] flex items-center justify-between">
      <div className="flex items-center gap-[1.067vw]">
        {items.map((item) => {
          const isSelected = item.propertyValueId === activeValueId;

          return (
            <div
              key={item.propertyValueId}
              onClick={() => selectSku(item.propertyValueId)}
              className={cn(
                "group relative min-w-[12.8vw] flex items-center border justify-center flex-col cursor-pointer py-[1.6vw] px-[3.733vw] rounded-[1.0665vw]",
                isSelected
                  ? "border-slate-950"
                  : "border-[rgba(199,199,215,.5)]",
              )}
            >
              <div className="text-[3.733vw] leading-[4.376vw] text-center">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex pr-[3.733vw]">
        <div className="w-[1.733vw] h-full bg-linear-to-l from-white to-transparent" />
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

export default EditionSelector;
