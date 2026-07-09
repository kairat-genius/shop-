"use client";
import Icon from "@/shared/icon";
import useModal from "@/shared/store/modal";
import useBasket from "@/shared/store/basket";
import { Button, LinkButton } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import Link from "next/link";
import { useCatalogData } from "@/shared/context/catalog-data";
import { useCurrentCurrency } from "@/shared/hooks/useCurrentCurrency";
import PaymentSystems from "@/shared/ui/payment-systems";
import { useEffect } from "react";
import { getImageUrl } from "@/shared/utils/getImageUrl";
import Loader from "@/shared/ui/loader";

const Basket = () => {
  const { closeModal } = useModal();
  const { categoryData } = useCatalogData();
  // 2. Достаем fetchCart из нашего хука корзины
  const { cart, removeItem, setQuantity, isLoading, fetchCart } = useBasket();
  const { currentCurrency } = useCurrentCurrency();

  // 3. Запрашиваем полную корзину при открытии модалки или смене валюты
  useEffect(() => {
    fetchCart(currentCurrency.code);
  }, [currentCurrency.code, fetchCart]);

  const items = cart?.items || [];
  const totalItems = cart?.total_items || 0;

  const subtotal = cart?.total || 0;
  const totalWithoutDiscount = cart?.total_without_discount || 0;
  const savings = totalWithoutDiscount - subtotal;

  return (
    <Modal
      onClose={closeModal}
      className="max-w-lg flex flex-col h-full overflow-y-auto"
      closeButtonClassName="h-6 w-6 right-3.75 md:right-5 top-3.5"
      overlayClassName="justify-end items-start"
    >
      <div className="h-13.5 flex justify-center items-center py-3.75">
        <div className="absolute left-3.75 md:left-5 top-4 text-base leading-none text-gray-500">
          {totalItems} товаров
        </div>
        <h2 className="text-base font-bold text-center uppercase leading-none">
          Ваша корзина
        </h2>
      </div>
      {items.length === 0 ? (
        <div className="px-3.75 md:px-5 pb-3.75 md:pb-5 pt-8.75 md:pt-10 bg-gray-100 mb-auto flex flex-col gap-[7.5px] md:gap-2.5">
          <h2 className="text-[21px] leading-[1.2] font-medium text-center">
            Ваша корзина пуста
          </h2>
          <p className="text-sm leading-none text-gray-500 text-center">
            Купи 4 чехла — заплати за 2
          </p>
          <div className="mt-10 flex flex-col gap-[7.5px] md:gap-2.5">
            {categoryData.map((item, index) => (
              <LinkButton
                onClick={closeModal}
                href={`/category/${item.slug}`}
                key={index}
                className="bg-white border border-gray-250 w-10/12 mx-auto justify-start"
              >
                <div className="w-4/12 pr-5 overflow-hidden">
                  <img
                    src={getImageUrl(`${item.icon}?width=200`)}
                    alt={item.name}
                    className="object-cover aspect-square"
                    loading="lazy"
                    height={128}
                    width={128}
                  />
                </div>
                <div className="font-medium text-[13px] leading-none uppercase">
                  {item.name}
                </div>
              </LinkButton>
            ))}
          </div>
        </div>
      ) : (
        <>
          {isLoading && <Loader />}
          <div className="overflow-y-auto h-full flex flex-col">
            <div className="px-3.75 md:px-5 flex flex-col mb-auto">
              {items.map((it) => (
                <div
                  key={it.slug}
                  className="flex gap-3.75 justify-between py-3.75 border-b border-gray-250"
                >
                  <div className="flex gap-3.75">
                    <Link
                      aria-label={`View ${it.title}`}
                      href={`/products/${it.slug}`}
                      className="block shrink-0"
                      onClick={closeModal}
                    >
                      <img
                        className="aspect-square object-contain w-23.75 h-23.75 shrink-0"
                        src={getImageUrl(`${it.cover}?width=100`)}
                        alt={it.title}
                        loading="lazy"
                        width={95}
                        height={95}
                      />
                    </Link>
                    <div className="flex flex-col gap-1.25 justify-between">
                      <Link
                        href={`/products/${it.slug}`}
                        className="text-sm leading-[1.2] font-medium"
                        onClick={closeModal}
                      >
                        {it.title}
                      </Link>
                      <div className="text-sm leading-none font-medium flex gap-1.5 items-center">
                        {it.compare_price ? (
                          <>
                            <span className="line-through text-gray-500">
                              {it.compare_price} {currentCurrency.symbol}
                            </span>
                            <span>
                              {it.price} {currentCurrency.symbol}
                            </span>
                            {it.discount_percent && (
                              <span className="bg-red-600 text-white text-xs px-1">
                                -{it.discount_percent}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span>
                            {it.price} {currentCurrency.symbol}
                          </span>
                        )}
                      </div>
                      {it.promotion && it.gift_quantity > 0 && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] leading-none font-medium uppercase">
                            Купи {it.promotion.buy_quantity} — заплати за{" "}
                            {it.promotion.pay_quantity}
                          </span>
                          <span className="text-xs leading-none font-medium p-1 bg-[#E5F5EE] text-green">
                            Подарок: {it.gift_quantity} шт.
                          </span>
                        </div>
                      )}
                      <div className="mt-auto flex bg-white border border-gray-250 justify-center items-center w-fit">
                        <Button
                          className="h-8 w-8"
                          onClick={() =>
                            setQuantity(
                              it.id,
                              Math.max(0, it.quantity - 1),
                              currentCurrency.code,
                            )
                          }
                        >
                          <Icon icon="minus" width={16} height={16} />
                        </Button>
                        <span className="h-8 w-8 flex justify-center items-center text-sm leading-none">
                          {it.quantity - it.gift_quantity}
                        </span>
                        <Button
                          className="h-8 w-8"
                          onClick={() =>
                            setQuantity(
                              it.id,
                              it.quantity + 1,
                              currentCurrency.code,
                            )
                          }
                        >
                          <Icon icon="plus" width={16} height={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-7.5 h-7.5 opacity-70 transition-opacity hover:opacity-100 shrink-0"
                    aria-label="Remove Item"
                    onClick={() => removeItem(it.id, currentCurrency.code)}
                  >
                    <Icon icon="x" width={24} height={24} strokeWidth={1} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="px-3.75 md:px-5 pt-3.75 space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-base font-bold leading-none">Итого</div>

                <div className="flex items-center gap-2">
                  {savings > 0 && (
                    <span className="text-gray-500 line-through text-base font-medium">
                      {totalWithoutDiscount} {currentCurrency.symbol}
                    </span>
                  )}

                  <span className="text-base font-bold leading-none">
                    {subtotal} {currentCurrency.symbol}
                  </span>
                </div>
              </div>
              {savings > 0 && (
                <div className="border border-green bg-[#E5F5EE] px-3 py-2 flex items-center justify-between">
                  <div className="text-sm leading-none text-green">
                    Ваша выгода
                  </div>

                  <div className="text-sm font-medium text-green">
                    {savings} {currentCurrency.symbol}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-3.75 md:px-5 pt-[7.5px] pb-3.75 flex flex-col justify-center items-center">
            <LinkButton
              href="/order"
              onClick={closeModal}
              className="uppercas not-only:h-12.5 w-full text-base leading-none font-bold bg-green text-white mb-3.75 gap-[7.5px]"
            >
              <Icon icon="lock-keyhole" width={20} height={20} />
              БЕЗОПАСНО ОПЛАТИТЬ
              <div>
                {subtotal} {currentCurrency.symbol}
              </div>
            </LinkButton>
            <PaymentSystems className="lg:flex-col gap-2 lg:gap-2" />
          </div>
        </>
      )}
    </Modal>
  );
};

export default Basket;
