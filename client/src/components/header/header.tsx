import { FC, useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import CreateAndUpdateModal from "../modal/create-and-update-modal";

const Header: FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="flex justify-end m-5">
      <Button onClick={() => setSubmitted(true)}>Create Note</Button>
      <CreateAndUpdateModal
        isOpen={submitted}
        onClose={() => setSubmitted(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={() => setSubmitted(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </CreateAndUpdateModal>
    </div>
  );
};

export default Header;
