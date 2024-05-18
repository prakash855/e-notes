import { ReactNode } from "react";

import { ModalBody, ModalContent, ModalOverlay, NativeModal } from "@/lib";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const CreateAndUpdateModal = ({ isOpen, onClose, children }: ModalProps) => (
  <NativeModal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody pb={6}>{children}</ModalBody>
    </ModalContent>
  </NativeModal>
);

export default CreateAndUpdateModal;
