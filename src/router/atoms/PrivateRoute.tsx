import React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import { useGoogleSignIn } from "../../context/GoogleSignInContext/googleSignInContext";

interface IProps extends Omit<RouteProps, "render"> {
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isAuthenticated } = useGoogleSignIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          Component ? (
            <Component {...props} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{ pathname: "/signIn", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default React.memo(PrivateRoute);
