"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { generateProductSlug } from "@/shared/utils/slug";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useProductDetailData } from "../../context/useCatalogData";

const AboutProductModal = dynamic(() => import("../modal/AboutProductModal"), {
  ssr: false,
});

const AboutProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    productData: { propertyModule, brandItemsModel, seriesItemsModel },
  } = useProductDetailData();

  const mainBlock = propertyModule?.propertyBlocks.find(
    (block) => block.type === "main",
  );

  const minorBlock = propertyModule?.propertyBlocks.find(
    (block) => block.type === "minor",
  );

  return (
    <>
      <div className="mt-10">
        <h2 className="text-[24px] leading-7 font-bold font-roboto_condensed">
          О ТОВАРЕ
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-[14px] leading-4.5">
          {mainBlock?.propertyList.slice(0, 2).map((property, index) => (
            <li key={index} className="flex items-center gap-6">
              <span className="w-42.5 font-light">{property.name}</span>
              <span>{property.value}</span>
            </li>
          ))}

          {minorBlock?.propertyList.slice(0, 2).map((property, index) => (
            <li key={`minor-${index}`} className="flex items-center gap-6">
              <span className="w-42.5 font-light">{property.name}</span>
              <span>{property.value}</span>
            </li>
          ))}
        </ul>
        <Button
          className="mt-3 underline text-slate-500 text-[14px] leading-[1.2]"
          onClick={() => setIsModalOpen(true)}
        >
          Показать больше
        </Button>
      </div>

      {brandItemsModel && (
        <Link
          href={`/brand/${generateProductSlug(brandItemsModel.brandName, brandItemsModel.brandId)}`}
          target="_blank"
          style={{ backgroundColor: "hsla(0, 0%, 97%, .6)" }}
          className="flex items-center h-14 gap-2 mt-3 p-2 rounded-sm"
        >
          <img
            src={brandItemsModel.brandLogo}
            alt="brand-logo"
            height={40}
            width={40}
          />

          <div className="flex items-center">
            <div className="text-[16px] leading-[18.75px] font-medium truncate">
              {brandItemsModel.brandName}
            </div>
            <div className="bg-slate-300 w-[0.5px] h-2.5 mx-3.5" />
            <div className="text-[14px] font-light leading-4.5">
              {brandItemsModel.brandItems}
            </div>
          </div>
        </Link>
      )}
      {seriesItemsModel?.map((item) => (
        <div
          key={item.seriesId}
          className="mt-3 p-2 text-[12px] leading-[100%] flex gap-3 rounded-sm"
          style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
        >
          <div className="font-light">{item.key}</div>
          <Link
            href={`/trends/${generateProductSlug(item.value, item.seriesId || 0)}`}
            className="flex"
          >
            {item.value}
            <Icon
              icon="chevron-right"
              width={12}
              height={12}
              className="shrink-0 text-slate-500"
            />
          </Link>
        </div>
      ))}
      {isModalOpen && (
        <AboutProductModal
          onClose={() => setIsModalOpen(false)}
          propertyModule={propertyModule}
        />
      )}
    </>
  );
};

export default AboutProduct;
