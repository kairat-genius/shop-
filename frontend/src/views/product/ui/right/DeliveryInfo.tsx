"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import { useState } from "react";

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
              <span className="underline">Москву,ЦФО</span>
            </div>
          </div>
          <Icon
            icon="chevron-right"
            width={14}
            height={14}
            className="shrink-0 text-slate-500 my-1"
          />
        </div>
        <div className="pl-8 mt-2 grid grid-cols-2 gap-2 w-full">
          <div className="h-12 bg-slate-150 text-[12px] leading-4 font-light p-2">
            <div className="truncate">Бесплатная доставка</div>
            <div>19 июл. – 23 июл.</div>
          </div>
          <div className="h-12 bg-slate-150 text-[12px] leading-4 font-light p-2 relative overflow-hidden">
            <div className="truncate">Ускоренная доставка</div>
            <div>10 июл. – 14 июл.</div>
            <img
              className="top-1 absolute -right-2"
              src="https://cdn-img.thepoizon.ru/node-common/cad0af9c-c6b9-923e-1702-88b542cf4906-126-120.png?x-oss-process=image/format,webp"
              alt="arrow"
              width={50}
              height={50}
              loading="lazy"
            />
          </div>
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
