import React from "react";

import "./styles.scss";
import { TTextAreaChange } from "../../../types";

interface IProps {
  label: string;
  onChange?: (event: TTextAreaChange) => void;
}

const TextArea: React.FC<IProps> = ({ label, onChange }) => (
  <>
    <p className={"textAreaLabel"}>{label}</p>
    <div className={"textAreaContainer"}>
      <textarea onChange={onChange} className={"textArea"} />
    </div>
  </>
);

export default React.memo(TextArea);
