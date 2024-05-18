import {
  Modal as NativeModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

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
