import React from "react";

import "./styles.scss";

import { useCalendar } from "../../context/Calendar/calendarContext";

const DateSelector: React.FC = () => {
  const { setPrevDate, setNextDate, resetCalendar } = useCalendar();

  return (
    <div className={"datePickerContainer"}>
      <img
        onClick={setPrevDate}
        alt={"chevron left"}
        className={"chevronLeft"}
        src={
          "https://www.materialui.co/materialIcons/navigation/chevron_right_white_192x192.png"
        }
      />
      <div className={"datePickerButton"} onClick={resetCalendar}>
        <p className={"datePicketButtonLabel"}>Today</p>
      </div>
      <img
        onClick={setNextDate}
        alt={"chevron right"}
        className={"chevronRight"}
        src={
          "https://www.materialui.co/materialIcons/navigation/chevron_right_white_192x192.png"
        }
      />
    </div>
  );
};

export default React.memo(DateSelector);
