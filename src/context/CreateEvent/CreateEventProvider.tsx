import React, { useCallback, useMemo, useRef, useState } from "react";

import { Moment } from "moment";

import CreateEventContext from "./createEventContext";
import CreateEventModal from "../../molecules/CreateEventModal";

import TimeUtils from "../../utils/TimeUtils";
import { useCalendar } from "../Calendar/calendarContext";

import { TModalBase } from "../../atoms/Modals/ModalBase";
import { TChildren } from "../../types";

interface IProps {
  children: TChildren;
}

const CalendarProvider: React.FC<IProps> = ({ children }) => {
  const createEventModalRef = useRef<TModalBase>(null);
  const [onDateToCreate, setOnDateToCreate] = useState<Moment>(TimeUtils.now());
  const { today } = useCalendar();

  const openCreateEventModal = useCallback(
    (inputDate: Moment) => {
      if (inputDate.isBefore(today, "day")) {
        alert("Creating event in pas tis not allowed !");
        return;
      }
      setOnDateToCreate(inputDate);
      createEventModalRef.current?.openModalDialog();
    },
    [today],
  );

  const providerValue = useMemo(() => ({ openCreateEventModal }), [
    openCreateEventModal,
  ]);

  return (
    <>
      <CreateEventModal
        onDateToCreate={onDateToCreate}
        ref={createEventModalRef}
      />
      <CreateEventContext.Provider value={providerValue}>
        {children}
      </CreateEventContext.Provider>
    </>
  );
};

export default React.memo(CalendarProvider);
