import { CreateProductPostRequest } from "@/services/createProductsFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const PRODUCT_STORAGE = "@products:product-1.0.0";

export interface ProductResponse extends CreateProductPostRequest {
  id: string;
}

interface ProductStore {
  products: ProductResponse[];
  addProduct: (product: ProductResponse) => void;
  addProducts: (products: ProductResponse[]) => void;
  editProduct: (updatedProduct: ProductResponse) => void;
  removeProduct: (product_id: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      addProducts: (newProducts) =>
        set(() => ({
          products: newProducts,
        })),
      editProduct: (updatedProduct: ProductResponse) =>
        set((state) => {
          const indexOfProduct = state.products.findIndex(
            (product) => product.id === updatedProduct.id
          );

          const updatedProducts = [...state.products];
          updatedProducts[indexOfProduct] = updatedProduct;
          return { products: updatedProducts };
        }),
      removeProduct: (product_id) =>
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) => product.id !== product_id
          );
          return { products: updatedProducts };
        }),
    }),
    {
      name: PRODUCT_STORAGE,
    }
  )
);
