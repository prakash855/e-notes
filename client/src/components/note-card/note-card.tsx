import { FC, useCallback, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";

import { BsPin, BsPinFill } from "react-icons/bs";
import { IoArchiveOutline, IoArchive } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import styles from "./note-card.module.scss";
import { getIconHoverClass } from "../../style";
import {
  archiveNoteById,
  deleteNotes,
  fetchNotes,
  Note,
  pinNote,
  updateNotes,
} from "../../slices/services";
import { formatDate } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import CreateAndUpdateModal from "../modal/create-and-update-modal";
import NoteForm from "../note-form/note-form";

const NoteCard: FC = ({
  _id: id,
  title,
  content,
  isPinned,
  createdAt,
  isArchived,
  backgroundColor,
}: Note) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteNotes = useCallback(() => {
    if (id) {
      dispatch(deleteNotes(id));
    } else console.log(`Invalid id`);
  }, [id, dispatch]);

  const openUpdateModal = () => {
    setOpenEditModal(true);
    setEditMode(true);
  };

  const handleArchive = useCallback(() => {
    if (id) {
      dispatch(archiveNoteById(id));
    }
  }, [dispatch, id]);

  const handlePinned = useCallback(async () => {
    if (id) {
      const { payload } = await dispatch(pinNote(id));

      // once pinned calling the notes list API again
      if (payload) dispatch(fetchNotes());
    } else return;
  }, [id, dispatch]);

  const handleSubmit = useCallback(
    (data: Note) => {
      dispatch(updateNotes(data));
      setOpenEditModal(false);
    },
    [dispatch]
  );

  return (
    <>
      <CreateAndUpdateModal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setEditMode(false);
        }}
      >
        <NoteForm id={id} editMode={editMode} onSubmit={handleSubmit} />
      </CreateAndUpdateModal>
      <Card
        cursor={`pointer`}
        width={300}
        background={backgroundColor}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardHeader className="flex justify-between items-center">
          <Heading size="md">{title}</Heading>
          <div onClick={handlePinned} className={getIconHoverClass(isHovered)}>
            {isPinned ? (
              <BsPinFill className={styles["icon-style"]} />
            ) : (
              <BsPin className={styles["icon-style"]} />
            )}
          </div>
        </CardHeader>

        <CardBody className="flex flex-col justify-between">
          <Stack spacing="4">
            <Box>
              <Text pt="2" fontSize="sm">
                {content}
              </Text>
            </Box>
            <div className="flex items-center justify-between">
              <div className={getIconHoverClass(isHovered)}>
                {formatDate(createdAt)}
              </div>
              <Box className={getIconHoverClass(isHovered)}>
                {isArchived ? (
                  <IoArchive
                    onClick={handleArchive}
                    className={styles["icon-style"]}
                  />
                ) : (
                  <IoArchiveOutline
                    onClick={handleArchive}
                    className={styles["icon-style"]}
                  />
                )}
                <MdDeleteOutline
                  onClick={handleDeleteNotes}
                  className={styles["icon-style"]}
                />
                <MdOutlineEdit
                  onClick={openUpdateModal}
                  className={styles["icon-style"]}
                />
              </Box>
            </div>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default NoteCard;
