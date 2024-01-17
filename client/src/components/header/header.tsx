import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@chakra-ui/react";

import { createNotes } from "../../slices/services";
import { AppDispatch } from "../../store";
import CreateAndUpdateModal from "../modal/create-and-update-modal";
import NoteForm from "../note-form/note-form";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (data: {
    title: string | undefined;
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
        <NoteForm onSubmit={handleSubmit} />
      </CreateAndUpdateModal>
    </div>
  );
};

export default Header;
