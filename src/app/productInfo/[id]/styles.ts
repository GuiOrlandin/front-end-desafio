import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const ProductInfoContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  width: 100vw;
  min-height: 100vh;
  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#3F3D45"};
  color: ${({ $variant }) => ($variant === "dark" ? "#FFFEFE" : "#2C2C2D")};
  transition: background 0.3s ease-in-out;
  box-shadow: ${({ $variant }) =>
    $variant === "dark"
      ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
      : "0px 4px 10px rgba(0, 0, 0, 0.05)"};
`;

export const ProductInfoContent = styled.main<ThemeSelected>`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 8px;
  background: ${({ $variant }) =>
    $variant === "light" ? "#F9FAFB" : "#1A1A1A"};
`;

export const Title = styled.h1<ThemeSelected>`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF " : "#333")};
  border-bottom: 2px solid
    ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
  padding-bottom: 8px;
  margin-bottom: 1rem;
`;

export const Rating = styled.p<ThemeSelected>`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFD700" : "#FFD700")};
  align-items: center;

  svg {
    font-size: 1.5rem;
  }
`;

export const ReviewsNumber = styled.p<ThemeSelected>`
  font-size: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#CCC" : "#666")};
  margin-top: 0.5rem;
`;

export const ImageContainer = styled.section<ThemeSelected>`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 28.125rem;
  height: 28.125rem;
  align-items: center;
  position: relative;

  img {
    object-fit: contain;
    border: ${({ $variant }) =>
      $variant === "light" ? "1px solid #CCC" : "1px solid #333"};
  }
`;

export const Price = styled.dd`
  font-size: 2rem;
  font-weight: bold;
  color: #888888;
  margin-top: 1.5rem;
`;

export const DiscountPercent = styled.dd`
  display: flex;
  left: 21rem;
  top: 1.2rem;
  color: green;
  font-weight: 700;
  padding: 0.3rem;
  width: 6.5rem;
  background-color: #e0f7e9;
  color: #4caf50;
  border-radius: 8px;
  background: white;
  position: absolute;
`;

export const ProductEspeficications = styled.section<ThemeSelected>`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
`;

export const ProductTitleAndReviews = styled.div<ThemeSelected>`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid
    ${({ $variant }) => ($variant === "dark" ? "#444" : "#DDD")};
`;
export const DimensionsContainer = styled.dl<ThemeSelected>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#DDD" : "#333")};
  font-size: 1rem;
`;

export const DimensionItem = styled.p<ThemeSelected>`
  display: flex;
  gap: 0.3rem;
  font-size: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};

  dt {
    font-weight: 600;
  }
`;

export const ItemAndDescriptionContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;

  dt {
    font-weight: 600;
  }

  dd {
    display: flex;
    gap: 0.2rem;
  }
`;

export const MetaContainer = styled.dl<ThemeSelected>`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
  border-top: ${({ $variant }) =>
    $variant === "dark" ? "1px solid #444" : "1px solid #DDD"};
  padding-top: 1rem;
`;

export const ShippingInfo = styled.dl<ThemeSelected>`
  margin-top: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
  font-size: 1rem;

  dd {
    font-weight: normal;
  }
`;

export const TagList = styled.div<ThemeSelected>`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;

  span {
    font-size: 0.9rem;
    background: ${({ $variant }) => ($variant === "light" ? "#EEE" : "#555")};
    border-radius: 20px;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
    font-weight: 500;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
      background: ${({ $variant }) =>
        $variant === "light" ? "#FFF5E6" : "#333"};
    }
  }
`;

export const ReviewContainer = styled.section<ThemeSelected>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  background: ${({ $variant }) =>
    $variant === "light" ? "#F9FAFB" : "#1A1A1A"};
  padding: 1rem;
  border-radius: 8px;

  h3 {
    margin-bottom: 1rem;
  }

  h1 {
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
`;

export const ReviewItem = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: ${({ $variant }) =>
    $variant === "light" ? "1px solid #DDD" : "1px solid #444"};
  padding-bottom: 1rem;
`;

export const ReviewerInfo = styled.div<ThemeSelected>`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFF" : "#333")};
`;

export const ReviewDate = styled.div<ThemeSelected>`
  font-size: 0.9rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#AAA" : "#555")};
`;

export const ReviewRating = styled.p<ThemeSelected>`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${({ $variant }) => ($variant === "dark" ? "#FFD700" : "#000")};
`;

export const ReviewText = styled.p<ThemeSelected>`
  font-size: 1rem;
  margin-top: 1rem;
  color: ${({ $variant }) => ($variant === "dark" ? "#DDD" : "#333")};
`;
