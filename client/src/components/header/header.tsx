import { FC, SetStateAction, useCallback, useState } from "react";

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
  Select,
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

const colorOptions = [
  { value: "gray.500", label: "Gray" },
  { value: "red.500", label: "Red" },
  { value: "orange.500", label: "Orange" },
  { value: "yellow.500", label: "Yellow" },
  { value: "green.500", label: "Green" },
  { value: "teal.500", label: "Teal" },
  { value: "blue.500", label: "Blue" },
  { value: "cyan.500", label: "Cyan" },
  { value: "purple.500", label: "Purple" },
  { value: "pink.500", label: "Pink" },
];

const Header: FC = () => {
  const disptach = useDispatch<AppDispatch>();
  const [notesState, setNotesState] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      const selectedOption = colorOptions.find(
        (option) => option.value === event.target.value
      );

      if (selectedOption) {
        setSelectedValue(selectedOption.value);
        setNotesState({
          ...notesState,
          backgroundColor: selectedOption.value,
        });
      }
      setSelectedValue("");
    },
    [notesState]
  );

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      disptach(createNotes(notesState));
      setNotesState(initialState);
      setSubmitted(false);
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
            <FormControl>
              <Select
                value={selectedValue}
                onChange={handleSelectChange}
                placeholder="Select option"
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
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
