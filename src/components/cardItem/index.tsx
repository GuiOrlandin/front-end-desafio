import React from "react";
import {
  ProductCardContainer,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ImageAndDiscount,
  StockStatus,
  ProductCategory,
  ProductBrand,
  ShippingAndWarranty,
  Rating,
  StockAndRatingContainer,
  ProductPrice,
  EditProductAndDeleteProductContainer,
  ProductContent,
} from "./style";
import { useThemeStore } from "@/store/themeStore";
import EditOrCreateItemDialog from "../createOrEditItemDialog";
import { Product } from "@/services/getAllProductsFetch";
import DeleteItemDialog from "../deleteItemDialog";
import { useRouter } from "next/navigation";

interface CardProductProps {
  product: Product;
}

export default function CardProduct({ product }: CardProductProps) {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();

  return (
    <ProductCardContainer $variant={theme} data-testid="product-item">
      <EditProductAndDeleteProductContainer>
        <EditOrCreateItemDialog dialogType="edit" initialProduct={product} />

        <DeleteItemDialog product_id={product.id} />
      </EditProductAndDeleteProductContainer>
      <ProductContent
        onClick={() => router.push(`/productInfo/${String(product.id)}`)}
        data-testid="product-content"
      >
        <ImageAndDiscount>
          <ProductImage src={product.thumbnail} alt={product.title} />
          {product && product.discountPercentage > 0 ? (
            <>
              <p>{product.discountPercentage}% OFF</p> <></>
            </>
          ) : (
            <></>
          )}
        </ImageAndDiscount>

        <ProductTitle $variant={theme}>{product.title}</ProductTitle>

        <ProductDescription $variant={theme}>
          {product.description}
        </ProductDescription>

        <ProductPrice $variant={theme}>Preço: ${product.price}</ProductPrice>

        <StockAndRatingContainer>
          <StockStatus $stock={product.stock} $variant={theme}>
            {product.stock > 0 ? `Em estoque: ${product.stock}` : "Sem estoque"}
          </StockStatus>
          <Rating $variant={theme}>Avaliação: {product.rating} ★</Rating>
        </StockAndRatingContainer>

        <ProductCategory $variant={theme}>
          Categorias: {product.tags.join(", ")}
        </ProductCategory>

        {product.brand ? (
          <ProductBrand $variant={theme}>Marca: {product.brand}</ProductBrand>
        ) : (
          <ProductBrand $variant={theme}>Marca: Não informada</ProductBrand>
        )}

        <ShippingAndWarranty $variant={theme}>
          <p>{product.shippingInformation}</p>
          <p>{product.warrantyInformation}</p>
        </ShippingAndWarranty>
      </ProductContent>
    </ProductCardContainer>
  );
}
