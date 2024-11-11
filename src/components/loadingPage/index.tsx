import { LoadingContainer, LoadingText, Spinner } from "./styles";

export default function LoadingPage() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Carregando...</LoadingText>
    </LoadingContainer>
  );
}
