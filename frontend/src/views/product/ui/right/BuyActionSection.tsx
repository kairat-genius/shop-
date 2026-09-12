import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { useProductDetailData } from "../../context/useCatalogData";

const BuyActionSection = () => {
  const {
    productData: { favoriteNum },
    activeSku,
  } = useProductDetailData();

  console.log(activeSku);
  return (
    <div className="z-1 flex items-center gap-6 w-full sticky bottom-0 left-0 right-0 py-4 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {favoriteNum && (
        <FavoriteButton className="w-10 shrink-0 h-9 flex-col">
          <Icon icon="heart" width={24} height={24} />
          <div className="text-[9px] leading-2.75 mt-px font-medium">
            {favoriteNum}
          </div>
        </FavoriteButton>
      )}
      <Button className="px-3.75 h-12 py-0.75 bg text-[20px] font-bold font-roboto_condensed w-full bg-teal-350 rounded-sm">
        {activeSku?.minPrice?.localizedDisplayText
          ? `Купить за ${activeSku.minPrice.localizedDisplayText}`
          : "Сообщить о поступлении"}
      </Button>
    </div>
  );
};

export default BuyActionSection;
