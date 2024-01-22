import { Spinner } from "@chakra-ui/react";

const Loader = () => (
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Spinner />
  </div>
);

export default Loader;
