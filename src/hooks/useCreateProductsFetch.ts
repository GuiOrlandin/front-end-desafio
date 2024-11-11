interface Review {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface CreateProductPostRequest {
  thumbnail?: string;
  discountPercentage: number;
  title: string;
  description: string;
  meta?: {
    createdAt: Date;
    updatedAt: Date;
  };
  price: number;
  stock: number;
  brand: string;
  rating: number;
  tags: string[];
  shippingInformation: string;
  warrantyInformation: string;
  reviews?: Review[];
  dimensions: Dimensions;
}

export interface CreateProductResponse extends CreateProductPostRequest {
  id: string;
}

export const useCreateProductFetch = async ({
  brand,
  description,
  price,
  rating,
  shippingInformation,
  stock,
  tags,
  thumbnail,
  title,
  warrantyInformation,
  dimensions,
}: CreateProductPostRequest): Promise<CreateProductResponse> => {
  const generateRandomId = () => Math.floor(Math.random() * 1000000).toString();

  let response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
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
      thumbnail,
    }),
  });

  if (response.ok) {
    const data: CreateProductResponse = await response.json();
    return {
      ...data,
      id: generateRandomId(),
      tags,
      dimensions,
      shippingInformation,
      reviews: [],
      warrantyInformation,
      meta: {
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    };
  } else {
    throw new Error(`erro ao criar o usuário: ${response.status}`);
  }
};
