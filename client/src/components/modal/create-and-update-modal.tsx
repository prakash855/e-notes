import { ReactNode } from "react";
import {
  Modal as NativeModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const CreateAndUpdateModal = ({ isOpen, onClose, children }: ModalProps) => (
  <NativeModal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create your note</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>{children}</ModalBody>
    </ModalContent>
  </NativeModal>
);

export default CreateAndUpdateModal;
