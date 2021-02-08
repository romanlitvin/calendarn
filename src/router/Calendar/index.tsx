import React from "react";

import { Redirect, Route } from "react-router-dom";

import "./styles.scss";

import CalendarHeader from "../../atoms/Header";
import MonthYear from "../../screens/MonthYear";
import MonthSingle from "../../screens/MonthSingle";
import PrivateRoute from "../atoms/PrivateRoute";

import GoogleEventsProvider from "../../context/GoogleEvents/GoogleEventsProvider";

const CalendarRouter: React.FC = () => (
  <>
    <Route path={"/calnedarn"} exact render={() => <Redirect to={"/calnedarn/monthYear"} />} />
    <div className={"routerContainer"}>
      <CalendarHeader />
      <PrivateRoute exact path={"/calnedarn/monthYear"}>
        <div className={"monthYearZoomContainer"}>
          <MonthYear />
        </div>
      </PrivateRoute>
      <PrivateRoute exact path={"/calnedarn/singleMonth"}>
        <div className={"singleMonthZoomContainer"}>
          <GoogleEventsProvider>
            <MonthSingle />
          </GoogleEventsProvider>
        </div>
      </PrivateRoute>
    </div>
  </>
);

export default React.memo(CalendarRouter);
