import { Button, ModalFooter, ModalHeader, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../services";
import { AppDispatch } from "../store";
import { LogoutType } from "../types";
import { useLoader } from "./use-loader";

export const Logout = ({ onClose }: LogoutType) => {
  const { loading, dispatchWithLoading } = useLoader();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatchWithLoading(async () => {
      const resultAction = await dispatch(logout());
      if (logout.fulfilled.match(resultAction)) {
        const user = resultAction.payload;

        toast({
          title: "Success",
          description: user.message,
          status: "success",
          position: "top-right",
        });

        navigate("/login");
      }
    });
  };

  return (
    <>
      <ModalHeader textAlign="center">
        Are you sure, you want to Logout?
      </ModalHeader>
      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          Close
        </Button>
        <Button
          isLoading={loading}
          onClick={handleLogout}
          colorScheme="blue"
          mr={3}
        >
          Logout
        </Button>
      </ModalFooter>
    </>
  );
};
