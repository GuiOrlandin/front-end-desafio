import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Title = styled(Dialog.Title)`
  padding: 0;
  margin: 0 0 0 0;
`;
export const DescriptionContainer = styled(Dialog.Description)<ThemeSelected>`
  margin-top: 1rem;
  color: ${({ $variant }) => ($variant === "light" ? "#3F3D45" : "#FFFEFE")};
`;
export const Content = styled(Dialog.Content)<ThemeSelected>`
  flex-direction: column;
  min-width: 16rem;
  border-radius: 6px;
  padding: 2rem 2rem 1.2rem 2rem;
  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#3F3D45"};
  color: ${({ $variant }) => ($variant === "light" ? "#3F3D45" : "#FFFEFE")};
  min-width: 20rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CloseAndSaveChangesButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
export const CloseButton = styled.button`
  color: white;
  padding: 1rem 3.5rem;
  border: none;
  border-radius: 8px;
  background: #85888c;

  &:hover {
    cursor: pointer;
    background: #e1e8f6;
  }
`;

export const SaveButton = styled(CloseButton)`
  background: linear-gradient(
    90deg,
    rgba(122, 74, 163, 1) 0%,
    rgba(146, 80, 210, 1) 100%
  );

  &:hover {
    background: #cdc3ea;
  }
`;

export const CreateButton = styled(SaveButton)``;

export const TriggerDialogButton = styled.button`
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const FormOfCreateOrEditItem = styled.form`
  display: flex;
  flex-direction: column;

  select {
    border: 1px solid #e1e8f6;
    margin-top: 0.5rem;
    padding: 0.9rem;
    border-radius: 8px;
  }
`;

export const CreateItemButton = styled.button`
  display: flex;
  padding: 1rem 1rem;
  justify-content: center;
  text-align: center;
  color: white;
  border: none;
  border-radius: 8px;

  background: linear-gradient(
    90deg,
    rgba(122, 74, 163, 1) 0%,
    rgba(146, 80, 210, 1) 100%
  );

  &:hover {
    cursor: pointer;
    background: #cdc3ea;
  }
`;

export const ContainerOfTwoInputs = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
`;
export const Description = styled.textarea`
  padding: 0.4rem 1rem;
  min-height: 5rem;
  border-radius: 8px;
  border: 1px solid #e1e8f6;
  resize: vertical;

  margin-top: 1rem;
`;
export const LabelAndInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;

  label {
    display: flex;
    margin-top: 1.4rem;
  }

  input {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e1e8f6;
    margin: 0.5rem 0;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  position: absolute;
  top: 98%;
  left: 0;
`;

export const LabelAndITextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    margin-top: 1rem;
  }
`;

export const ErrorMessageInDescription = styled.p`
  color: red;
  font-size: 0.875rem;
  position: absolute;
  top: 105%;
  left: 0;
`;

export const DimensionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
