import React from "react";

import "./styles.scss";

interface IProps {
  monthTitle: string;
}

const MonthYearTitle: React.FC<IProps> = ({ monthTitle }) => (
  <p className={"title"}>{monthTitle}</p>
);

export default React.memo(MonthYearTitle);
