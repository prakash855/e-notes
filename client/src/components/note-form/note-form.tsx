import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useToast } from "@/components";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalHeader,
  Select,
  Textarea,
} from "@/lib";

import { colorOptions } from "../../constants";
import { fetchNotesById } from "../../services";
import { AppDispatch } from "../../store";
import { NoteFormProps } from "@/types";

const NoteForm: FC<NoteFormProps> = ({
  id,
  onSubmit,
  initialData,
  editMode,
}) => {
  const notesInitialState = {
    title: initialData?.title || "",
    content: initialData?.content || "",
    backgroundColor: initialData?.backgroundColor || "",
  };

  const [notesState, setNotesState] = useState(notesInitialState);
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

  const colors = colorOptions.map(({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

  const action = editMode ? `Update` : `Create`;

  return (
    <>
      <ModalHeader textAlign="center">{action} your note</ModalHeader>
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
            {colors}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          {action}
        </Button>
      </form>
    </>
  );
};

export default NoteForm;
