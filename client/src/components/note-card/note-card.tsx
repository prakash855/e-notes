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

import { BsPin, BsFillPinFill } from "react-icons/bs";
import { IoColorPaletteOutline, IoArchiveOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import styles from "./note-card.module.scss";
import { getIconHoverClass } from "../../style";
import { deleteNotes, Note } from "../../slices/services";
import { formatDate } from "../../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const NoteCard: FC = ({
  _id: id,
  title,
  content,
  createdAt,
  isArchived,
  backgroundColor,
}: Note) => {
  const [isHovered, setHovered] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteNotes = useCallback(
    (id: string) => {
      dispatch(deleteNotes(id));
    },
    [dispatch]
  );

  const PinnedIcon = () => (
    <div className={getIconHoverClass(isHovered)}>
      {isArchived ? (
        <BsFillPinFill className={styles["icon-style"]} />
      ) : (
        <BsPin className={styles["icon-style"]} />
      )}
    </div>
  );

  return (
    <Card
      cursor={`pointer`}
      width={300}
      background={backgroundColor}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardHeader className="flex justify-between items-center">
        <Heading size="md">{title}</Heading>
        <PinnedIcon />
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
              <IoColorPaletteOutline className={styles["icon-style"]} />
              <IoArchiveOutline className={styles["icon-style"]} />
              <MdDeleteOutline
                onClick={() => handleDeleteNotes(id)}
                className={styles["icon-style"]}
              />
              <MdOutlineEdit className={styles["icon-style"]} />
            </Box>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
