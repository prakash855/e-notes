import { FC, useCallback, useState } from "react";

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
import { useDispatch } from "react-redux";
import { createNotes } from "../../slices/services";
import { AppDispatch } from "../../store";

const initialState = {
  title: "",
  content: "",
  backgroundColor: "",
  isArchived: false,
};

const Header: FC = () => {
  const disptach = useDispatch<AppDispatch>();
  const [notesState, setNotesState] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      disptach(createNotes(notesState));
      setNotesState(initialState);
    },
    [notesState, disptach]
  );

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
