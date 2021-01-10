import React from "react";
import { Spinner } from "reactstrap";

type LoaderProps = {
  loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => {
  if (!loading) return null;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <Spinner color="primary" />
      <div className="mt-2">Loading...</div>
    </div>
  );
};

export default Loader;
