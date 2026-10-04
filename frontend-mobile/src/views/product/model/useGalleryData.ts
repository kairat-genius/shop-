"use client";

import { useCallback, useMemo } from "react";
import { useProductDetailData } from "../context/useCatalogData";
import type { SalePropertiesType } from "@/types/product-detail.type";

export type GalleryImage = { id: number; url: string; hasBackdrop?: boolean };
export type GalleryColorItem = { propertyValueId: number; url: string; value: string };
export type GallerySection = {
  id: "products" | "styles" | "outfits" | "sizes";
  label: string;
  images: GalleryImage[];
};

export const useGalleryData = () => {
  const {
    activeSku,
    selectedPropertyValueIds,
    productData: {
      imageModels,
      mainImgWearStyleResp,
      buyDialogModel: { imageModelList, saleImages, saleProperties },
    },
  } = useProductDetailData();

  const allImageModels = useMemo(
    () =>
      [...imageModels, ...(imageModelList ?? [])].filter(
        (item, index, images) =>
          images.findIndex((c) => c.imageId === item.imageId) === index,
      ),
    [imageModels, imageModelList],
  );

  const colorProperty: SalePropertiesType | undefined = useMemo(
    () =>
      saleProperties?.find(
        (property) =>
          property.definitionId === 1 || property.definitionId === 3690,
      ),
    [saleProperties],
  );

  const colorItems = useMemo(
    () =>
      colorProperty?.propertyList.flatMap((group) =>
        group.propertyItemModels.map((item) => ({
          propertyValueId: item.propertyValueId,
          url: item.url,
          value: item.value,
        })),
      ) ?? [],
    [colorProperty],
  );

  const activeColorValueId: number | null = useMemo(
    () =>
      selectedPropertyValueIds[1] ??
      activeSku?.properties.find((property) =>
        colorItems.some(
          (item) => item.propertyValueId === property.propertyValueId,
        ),
      )?.propertyValueId ??
      null,
    [selectedPropertyValueIds, activeSku, colorItems],
  );

  const getImagesForColor = useCallback(
    (colorValueId: number | null): GalleryImage[] => {
      const matchesColorFilter = (item: { propertyValueId?: number | null }) =>
        colorValueId === null ||
        item.propertyValueId === undefined ||
        item.propertyValueId === colorValueId;

      const saleColorModels =
        colorValueId === null ? undefined : saleImages?.[String(colorValueId)];

      const productImages: GalleryImage[] = (
        saleColorModels && saleColorModels.length > 0
          ? saleColorModels
          : allImageModels.filter((item) => {
              if (!item.genericType.startsWith("PHOTO")) return false;
              if (item.propertyValueId != null) {
                return item.propertyValueId === colorValueId;
              }
              return true;
            })
      ).map((item) => ({ id: item.imageId, url: item.url }));

      const productImagesWithFallback: GalleryImage[] =
        productImages.length > 0
          ? productImages
          : (() => {
              const fallback = colorItems.find(
                (item) => item.propertyValueId === colorValueId,
              )?.url;
              return fallback ? [{ id: colorValueId ?? 0, url: fallback }] : [];
            })();

      const styleImages: GalleryImage[] =
        mainImgWearStyleResp?.spuItems.map((item) => ({
          id: item.contentId,
          url: item.url,
          hasBackdrop: true,
        })) ?? [];

      const outfitImages: GalleryImage[] = allImageModels
        .filter(
          (item) =>
            (item.label === 1 ||
              item.genericType.includes("OUTFIT") ||
              item.imgEvenTrace.includes('"position":"outfits"')) &&
            matchesColorFilter(item),
        )
        .map((item) => ({ id: item.imageId, url: item.url }));

      const sizeImages: GalleryImage[] = allImageModels
        .filter(
          (item) =>
            (item.label === 2 ||
              item.genericType.startsWith("SIZE_CAPACITY_DIAGRAM")) &&
            matchesColorFilter(item),
        )
        .map((item) => ({ id: item.imageId, url: item.url }));

      return [
        ...productImagesWithFallback,
        ...styleImages,
        ...outfitImages,
        ...sizeImages,
      ];
    },
    [allImageModels, colorItems, mainImgWearStyleResp, saleImages],
  );

  // Секции текущего (глобального) цвета — тоже мемоизируем
  const gallerySections: GallerySection[] = useMemo(() => {
    const matches = (item: { propertyValueId?: number | null }) =>
      activeColorValueId === null ||
      item.propertyValueId === undefined ||
      item.propertyValueId === activeColorValueId;

    const saleColorModels =
      saleImages?.[String(activeColorValueId)] ?? imageModels;

    const productImagesByColor: GalleryImage[] = saleColorModels
      .filter((item) => item.genericType.startsWith("PHOTO") && matches(item))
      .map((item) => ({ id: item.imageId, url: item.url }));

    const selectedColorImage = colorItems.find(
      (item) => item.propertyValueId === activeColorValueId,
    )?.url;

    const productImages: GalleryImage[] =
      productImagesByColor.length > 0
        ? productImagesByColor
        : selectedColorImage
          ? [{ id: activeColorValueId ?? 0, url: selectedColorImage }]
          : [];

    const styleImages: GalleryImage[] =
      mainImgWearStyleResp?.spuItems.map((item) => ({
        id: item.contentId,
        url: item.url,
        hasBackdrop: true,
      })) ?? [];

    const outfitImages: GalleryImage[] = allImageModels
      .filter(
        (item) =>
          (item.label === 1 ||
            item.genericType.includes("OUTFIT") ||
            item.imgEvenTrace.includes('"position":"outfits"')) &&
          matches(item),
      )
      .map((item) => ({ id: item.imageId, url: item.url }));

    const sizeImages: GalleryImage[] = allImageModels
      .filter(
        (item) =>
          (item.label === 2 ||
            item.genericType.startsWith("SIZE_CAPACITY_DIAGRAM")) &&
          matches(item),
      )
      .map((item) => ({ id: item.imageId, url: item.url }));

    return (
      [
        { id: "products" as const, label: "Товары", images: productImages },
        { id: "styles" as const, label: "Стили", images: styleImages },
        { id: "outfits" as const, label: "Наряды", images: outfitImages },
        { id: "sizes" as const, label: "Размер", images: sizeImages },
      ] as GallerySection[]
    ).filter((section) => section.images.length > 0);
  }, [
    activeColorValueId,
    allImageModels,
    colorItems,
    imageModels,
    mainImgWearStyleResp,
    saleImages,
  ]);

  const displayImages = useMemo(
    () => gallerySections.flatMap((section) => section.images),
    [gallerySections],
  );
  const firstSectionId = gallerySections[0]?.id;

  const getSectionState = useCallback(
    (imageIndex: number) => {
      let sectionStart = 0;
      for (const section of gallerySections) {
        const sectionEnd = sectionStart + section.images.length;
        if (imageIndex < sectionEnd) {
          return { id: section.id, imageIndex: imageIndex - sectionStart + 1 };
        }
        sectionStart = sectionEnd;
      }
      return { id: "products" as const, imageIndex: 1 };
    },
    [gallerySections],
  );

  return {
    colorProperty,
    colorItems,
    activeColorValueId,
    gallerySections,
    displayImages,
    firstSectionId,
    getSectionState,
    getImagesForColor,
  };
};