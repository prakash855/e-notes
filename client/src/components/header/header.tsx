import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { createNotes } from "../../slices/services";
import { AppDispatch } from "../../store";
import CreateAndUpdateModal from "../modal/create-and-update-modal";
import NoteForm from "../note-form/note-form";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (data: {
    title: string;
    content: string;
    backgroundColor: string;
  }) => {
    dispatch(createNotes(data));
    setSubmitted(false);
  };

  return (
    <div className="flex justify-end m-5">
      <Button onClick={() => setSubmitted(true)}>Create Note</Button>
      <CreateAndUpdateModal
        isOpen={submitted}
        onClose={() => setSubmitted(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NoteForm onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </CreateAndUpdateModal>
    </div>
  );
};

export default Header;
