import { FC, useEffect } from "react";

import { useToast } from "@/components";

interface ToastProps {
  title: string;
  description: string;
  status?: "loading" | "success" | "info" | "warning" | "error" | undefined;
  duration?: number;
  isClosable?: boolean;
}

const Toast: FC<ToastProps> = ({
  title,
  description,
  status = "success",
  duration = 1,
  isClosable = true,
}) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  }, [title, description, status, duration, isClosable, toast]);

  return null;
};

export default Toast;
