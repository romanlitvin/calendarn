import React, { forwardRef, useCallback, useMemo, useState } from "react";

import { Moment } from "moment";

import "./styles.scss";

import ModalBase, { TModalBaseRef } from "../../atoms/Modals/ModalBase";
import TimeUtils from "../../utils/TimeUtils";
import TextInput from "../../atoms/Inputs/TextInput";
import TextArea from "../../atoms/Inputs/TextArea";
import BaseButton from "../../atoms/Buttons/BaseButton";
import TimerPickerInput from "../../atoms/Inputs/TimePickerInput";

import useInputChange from "../../hooks/useInputChange";

export interface ICreateEventModalProps {
  ref: TModalBaseRef;
  onDateToCreate: Moment;
}

const CreateEventModal: React.FC<ICreateEventModalProps> = forwardRef(
  ({ onDateToCreate }, ref: TModalBaseRef) => {
    const [inputDate, setInputDate] = useState<Moment>(onDateToCreate);
    const [, onTitleChange] = useInputChange();
    const [, onDescriptionChange] = useInputChange();

    const formatted = useMemo(
      () => TimeUtils.formatDateCreation(onDateToCreate),
      [onDateToCreate],
    );

    const onModalClose = useCallback(() => setInputDate(onDateToCreate), [
      onDateToCreate,
    ]);

    const onSubmitClick = useCallback(() => alert("submit"), []);

    return (
      <ModalBase onClose={onModalClose} ref={ref}>
        <div className={"createEventModalContainer"}>
          <div className={"header"}>
            <div className={"headerTitleContainer"}>
              <p className={"title"}>Create Event</p>
              <p className={"subtitle"}>{formatted}</p>
            </div>
            <TimerPickerInput
              onInputDateChange={setInputDate}
              inputDate={inputDate}
            />
          </div>
          <TextInput onChange={onTitleChange} label={"Title"} />
          <TextArea onChange={onDescriptionChange} label={"Description"} />
          <BaseButton
            className={"submitBtn"}
            size={"large"}
            label={"Create event"}
            onClick={onSubmitClick}
          />
        </div>
      </ModalBase>
    );
  },
);

export default React.memo(CreateEventModal);
