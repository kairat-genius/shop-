"use client";
import Icon from "@/shared/icon";
import useModal from "@/shared/store/modal";
import { Button } from "@/shared/ui/action";
import useBasket from "@/shared/store/basket";
import { useEffect, useState } from "react";

const OpenBasketButton = () => {
  const { openModal } = useModal();
  const { cartCount, fetchCartCount } = useBasket();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchCartCount();
    }
  }, [fetchCartCount, mounted]);

  return (
    <Button
      className="relative h-6.25"
      onClick={() => openModal("basket")}
      aria-label="Open shopping cart"
    >
      <Icon icon="basket" width={25} height={25} className="text-sage-600" />
      <span className="absolute inset-0 flex items-center justify-center translate-y-1 text-xs text-white">
        {mounted && cartCount > 0 ? cartCount : ""}
      </span>
    </Button>
  );
};

export default OpenBasketButton;
