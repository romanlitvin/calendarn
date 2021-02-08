import React from "react";

import "./styles.scss";

const NotFoundRoute: React.FC = () => (
  <div className={"notFoundRouteContainer"}>
    <p className={"errorName"}>Error 404</p>
    <p className={"notFoundLabel"}>Page no fount 😒</p>
  </div>
);

export default React.memo(NotFoundRoute);
