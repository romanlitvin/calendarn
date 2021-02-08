import React, { forwardRef, useCallback, useMemo, useState } from "react";

import ModalBase, { TModalBaseRef } from "../ModalBase";

import "./styles.scss";
import TimeUtils from "../../../utils/TimeUtils";

import { TCalendarEvent, TCoordinates } from "../../../types";

interface IProps {
  ref: TModalBaseRef;
  elementId: string;
  calendarEvent: TCalendarEvent | null;
}

const CalendarEventTooltipModal: React.FC<IProps> = forwardRef(
  ({ elementId, calendarEvent }, ref: TModalBaseRef) => {
    const [tooltipCoordinates, setTooltipCoordinates] = useState<TCoordinates>({
      x: 0,
      y: 0,
    });

    const readyTooltipsCoordinates = useMemo(() => {
      const { x, y } = tooltipCoordinates;
      const readyX = x <= window.innerWidth / 2 ? x + 220 : x - 320;

      return { left: readyX, top: y };
    }, [tooltipCoordinates]);

    const onModalShow = useCallback(() => {
      const element = document.getElementById(elementId);
      const coordinates = element?.getBoundingClientRect();
      setTooltipCoordinates({ x: coordinates?.x || 0, y: coordinates?.y || 0 });
    }, [elementId]);

    return (
      <ModalBase
        onShow={onModalShow}
        isFullWidth
        backdropColor={"transparent"}
        ref={ref}>
        <div
          className={"eventDescriptionContainer"}
          style={readyTooltipsCoordinates}>
          <p className={"title"}>{calendarEvent?.summary}</p>
          <p className={"subtitle"}>
            {TimeUtils.now(calendarEvent?.start?.date).format("MMMM DD Y")}
          </p>
        </div>
      </ModalBase>
    );
  },
);

export default React.memo(CalendarEventTooltipModal);
