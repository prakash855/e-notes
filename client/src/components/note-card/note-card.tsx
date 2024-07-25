import { FC, useCallback, useState } from "react";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoArchive, IoArchiveOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

import { useToast } from "@/components";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@/lib";

import {
  archiveNoteById,
  deleteNotes,
  fetchNotes,
  pinNote,
  updateNotes,
} from "../../services";
import { AppDispatch } from "../../store";
import { getIconHoverClass } from "../../style";
import { Note } from "../../types";
import { formatDate } from "../../utils";
import Loader from "../loader";
import CreateAndUpdateModal from "../modal/create-and-update-modal";
import NoteForm from "../note-form/note-form";
import { useLoader } from "../use-loader";
import styles from "./note-card.module.scss";
import { Link } from "@chakra-ui/react";

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
  const [showEntireContent, setShowEntireContent] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { loading, dispatchWithLoading } = useLoader();

  const openUpdateModal = () => {
    setOpenEditModal(true);
    setEditMode(true);
  };

  const handleArchive = useCallback(() => {
    dispatchWithLoading(async (dispatch) => {
      if (id) {
        await dispatch(archiveNoteById(id));
        toast({
          title: `Note ${isArchived ? `Unarchived` : `Archived`}`,
          description: `Your note has been successfully ${
            isArchived ? `unarchived` : `archived`
          }.`,
          status: "success",
          position: "top-right",
        });
      }
    });
  }, [id, toast, isArchived, dispatchWithLoading]);

  const handleDeleteNotes = useCallback(() => {
    dispatchWithLoading(async (dispatch) => {
      if (id) {
        await dispatch(deleteNotes(id));
        toast({
          title: `Note Delted`,
          description: `Your note has been successfully deleted.`,
          status: "success",
          position: "top-right",
        });
      } else {
        console.log(`Invalid id`);
      }
    });
  }, [id, toast, dispatchWithLoading]);

  const handlePinned = useCallback(async () => {
    await dispatchWithLoading(async (dispatch) => {
      if (id) {
        const { payload } = await dispatch(pinNote(id));
        if (payload) {
          dispatch(fetchNotes());
          toast({
            title: `Note ${isPinned ? `Uninned` : `Pinned`}`,
            description: `Your note has been successfully ${
              isPinned ? `unpinned` : `pinned`
            }.`,
            status: "success",
            position: "top-right",
          });
        }
      }
    });
  }, [id, toast, isPinned, dispatchWithLoading]);

  const handleSubmit = useCallback(
    async (data: Note) => {
      await dispatchWithLoading(async () => {
        await dispatch(updateNotes(data));
        setOpenEditModal(false);
      });
    },
    [dispatch, dispatchWithLoading]
  );
  const toggleContentVisibility = () =>
    setShowEntireContent(!showEntireContent);

  const truncatedContent = showEntireContent
    ? content
    : `${content?.substring(0, 90)}...`;

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
        height={!showEntireContent ? 300 : ""}
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
              <Text whiteSpace="pre-wrap" pt="2" fontSize="sm">
                {truncatedContent}
              </Text>
              <Link
                className="flex justify-end"
                onClick={toggleContentVisibility}
              >
                {showEntireContent ? `Less` : `More`}
              </Link>
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
      {loading && <Loader />}
    </>
  );
};

export default NoteCard;
