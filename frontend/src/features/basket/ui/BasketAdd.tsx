"use client";
import type { ProductType } from "@/entities/product-card";
import { getSimilar } from "@/shared/api/similar/getSimilar";
import { useCurrentCurrency } from "@/shared/hooks/useCurrentCurrency";
import Icon from "@/shared/icon";
import useModal from "@/shared/store/modal";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { getImageUrl } from "@/shared/utils/getImageUrl";
import Recommendation from "@/widgets/recommendation";
import { useState } from "react";

interface BasketAddProps {
  product: ProductType;
  onClose: () => void;
}

const BasketAdd = ({ product, onClose }: BasketAddProps) => {
  const { openModal } = useModal();
  const [currentProduct, setCurrentProduct] = useState(product);
  const { currentCurrency } = useCurrentCurrency();

  return (
    <Modal
      onClose={onClose}
      className="max-w-lg flex flex-col h-full overflow-y-auto"
      closeButtonClassName="h-6 w-6 left-3.75 md:left-5 top-3.5"
      overlayClassName="justify-end items-start"
    >
      <div className="h-13.5 flex justify-center items-center py-3.75 border-b border-[#eee]">
        <h2 className="text-base font-bold text-center uppercase leading-none">
          ТОВАР ДОБАВЛЕН В КОРЗИНУ
        </h2>
      </div>
      <div>
        {currentProduct && (
          <div className="p-3.75 md:p-5 flex items-center gap-4 border-b border-gray-250 bg-gray-100 relative">
            <img
              src={getImageUrl(`${currentProduct.cover}?width=100`)}
              alt={currentProduct.title}
              height={95}
              width={95}
              className="object-contain border border-gray-250 bg-gray-100 w-23.75 h-23.75 aspect-square shrink-0"
            />

            <div className="flex flex-col pr-10">
              <h3 className="text-base leading-[1.2] font-medium mb-[3.333px]">
                {currentProduct.design}
              </h3>
              <p className="text-xs leading-none text-gray-500 line-clamp-2">
                {currentProduct.title}
              </p>
              <div className="font-medium text-[13px] leading-none flex gap-1.25 items-center mt-2.5">
                {currentProduct.compare_price ? (
                  <>
                    <span className="line-through">
                      {currentProduct.price} {currentCurrency.symbol}
                    </span>
                    <span className="text-red">
                      {currentProduct.compare_price} {currentCurrency.symbol}
                    </span>
                  </>
                ) : (
                  <span>
                    {currentProduct.price} {currentCurrency.symbol}
                  </span>
                )}
              </div>
            </div>
            <div className=" absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-full bg-green text-white">
              <Icon icon="check" aria-hidden width={16} height={16} />
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 p-3.75 md:p-5 gap-3.75 md:gap-5">
          <Button
            className="border p-1 md:p-1.25 text-xs sm:text-sm font-bold uppercase leading-none"
            onClick={onClose}
          >
            ПРОДОЛЖИТЬ ПОКУПКИ
          </Button>

          <Button
            className="p-1 md:p-1.25 text-xs sm:text-sm font-bold uppercase leading-none bg-green text-white"
            onClick={() => openModal("basket")}
          >
            ПЕРЕЙТИ В КОРЗИНУ
          </Button>
        </div>

        <Recommendation
          title="РЕКОМЕНДОВАНО ДЛЯ ВАС"
          productId={currentProduct.id}
          fetchFn={getSimilar}
          className="px-3.75 md:px-5"
          onProductSelect={setCurrentProduct}
          variant="compact"
        />
      </div>
    </Modal>
  );
};

export default BasketAdd;
