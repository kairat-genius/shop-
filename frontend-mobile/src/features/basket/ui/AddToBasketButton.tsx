"use client";

import { ReactNode, useState } from "react";
import useBasket from "@/shared/store/basket";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import type { ProductType } from "@/entities/product-card";
import { useCurrentCurrency } from "@/shared/hooks/useCurrentCurrency";
import Loader from "@/shared/ui/loader";

const BasketAdd = dynamic(() => import("./BasketAdd"), {
  ssr: false,
});

interface AddToBasketButtonProps {
  product: ProductType;
  children: ReactNode;
  className: string;
  onProductSelect?: (product: ProductType) => void;
}

const AddToBasketButton = ({
  product,
  children,
  className,
  onProductSelect,
}: AddToBasketButtonProps) => {
  const { addItem } = useBasket();
  const { currentCurrency } = useCurrentCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setLocalLoading(true);

    try {
      await Promise.all([
        addItem(product.id, currentCurrency.code, 1),
        new Promise((resolve) => setTimeout(resolve, 700)),
      ]);

      if (onProductSelect) {
        onProductSelect(product);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <>
      {localLoading && (
         <Loader/>
      )}

      <Button className={className} onClick={handleAddToCart} type="button">
        {children}
      </Button>
      {isOpen && (
        <BasketAdd product={product} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default AddToBasketButton;
