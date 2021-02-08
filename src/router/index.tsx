import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./atoms/PrivateRoute";
import SignIn from "../screens/SignIn";
import CalendarRouter from "./Calendar";
import NotFoundRoute from "../screens/NotFound";

const RootRouter: React.FC = () => (
  <Switch>
    <Route path={"/"} exact render={() => <Redirect to={"signIn"} />} />
    <Route path={"/signIn"} component={SignIn} />
    <PrivateRoute path={"/calnedarn"} component={CalendarRouter} />
    <Route component={NotFoundRoute} />
  </Switch>
);

export default React.memo(RootRouter);
