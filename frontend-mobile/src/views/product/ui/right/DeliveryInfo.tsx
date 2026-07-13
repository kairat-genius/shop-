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
    <div className="px-[3.733vw] pt-[3.2vw]">
      <Button
        className="flex-col w-full items-start"
        onClick={() => setIsDeliveryModalOpen(true)}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-[1.6vw]">
            <img
              className="w-[4.267vw] h-[4.267vw]"
              src="https://cdn-img.thepoizon.ru/node-common/4bdd1249-8c93-6364-0f24-468aa275fc24-48-48.png?x-oss-process=image/resize,s_96/format,webp"
              alt="DELIVERY"
              loading="lazy"
            />
            <div className="flex-1 text-[3.2vw] leading-[3.733vw] pt-px">
              Срок доставки по адресу:{" "}
              <span className="underline">Москву,ЦФО</span>
            </div>
          </div>
          <Icon
            icon="chevron-right"
            className="ml-[3.2vw] text-slate-400 w-[3.2vw] h-[3.2vw]"
          />
        </div>
        <div className="pl-[5.867vw] mt-[3.2vw] grid grid-cols-2 gap-[1.6vw] w-full text-left text-[2.933vw] leading-[4.267vw] font-light" >
          <div className="bg-slate-50 px-[2.133vw] py-[1.6vw] rounded-[.533vw]">
            <div className="truncate">Бесплатная доставка</div>
            <div>19 июл. – 23 июл.</div>
          </div>
          <div className="bg-slate-50 px-[2.133vw] py-[1.6vw] rounded-[.533vw] relative overflow-hidden">
            <div className="truncate">Ускоренная доставка</div>
            <div>10 июл. – 14 июл.</div>
            <img
              className="top-[1.067vw] absolute right-[-2.133vw] w-[13.333vw] h-[13.333vw]"
              src="https://cdn-img.thepoizon.ru/node-common/cad0af9c-c6b9-923e-1702-88b542cf4906-126-120.png?x-oss-process=image/format,webp"
              alt="arrow"
              loading="lazy"
            />
          </div>
        </div>
      </Button>
      <Button
        onClick={() => setIsProtectionModalOpen(true)}
        className="mt-[3.2vw] items-start justify-between"
      >
        <img
          className="w-[4.267vw] h-[4.267vw]"
          src="https://cdn-img.thepoizon.ru/node-common/7eed8461-07b8-f62c-8cac-18aa10eabd13-48-48.png?x-oss-process=image/resize,s_96/format,webp"
          alt="SecurityShopping"
          loading="lazy"
        />
        <div className="flex flex-wrap items-center text-[3.2vw] leading-[3.733vw] pt-px ml-[1.6vw]">
          <span>7-дневный безусловный возврат</span>
          <span className="w-px h-[2.133vw] mx-[1.6vw] bg-slate-300" />
          <span>Поддержка 24/7</span>
          <span className="w-px h-[2.133vw] mx-[1.6vw] bg-slate-300" />
          <span>Покупка с уверенностью</span>
        </div>
        <Icon
          icon="chevron-right"
          className="ml-[3.2vw] text-slate-400 w-[3.2vw] h-[3.2vw]"
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
