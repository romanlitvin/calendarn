import React, { useCallback, useMemo, useRef } from "react";

import { Moment } from "moment";

import "./styles.scss";
import TimeUtils from "../../../utils/TimeUtils";

import ModalBase, { TModalBase } from "../../Modals/ModalBase";

type TInputTime = "hour" | "minute";

interface IProps {
  inputDate: Moment;
  onInputDateChange: (inputDate: Moment) => void;
}

const hours = [...Array(24)].map((_, index) => index);
const minutes = [...Array(60)].map((_, index) => index);

const TimerPickerInput: React.FC<IProps> = ({
  inputDate,
  onInputDateChange,
}) => {
  const modalBaseRef = useRef<TModalBase>(null);

  const setDefaultScrollPosition = useCallback(() => {
    const hours = inputDate.get("hours");
    const minute = inputDate.get("minute");

    const hoursLabelElement = document.getElementById(`hours-label${hours}`);
    const minutesLabelElement = document.getElementById(
      `hours-minutes${minute}`,
    );

    hoursLabelElement?.scrollIntoView(true);
    minutesLabelElement?.scrollIntoView(true);
  }, [inputDate]);

  const toggleTimePickerVisibility = useCallback(() => {
    modalBaseRef.current?.openModalDialog();
  }, []);

  const isTimeSelected = useCallback(
    (type: TInputTime, value: number) => value === inputDate.get(type),
    [inputDate],
  );

  const getSelectedTimeClassName = useCallback(
    (type: TInputTime, value: number) =>
      isTimeSelected(type, value)
        ? "timePickerLabelSelected"
        : "timePickerLabel",
    [isTimeSelected],
  );

  const selectTime = useCallback(
    (type: TInputTime, value: number) => () => {
      const copy = TimeUtils.now(inputDate);
      const formatted = copy.set(type, value);
      onInputDateChange(formatted);
    },
    [inputDate, onInputDateChange],
  );

  return (
    <div>
      <div
        id={"timePickerInput"}
        onClick={toggleTimePickerVisibility}
        className={"timePickerContainer"}>
        <p className={"timePickerInput"}>{inputDate.format("HH:mm")}</p>
      </div>
      <ModalBase
        onShow={setDefaultScrollPosition}
        backdropColor={"transparent"}
        ref={modalBaseRef}>
        <div className={"timeSelect"}>
          <div className={"timeSelectHours"}>
            {hours.map((el) => {
              const key = `hours-label${el}`;
              return (
                <p
                  id={key}
                  onClick={selectTime("hour", el)}
                  className={getSelectedTimeClassName("hour", el)}
                  key={key}>
                  {el < 10 ? `0${el}` : el}
                </p>
              );
            })}
          </div>
          <div className={"timeSelectMinutes"}>
            {minutes.map((el) => {
              const key = `hours-minutes${el}`;
              return (
                <p
                  id={key}
                  onClick={selectTime("minute", el)}
                  className={getSelectedTimeClassName("minute", el)}
                  key={key}>
                  {el < 10 ? `0${el}` : el}
                </p>
              );
            })}
          </div>
        </div>
      </ModalBase>
    </div>
  );
};

export default React.memo(TimerPickerInput);
