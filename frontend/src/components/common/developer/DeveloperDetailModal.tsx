import React from "react";

import DeveloperDetail from "./DeveloperDetail";
import { GithubUser } from "../../../utils/types";

type DeveloperDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  developer: GithubUser | undefined;
};

const DeveloperDetailModal = ({ developer, onClose, visible }: DeveloperDetailModalProps) => {
  return (
    <>
      {visible && (
        <div id="developer-modal">
          <DeveloperDetail data={developer} onClose={onClose} />
        </div>
      )}
    </>
  );
};

export default DeveloperDetailModal;
