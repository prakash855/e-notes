import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export const useLoader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const withLoading = async <T,>(
    action: () => Promise<T>
  ): Promise<T | undefined> => {
    try {
      setLoading(true);
      return await action();
    } finally {
      setLoading(false);
    }
  };

  const dispatchWithLoading = async <T,>(
    thunkAction: (dispatch: AppDispatch) => Promise<T>
  ): Promise<T | undefined> => {
    return withLoading(() => dispatch(thunkAction));
  };

  return { loading, dispatchWithLoading };
};
