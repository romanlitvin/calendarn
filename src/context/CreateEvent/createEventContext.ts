import { createContext, useContext } from "react";
import { Moment } from "moment";

export interface ICreateEventContextProps {
  openCreateEventModal: (onDateToCreate: Moment) => void;
}

const createEventContext = createContext<ICreateEventContextProps>({
  openCreateEventModal: () => {},
});

export default createEventContext;

export const useCreateEvent = () =>
  useContext<ICreateEventContextProps>(createEventContext);
