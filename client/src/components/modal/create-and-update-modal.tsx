import { ReactNode } from "react";
import { Modal as NativeModal } from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const CreateAndUpdateModal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      <NativeModal isOpen={isOpen} onClose={onClose}>
        {children}
      </NativeModal>
    </>
  );
};

export default CreateAndUpdateModal;
