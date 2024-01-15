import { FC, SetStateAction, useCallback, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { colorOptions } from "../../constants";

interface NoteFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    backgroundColor: string;
  }) => void;
  initialData?: { title: string; content: string; backgroundColor: string };
  editMode?: boolean;
}

const NoteForm: FC<NoteFormProps> = ({ onSubmit, initialData, editMode }) => {
  const [notesState, setNotesState] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    backgroundColor: initialData?.backgroundColor || "",
  });

  const handleSelectChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      const selectedOption = colorOptions.find(
        (option) => option.value === event.target.value
      );

      if (selectedOption) {
        setNotesState({
          ...notesState,
          backgroundColor: selectedOption.value,
        });
      }
    },
    [notesState]
  );

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      onSubmit(notesState);
    },
    [notesState, onSubmit]
  );

  if (editMode) {
    console.log("edit Mode");
  } else console.log("create mode");
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your note</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
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

            <FormControl mt={4}>
              <FormLabel>Add Background</FormLabel>
              <Select
                value={notesState.backgroundColor}
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

            <Button type="submit" colorScheme="blue" mt={4}>
              Add Note
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default NoteForm;
