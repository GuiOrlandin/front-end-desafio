import { CreateProductPostRequest } from "./useCreateProductsFetch";

export interface UpdateProductResponse extends CreateProductPostRequest {
  id: string;
}

export const useUpdateProductFetch = async ({
  brand,
  description,
  price,
  rating,
  shippingInformation,
  stock,
  tags,
  title,
  warrantyInformation,
  dimensions,
  thumbnail,
  meta,
  discountPercentage,
  id,
  reviews,
}: UpdateProductResponse): Promise<UpdateProductResponse> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brand,
        description,
        price,
        rating,
        stock,
        title,
        meta,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }

    const data: UpdateProductResponse = await response.json();
    return {
      ...data,
      id,
      tags,
      thumbnail,
      dimensions,
      shippingInformation,
      warrantyInformation,
      discountPercentage,
      reviews,
      meta: {
        createdAt: data.meta?.createdAt!,
        updatedAt: new Date(),
      },
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
