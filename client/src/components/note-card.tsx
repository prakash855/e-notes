import { FC, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

import { BsPin, BsFillPinFill } from "react-icons/bs";
import { IoColorPaletteOutline, IoArchiveOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import styles from "./note-card.module.scss";
import { getIconHoverClass } from "../style";

const NoteCard: FC = () => {
  const [isHovered, setHovered] = useState(false);

  const PinnedIcon = () => (
    <div className={getIconHoverClass(isHovered)}>
      {true ? (
        <BsPin className={styles["icon-style"]} />
      ) : (
        <BsFillPinFill className={styles["icon-style"]} />
      )}
    </div>
  );

  return (
    <Card
      cursor={`pointer`}
      width={300}
      background={"aliceblue"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardHeader className="flex justify-between items-center">
        <Heading size="md">Client Report</Heading>
        <PinnedIcon />
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Tempora unde magnam
              incidunt dolores harum enim reiciendis magni voluptatem
              voluptatibus voluptates accusantium sint in, cum nostrum
              voluptatum illo asperiores! Facere, sed.
            </Text>
          </Box>
          <Box className={getIconHoverClass(isHovered)}>
            <IoColorPaletteOutline className={styles["icon-style"]} />
            <IoArchiveOutline className={styles["icon-style"]} />
            <MdDeleteOutline className={styles["icon-style"]} />
            <MdOutlineEdit className={styles["icon-style"]} />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
