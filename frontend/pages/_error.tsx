import { Response } from "express";
import { PropsWithChildren } from "react";
import { WithTranslation } from "next-i18next";

import intl from "../utils/i18n";

const { withTranslation } = intl;

type ErrorProps = PropsWithChildren<WithTranslation> & {
  statusCode: number;
};

const Error = ({ statusCode, t }: ErrorProps) => {
  return <p>{statusCode ? t("error-with-status", { statusCode }) : t("error-without-status")}</p>;
};

Error.getInitialProps = async ({ err, res }: { res: Response; err: any }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ["common"],
    statusCode,
  };
};

export default withTranslation("common")(Error);
