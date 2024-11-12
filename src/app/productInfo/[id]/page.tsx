"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/procutsStore";
import {
  ProductInfoContainer,
  ProductInfoContent,
  ImageContainer,
  ProductEspeficications,
  ProductTitleAndReviews,
  Title,
  Rating,
  ReviewsNumber,
  ReviewContainer,
  ReviewItem,
  ReviewText,
  ReviewerInfo,
  ReviewDate,
  ReviewRating,
  DimensionsContainer,
  DimensionItem,
  MetaContainer,
  TagList,
  ShippingInfo,
  ItemAndDescriptionContainer,
  DiscountPercent,
  Price,
} from "./styles";
import Header from "@/components/header";
import Image from "next/image";
import { Product, productFetch } from "@/services/productFetch";
import LoadingPage from "@/components/loadingPage";
import { useThemeStore } from "@/store/themeStore";

import { IoStar } from "react-icons/io5";

export default function ProductInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [resolvedParamsId, setResolvedParamsId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedProduct, setFetchedProduct] = useState<Product>();
  const products = useProductStore((state) => state.products);

  const theme = useThemeStore((state) => state.theme);

  async function getProducts(id: string) {
    try {
      if (resolvedParamsId) {
        const product = await productFetch(resolvedParamsId);

        if ("id" in product) {
          if (product && products.length > 0) {
            const filteredProduct = products.find(
              (product) => String(product.id) === id
            );

            setFetchedProduct(filteredProduct);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    if (fetchedProduct) {
      setIsLoading(false);
    }
  }, [fetchedProduct]);

  useEffect(() => {
    params
      .then((resolvedParams) => {
        setResolvedParamsId(resolvedParams.id);
      })
      .catch((error) => {
        console.error("Erro ao resolver params:", error);
        setIsLoading(false);
      });
  }, [params]);

  useEffect(() => {
    if (resolvedParamsId && products) {
      getProducts(resolvedParamsId);
    }
  }, [resolvedParamsId, products]);

  return (
    <ProductInfoContainer $variant={theme}>
      <Header page="productInfo" />

      {!isLoading ? (
        <>
          <ProductInfoContent $variant={theme}>
            <ImageContainer $variant={theme}>
              {fetchedProduct?.thumbnail ? (
                <>
                  <Image
                    src={fetchedProduct.thumbnail}
                    alt="product image"
                    width={450}
                    height={450}
                  />

                  {fetchedProduct?.discountPercentage && (
                    <ItemAndDescriptionContainer>
                      <DiscountPercent>
                        {fetchedProduct?.discountPercentage}% OFF
                      </DiscountPercent>
                    </ItemAndDescriptionContainer>
                  )}
                </>
              ) : (
                <p>Imagem não disponível</p>
              )}
            </ImageContainer>
            <ProductEspeficications $variant={theme}>
              <Title $variant={theme}>{fetchedProduct?.title}</Title>
              <ProductTitleAndReviews $variant={theme}>
                <Rating $variant={theme}>
                  {fetchedProduct?.rating}
                  <IoStar />
                </Rating>

                {fetchedProduct?.reviews &&
                  fetchedProduct?.reviews?.length > 1 && (
                    <ReviewsNumber $variant={theme}>
                      {fetchedProduct?.reviews?.length > 1
                        ? `${fetchedProduct?.reviews?.length} avaliações`
                        : `${fetchedProduct?.reviews?.length} avaliação`}
                    </ReviewsNumber>
                  )}
              </ProductTitleAndReviews>
              <p>{fetchedProduct?.description}</p>

              <DimensionsContainer $variant={theme}>
                <DimensionItem $variant={theme}>
                  <dt>Dimensões:</dt> {fetchedProduct?.dimensions.width} x{" "}
                  {fetchedProduct?.dimensions.height} x{" "}
                  {fetchedProduct?.dimensions.depth} cm
                </DimensionItem>
              </DimensionsContainer>
              <MetaContainer $variant={theme}>
                <ItemAndDescriptionContainer>
                  <dt>Estoque:</dt>
                  <dd>{fetchedProduct?.stock} unidades</dd>
                </ItemAndDescriptionContainer>
                {fetchedProduct?.brand && (
                  <ItemAndDescriptionContainer>
                    <dt>Marca:</dt>
                    <dd>{fetchedProduct?.brand}</dd>
                  </ItemAndDescriptionContainer>
                )}
              </MetaContainer>
              <ShippingInfo $variant={theme}>
                <ItemAndDescriptionContainer>
                  <dt>Informações de Envio:</dt>
                  <dd>{fetchedProduct?.shippingInformation}</dd>
                </ItemAndDescriptionContainer>
                <ItemAndDescriptionContainer>
                  <dt>Garantia:</dt>
                  <dd> {fetchedProduct?.warrantyInformation}</dd>
                </ItemAndDescriptionContainer>
              </ShippingInfo>

              <ItemAndDescriptionContainer>
                <Price>${fetchedProduct?.price}</Price>
              </ItemAndDescriptionContainer>
              <TagList $variant={theme}>
                {fetchedProduct?.tags?.map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}
              </TagList>
            </ProductEspeficications>
          </ProductInfoContent>
          <ReviewContainer $variant={theme}>
            <h3>Avaliações</h3>
            {fetchedProduct?.reviews && fetchedProduct?.reviews.length >= 1 ? (
              <>
                {fetchedProduct?.reviews?.map((review, index) => (
                  <ReviewItem key={index} $variant={theme}>
                    <ReviewerInfo $variant={theme}>
                      <strong>{review.reviewerName}</strong>
                    </ReviewerInfo>
                    <ReviewDate $variant={theme}>
                      <ReviewRating $variant={theme}>
                        {review.rating} <IoStar />
                      </ReviewRating>
                      {new Date(review.date).toLocaleDateString()}
                    </ReviewDate>
                    <ReviewText $variant={theme}>{review.comment}</ReviewText>
                  </ReviewItem>
                ))}
              </>
            ) : (
              <>Nenhuma Avaliação no produto</>
            )}
          </ReviewContainer>
        </>
      ) : (
        <LoadingPage />
      )}
    </ProductInfoContainer>
  );
}
