import { CreateProductPostRequest } from "./useCreateProductsFetch";

interface ApiError {
  message: string;
  status: number;
}

export interface Product extends CreateProductPostRequest {
  id: string;
}

export const useProductsFetch = async (): Promise<Product[] | ApiError> => {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        message: `Erro ao autenticar o usuário: ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
};
