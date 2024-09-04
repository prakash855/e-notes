import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { notesPicture } from "@/constants";
import { Box, Button } from "@/lib";
import { createNotes } from "@/services";
import { AppDispatch } from "@/store";

import { Logout } from "../logout";
import CreateAndUpdateModal from "../modal/create-and-update-modal";
import NoteForm from "../note-form/note-form";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  const handleSubmit = (data: {
    title: string | undefined;
    content: string;
    backgroundColor: string;
  }) => {
    dispatch(createNotes(data));
    setSubmitted(false);
  };

  return (
    <div className="flex justify-between m-5 border-b-2 py-2">
      <img className="w-10 h-10 cursor-pointer" src={notesPicture} alt="" />
      <Box className="flex justify-end">
        <Button onClick={() => setSubmitted(true)}>+ Create Note</Button>
        <Button className="mx-2" onClick={() => setIsLoggedOut(true)}>
          Logout
        </Button>
      </Box>

      <CreateAndUpdateModal
        isOpen={submitted}
        onClose={() => setSubmitted(false)}
      >
        <NoteForm onSubmit={handleSubmit} />
      </CreateAndUpdateModal>

      <CreateAndUpdateModal
        isOpen={isLoggedOut}
        onClose={() => setIsLoggedOut(false)}
      >
        <Logout onClose={() => setIsLoggedOut(false)} />
      </CreateAndUpdateModal>
    </div>
  );
};

export default Header;
