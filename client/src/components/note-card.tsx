import { FC } from "react";
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

const NoteCard: FC = () => {
  return (
    <Card width={300} background={"aliceblue"}>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
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
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
