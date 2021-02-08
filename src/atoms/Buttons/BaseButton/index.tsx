import React from "react";

import "./styles.scss";
import { TChildren } from "../../../types";

const baseButtonSizes = {
  small: {
    width: "150px",
    borderRadius: "15px",
  },
  medium: {
    width: "200px",
    borderRadius: "20px",
  },
  large: {
    width: "300px",
    borderRadius: "10px",
  },
  xlarge: {
    width: "300px",
    borderRadius: "10px",
  },
};

type TBaseButtonSize = keyof typeof baseButtonSizes;

interface IProps {
  label: string;
  onClick: () => void;
  size: TBaseButtonSize;
  className?: string;
  children?: TChildren;
}

const BaseButton: React.FC<IProps> = ({
  label,
  onClick,
  size,
  className,
  children,
}) => (
  <div
    onClick={onClick}
    className={`baseButtonContainer ${className}`}
    style={baseButtonSizes[size]}>
    <p className={"baseButtonLabel"}>{label}</p>
    {children}
  </div>
);

export default React.memo(BaseButton);
