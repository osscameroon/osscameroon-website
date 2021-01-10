import React from "react";
import { Spinner } from "reactstrap";
import { useIntl } from "react-intl";

import { commonMessages } from "../../locales/messages";

type LoaderProps = {
  loading: boolean;
};

const Loader = ({ loading }: LoaderProps) => {
  const { formatMessage } = useIntl();

  if (!loading) return null;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <Spinner color="primary" />
      <div className="mt-2">{formatMessage(commonMessages.loading)}</div>
    </div>
  );
};

export default Loader;
