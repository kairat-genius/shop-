import type { ProductDetailType, SeriesDialogModelType, SkusType } from "@/types/product-detail.type";
import { createContext } from "react";

interface ProductDetailContextType {
  productData: ProductDetailType;
  productId: number;
  activeSku: SkusType | undefined;
  activeSkuId: number | null;
  selectSku: (propertyValueId: number) => void;
  selectProduct: (productId: number) => Promise<void>;
  isLoading: boolean;
  seriesDialogModel?: SeriesDialogModelType
}

export const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);
