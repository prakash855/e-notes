import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalHeader,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { colorOptions } from "../../constants";
import { fetchNotesById } from "../../services";
import { AppDispatch } from "../../store";

interface NoteFormProps {
  id?: string;
  onSubmit: (data: {
    title: string | undefined;
    content: string;
    backgroundColor: string;
  }) => void;
  initialData?: { title: string; content: string; backgroundColor: string };
  editMode?: boolean;
}

const NoteForm: FC<NoteFormProps> = ({
  id,
  onSubmit,
  initialData,
  editMode,
}) => {
  const [notesState, setNotesState] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    backgroundColor: initialData?.backgroundColor || "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

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
      toast({
        title: `Note ${editMode ? `Updated` : `Created`}`,
        description: `Your note has been successfully ${
          editMode ? `Updated` : `Created`
        }.`,
        status: "success",
        position: "top-right",
      });
    },
    [editMode, toast, notesState, onSubmit]
  );

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (id) {
          const response = await dispatch(fetchNotesById(id));

          if (isMounted && response.payload) {
            setNotesState((notesState) => ({
              ...notesState,
              ...response.payload,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    // If edit button is clicked and Id is passed properly
    if (editMode && id) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [editMode, id, dispatch]);

  return (
    <>
      <ModalHeader textAlign="center">
        {editMode ? `Update` : `Create`} your note
      </ModalHeader>
      <ModalCloseButton />
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
          {editMode ? `Update` : `Add Note`}
        </Button>
      </form>
    </>
  );
};

export default NoteForm;
