import * as Dialog from "@radix-ui/react-dialog";
import {
  Content,
  Overlay,
  TriggerDialogButton,
  CloseButton,
  DeleteButton,
  CloseAndSaveChangesButtonsContainer,
} from "../deleteItemDialog/style";

import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import { useProductStore } from "@/store/procutsStore";
import { useDeleteProductFetch } from "@/hooks/useDeleteProductFetch";

interface DeleteItemDialogProps {
  product_id: string;
}

export default function DeleteItemDialog({
  product_id,
}: DeleteItemDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useThemeStore((state) => state.theme);
  const removeProduct = useProductStore((state) => state.removeProduct);

  const colorOfDeleteIcon = theme === "dark" ? "white" : "#3F3D45";

  async function handleDeleteProduct(product_id: string) {
    try {
      const response = await useDeleteProductFetch("1");
      //simulando o id 1 pois o id do produto criado não constaram no banco de dados do DummyJSON

      if (response.isDeleted === true) {
        removeProduct(product_id);
        setOpen(false);
      }
    } catch (error) {
      console.error("Erro ao deletar o produto", error);
    }
  }

  return (
    <Dialog.Root open={open} aria-describedby={undefined}>
      <Dialog.Trigger asChild>
        <TriggerDialogButton
          onClick={() => setOpen(true)}
          data-testid="delete-item-button"
        >
          <FaRegTrashCan size={22} color={colorOfDeleteIcon} />
        </TriggerDialogButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content $variant={theme}>
          <Dialog.Title>Deseja deletar seu item</Dialog.Title>

          <Dialog.Description>
            Escolha a opção que deseja executar
          </Dialog.Description>

          <CloseAndSaveChangesButtonsContainer>
            <DeleteButton
              onClick={() => {
                handleDeleteProduct(product_id);
              }}
              data-testid="submit-delete-item-button"
            >
              Deletar
            </DeleteButton>
            <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
          </CloseAndSaveChangesButtonsContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
