import { Button } from "@/lib";
import { SubmitButtonType } from "@/types";

export const SubmitButton = ({
  isLoading,
  loadingText,
  authType,
}: SubmitButtonType) => {
  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingText}
      colorScheme="teal"
      variant="outline"
      type="submit"
    >
      {authType}
    </Button>
  );
};
