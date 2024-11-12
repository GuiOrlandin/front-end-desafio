import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseAndSaveChangesButtonsContainer,
  CloseButton,
  ContainerOfTwoInputs,
  Content,
  CreateButton,
  CreateItemButton,
  Description,
  DescriptionContainer,
  DimensionsContainer,
  ErrorMessage,
  ErrorMessageInDescription,
  FormOfCreateOrEditItem,
  LabelAndITextAreaContainer,
  LabelAndInputContainer,
  Overlay,
  SaveButton,
  Title,
  TriggerDialogButton,
} from "./style";

import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeStore } from "@/store/themeStore";
import { createProductFetch } from "@/services/createProductsFetch";
import { useProductStore } from "@/store/procutsStore";
import { Product } from "@/services/productFetch";
import { updateProductFetch } from "@/services/updateProductFetch";

interface EditOrCreateItemDialogProps {
  initialProduct?: Product;
  dialogType: "edit" | "create";
}

const dimensionsSchema = z
  .object({
    width: z
      .string()
      .min(1, "A largura não pode ser negativa")
      .transform((val) => parseFloat(val)),
    height: z
      .string()
      .min(1, "A altura não pode ser negativa")
      .transform((val) => parseFloat(val)),
    depth: z
      .string()
      .min(1, "A profundidade não pode ser negativa")
      .transform((val) => parseFloat(val)),
  })
  .strict();

const productSchema = z.object({
  title: z.string().min(3, "O titulo deve conter no mínimo 3 caracteres."),
  description: z.string().min(1, "Description não pode ser vazio"),
  price: z
    .string()
    .min(1, "O preço não pode ser vazio")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Preço inválido"),
  discountPercentage: z
    .string()
    .min(0, "Coloque 0 caso não queira aplicar desconto")
    .transform((val) => parseFloat(val))
    .optional(),
  stock: z
    .string()
    .min(1, "O estoque não pode ser vazio")
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Estoque inválido" }),
  brand: z.string().min(1, "A marca não pode ser vazia"),
  rating: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
      message: "Avaliação inválida, de 0 a 5",
    }),
  tags: z
    .array(z.string().min(1, "A tag não pode ser vazia"))
    .refine((tags) => tags.length > 0, "Deve haver pelo menos uma tag."),
  shippingInformation: z.string().min(1, "Forneça o tempo de entrega."),
  warrantyInformation: z.string().min(1, "Forneça o tempo de garantia."),
  dimensions: dimensionsSchema,
});

type ProductSchema = z.infer<typeof productSchema>;

export default function EditOrCreateProductDialog({
  initialProduct,
  dialogType,
}: EditOrCreateItemDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useThemeStore((state) => state.theme);
  const addProduct = useProductStore((state) => state.addProduct);
  const editProduct = useProductStore((state) => state.editProduct);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const colorOfEditIcon = theme === "dark" ? "white" : "#3F3D45";

  async function useHandleCreateProduct(data: ProductSchema) {
    try {
      const product = await createProductFetch({
        brand: data.brand,
        description: data.description,
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
        price: data.price,
        rating: data.rating,
        shippingInformation: data.shippingInformation,
        stock: data.stock,
        tags: data.tags,
        title: data.title,
        dimensions: {
          width: data.dimensions.width,
          height: data.dimensions.height,
          depth: data.dimensions.depth,
        },
        discountPercentage: 10,
        warrantyInformation: data.warrantyInformation,
      });

      if ("id" in product) {
        addProduct(product);
      }

      reset();

      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar o produto", error);
    }
  }

  async function useHandleEditItem(editedData: ProductSchema) {
    try {
      const product = await updateProductFetch({
        brand: editedData.brand,
        description: editedData.description,
        thumbnail: initialProduct?.thumbnail,
        price: editedData.price,
        rating: editedData.rating,
        shippingInformation: editedData.shippingInformation,
        stock: editedData.stock,
        tags: editedData.tags,
        title: editedData.title,
        reviews: initialProduct?.reviews,
        dimensions: {
          width: editedData.dimensions.width,
          height: editedData.dimensions.height,
          depth: editedData.dimensions.depth,
        },
        discountPercentage: editedData.discountPercentage!,
        warrantyInformation: editedData.warrantyInformation,
        id: initialProduct!.id,
      });

      if ("id" in product) {
        editProduct(product);
      }

      reset();

      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar o produto", error);
    }
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        {dialogType === "edit" ? (
          <TriggerDialogButton
            onClick={() => setOpen(true)}
            data-testid="edit-product-button"
          >
            <AiOutlineEdit size={24} color={colorOfEditIcon} />
          </TriggerDialogButton>
        ) : (
          <CreateItemButton
            onClick={() => setOpen(true)}
            data-testid="create-product-button"
          >
            Crie seu item
          </CreateItemButton>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content $variant={theme}>
          <>
            {dialogType === "edit" ? (
              <>
                <Title>Edite seu Produto</Title>
              </>
            ) : (
              <>
                <>
                  <Title>Crie seu produto</Title>
                </>
              </>
            )}
            <DescriptionContainer $variant={theme}>
              Altere os campos que deseja editar
            </DescriptionContainer>
            <FormOfCreateOrEditItem
              onSubmit={
                dialogType === "create"
                  ? handleSubmit(useHandleCreateProduct)
                  : handleSubmit(useHandleEditItem)
              }
              data-testid="form-product"
            >
              <ContainerOfTwoInputs>
                <LabelAndInputContainer>
                  <label>Titulo do seu produto</label>
                  <input
                    placeholder="digite o nome do seu produto"
                    defaultValue={
                      initialProduct?.title ? initialProduct.title : undefined
                    }
                    {...register("title")}
                  />
                  {errors.title?.message ===
                    "O titulo deve conter no mínimo 3 caracteres." && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                  )}
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <label>Estoque do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.stock
                        ? initialProduct.stock.toString()
                        : undefined
                    }
                    placeholder="digite as informações sobre o estoque seu produto"
                    {...register("stock")}
                  />
                  {errors.stock && (
                    <ErrorMessage>{errors.stock.message}</ErrorMessage>
                  )}
                </LabelAndInputContainer>
              </ContainerOfTwoInputs>

              <ContainerOfTwoInputs>
                <ContainerOfTwoInputs>
                  <LabelAndInputContainer>
                    <label>Preço do seu produto</label>
                    <input
                      placeholder="digite o preço do seu produto"
                      defaultValue={
                        initialProduct?.price
                          ? initialProduct.price.toString()
                          : undefined
                      }
                      {...register("price")}
                    />
                    {errors.price && (
                      <ErrorMessage>{errors.price.message}</ErrorMessage>
                    )}
                  </LabelAndInputContainer>
                  <LabelAndInputContainer>
                    <label>Marca do seu produto</label>
                    <input
                      defaultValue={
                        initialProduct?.brand ? initialProduct.brand : undefined
                      }
                      placeholder="digite a marca do seu produto"
                      {...register("brand")}
                    />
                    {errors.brand && (
                      <ErrorMessage>{errors.brand.message}</ErrorMessage>
                    )}
                  </LabelAndInputContainer>
                </ContainerOfTwoInputs>
              </ContainerOfTwoInputs>
              <ContainerOfTwoInputs>
                <LabelAndInputContainer>
                  <label>Avaliação do seu produto</label>
                  <input
                    placeholder="digite o numero da avaliação do seu produto"
                    defaultValue={
                      initialProduct?.rating
                        ? initialProduct.rating.toString()
                        : undefined
                    }
                    {...register("rating")}
                  />
                  {errors.rating && (
                    <ErrorMessage>{errors.rating.message}</ErrorMessage>
                  )}
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <label>Categorias do seu produto</label>
                  <input
                    placeholder="digite as categorias do seu produto"
                    defaultValue={
                      initialProduct?.tags ? initialProduct.tags : undefined
                    }
                    {...register("tags", {
                      setValueAs: (value) => {
                        if (typeof value === "string" && value.trim() !== "") {
                          return value.split(",").map((tag) => tag.trim());
                        }
                        return [];
                      },
                    })}
                  />
                  {errors.tags && (
                    <ErrorMessage>{errors.tags.message}</ErrorMessage>
                  )}
                </LabelAndInputContainer>
              </ContainerOfTwoInputs>
              <ContainerOfTwoInputs>
                <LabelAndInputContainer>
                  <label>Entrega do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.shippingInformation
                        ? initialProduct.shippingInformation
                        : undefined
                    }
                    placeholder="digite as informações da entrega do seu produto"
                    {...register("shippingInformation")}
                  />
                  {errors.shippingInformation && (
                    <ErrorMessage>
                      {errors.shippingInformation.message}
                    </ErrorMessage>
                  )}
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <label>Garantia do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.warrantyInformation
                        ? initialProduct.warrantyInformation
                        : undefined
                    }
                    placeholder="digite as informações da garantia do seu produto"
                    {...register("warrantyInformation")}
                  />
                  {errors.warrantyInformation && (
                    <ErrorMessage>
                      {errors.warrantyInformation.message}
                    </ErrorMessage>
                  )}
                </LabelAndInputContainer>
                {dialogType === "edit" && (
                  <LabelAndInputContainer>
                    <label>Desconto do produto</label>
                    <input
                      defaultValue={
                        initialProduct?.discountPercentage
                          ? initialProduct.discountPercentage.toString()
                          : undefined
                      }
                      placeholder="digite o desconto a ser aplicado no produto"
                      {...register("discountPercentage")}
                    />
                    {errors.discountPercentage && (
                      <ErrorMessage>
                        {errors.discountPercentage.message}
                      </ErrorMessage>
                    )}
                  </LabelAndInputContainer>
                )}
              </ContainerOfTwoInputs>
              <DimensionsContainer>
                <LabelAndInputContainer>
                  <label>Largura do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.dimensions.width
                        ? initialProduct.dimensions.width.toString()
                        : undefined
                    }
                    placeholder="digite a largura (cm)"
                    {...register("dimensions.width")}
                  />
                  {errors.dimensions?.width && (
                    <ErrorMessage>
                      {errors.dimensions?.width.message}
                    </ErrorMessage>
                  )}
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <label>Altura do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.dimensions.height
                        ? initialProduct.dimensions.height.toString()
                        : undefined
                    }
                    placeholder="digite a altura (cm)"
                    {...register("dimensions.height")}
                  />
                  {errors.dimensions?.height && (
                    <ErrorMessage>
                      {errors.dimensions.height.message}
                    </ErrorMessage>
                  )}
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                  <label>Profundidade do produto</label>
                  <input
                    defaultValue={
                      initialProduct?.dimensions.depth
                        ? initialProduct.dimensions.depth.toString()
                        : undefined
                    }
                    placeholder="digite a profundidade (cm)"
                    {...register("dimensions.depth")}
                  />
                  {errors.dimensions?.depth && (
                    <ErrorMessage>
                      {errors.dimensions.depth.message}
                    </ErrorMessage>
                  )}
                </LabelAndInputContainer>
              </DimensionsContainer>

              <LabelAndITextAreaContainer>
                <label>Descrição do seu produto</label>
                <Description
                  defaultValue={
                    initialProduct?.description
                      ? initialProduct.description
                      : undefined
                  }
                  placeholder="digite a descrição do seu produto"
                  {...register("description")}
                />
                {errors.description && (
                  <ErrorMessageInDescription>
                    {errors.description.message}
                  </ErrorMessageInDescription>
                )}
              </LabelAndITextAreaContainer>

              <CloseAndSaveChangesButtonsContainer>
                {dialogType === "edit" ? (
                  <SaveButton
                    type="submit"
                    data-testid="submit-edit-product-button"
                  >
                    Editar
                  </SaveButton>
                ) : (
                  <>
                    <CreateButton
                      type="submit"
                      data-testid="submit-create-product-button"
                    >
                      Criar
                    </CreateButton>
                  </>
                )}

                <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
              </CloseAndSaveChangesButtonsContainer>
            </FormOfCreateOrEditItem>
          </>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
