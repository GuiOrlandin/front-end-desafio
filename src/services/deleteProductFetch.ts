export interface DeleteProductResponse {
  id: string;
  isDeleted: boolean;
}

export const deleteProductFetch = async (
  id: string
): Promise<DeleteProductResponse> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o produto: ${response.statusText}`);
    }

    const data: DeleteProductResponse = await response.json();
    return { ...data, isDeleted: true };
  } catch (error) {
    console.error("Erro ao deletar o produto:", error);
    throw new Error("Não foi possível deletar o produto.");
  }
};
