import { FC, useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

import CreateAndUpdateModal from "../modal/create-and-update-modal";

const initialState = {
  title: "",
  content: "",
  backgroundColor: "",
  isArchived: false,
};

const Header: FC = () => {
  const [notesState, setNotesState] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(notesState);
    setNotesState(initialState);
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Add Title"
                value={notesState.title}
                onChange={(e) =>
                  setNotesState({ ...notesState, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={notesState.content}
                onChange={(e) =>
                  setNotesState({ ...notesState, content: e.target.value })
                }
                placeholder="Add Description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={() => setSubmitted(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </CreateAndUpdateModal>
    </div>
  );
};

export default Header;
