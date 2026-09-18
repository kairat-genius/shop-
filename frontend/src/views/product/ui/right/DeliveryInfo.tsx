"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useProductDetailData } from "../../context/useCatalogData";

const DeliveryModal = dynamic(() => import("../modal/DeliveryModal"), {
  ssr: false,
});
const OrderProtectionModal = dynamic(
  () => import("../modal/OrderProtectionModal"),
  { ssr: false },
);

const DeliveryInfo = () => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isProtectionModalOpen, setIsProtectionModalOpen] = useState(false);

  const { activeSku } = useProductDetailData();
  const deliveryInfoModel = activeSku?.skuSpeedInfo?.[0]?.deliveryInfoModel;
  return (
    <div className="px-4 py-3.5 mt-4">
      <Button
        className="flex-col w-full items-start"
        onClick={() => setIsDeliveryModalOpen(true)}
      >
        <div className="flex items-center justify-between gap-2.5 w-full">
          <div className="flex items-center gap-2.5">
            <img
              className=""
              width={22}
              height={22}
              src="https://cdn-img.thepoizon.ru/node-common/4bdd1249-8c93-6364-0f24-468aa275fc24-48-48.png?x-oss-process=image/resize,s_96/format,webp"
              alt="DELIVERY"
              loading="lazy"
            />
            <div className="flex-1 text-[14px] leading-4 pt-0.75">
              Срок доставки по адресу:{" "}
              <span className="underline">Минск:ЦФО</span>
            </div>
          </div>
          <Icon
            icon="chevron-right"
            width={14}
            height={14}
            className="shrink-0 text-slate-500 my-1"
          />
        </div>

        <div className="pl-8 mt-2 w-full">
          {deliveryInfoModel?.deliveryItems
            .filter((item) => item.deliveryType !== 1)
            .map((item, index) => (
              <div
                key={index}
                className="relative h-12 overflow-hidden bg-slate-150 p-2 text-[12px] font-light leading-4"
              >
                <div className="truncate">{item.deliveryTypeText}</div>
                <div>{item.deliveryTimeText}</div>
              </div>
            ))}
        </div>
      </Button>
      <Button
        onClick={() => setIsProtectionModalOpen(true)}
        className="mt-4 flex items-start justify-between gap-2.5"
      >
        <img
          className=""
          width={22}
          height={22}
          src="https://cdn-img.thepoizon.ru/node-common/7eed8461-07b8-f62c-8cac-18aa10eabd13-48-48.png?x-oss-process=image/resize,s_96/format,webp"
          alt="SecurityShopping"
          loading="lazy"
        />
        <div className="flex flex-wrap items-center text-[14px] leading-4 pt-0.75">
          <span>7-дневный безусловный возврат</span>
          <span className="w-px h-2 mx-[6.5px] bg-slate-300"></span>
          <span>Поддержка 24/7</span>
          <span className="bpm"></span>
          <span>Покупка с уверенностью</span>
        </div>
        <Icon
          icon="chevron-right"
          width={14}
          height={14}
          className="shrink-0 text-slate-500 my-1"
        />
      </Button>

      {isDeliveryModalOpen && (
        <DeliveryModal onClose={() => setIsDeliveryModalOpen(false)} />
      )}
      {isProtectionModalOpen && (
        <OrderProtectionModal onClose={() => setIsProtectionModalOpen(false)} />
      )}
    </div>
  );
};

export default DeliveryInfo;
