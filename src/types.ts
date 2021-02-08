import { ChangeEvent, MouseEvent, ReactChild } from "react";

export type TOnDivClickEvent = MouseEvent<HTMLDivElement>;
export type TTextInputChange = ChangeEvent<HTMLInputElement>;
export type TTextAreaChange = ChangeEvent<HTMLTextAreaElement>;

export type TCalendarEvent = gapi.client.calendar.Event;

export type TStringMap<T> = { [key: string]: T };
export type TCoordinates = { x: number; y: number };
export type TChildren = ReactChild | ReactChild[];
