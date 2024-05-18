import { Link } from "react-router-dom";

import { AuthButtonType } from "../types";

export const AuthButton = ({ lable, path }: AuthButtonType) => {
  return (
    <Link className="flex justify-end" to={path}>
      {lable}
    </Link>
  );
};
