import React from "react";

import "./styles.scss";

import { RouteProps, Redirect } from "react-router-dom";

import { useGoogleSignIn } from "../../context/GoogleSignInContext/googleSignInContext";

import BaseButton from "../../atoms/Buttons/BaseButton";

interface IProps extends RouteProps {}

const SignIn: React.FC<IProps> = ({ location }) => {
  // @ts-ignore
  const { from } = location?.state || { from: { pathname: "/calnedarn" } };

  const { signIn, isAuthenticated } = useGoogleSignIn();

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <div className={"signInContainer"}>
      <BaseButton
        className={"googleAuthButtonContainer"}
        size={"xlarge"}
        onClick={signIn}
        label={"Sign in with Google"}>
        <img
          className={"googleLogoImage"}
          alt={"google auth image"}
          src={
            "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
          }
        />
      </BaseButton>
    </div>
  );
};

export default React.memo(SignIn);
