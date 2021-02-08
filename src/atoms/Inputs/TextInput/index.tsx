import React from "react";

import "./styles.scss";
import { TTextInputChange } from "../../../types";

interface IProps {
  label: string;
  onChange: (event: TTextInputChange) => void;
}

const TextInput: React.FC<IProps> = ({ label, onChange }) => (
  <>
    <p className={"textInputLabel"}>{label}</p>
    <div className={"textInputContainer"}>
      <input onChange={onChange} className={"textInput"} type={"text"} />
    </div>
  </>
);

export default React.memo(TextInput);
