import React, { useCallback, useEffect, useState } from "react";

import GoogleSignInContext from "./googleSignInContext";

import { GoogleSignInInstance } from "../../config/GoogleSignIn";

import { TChildren } from "../../types";

interface IProps {
  children: TChildren;
}

const GoogleSignInProvider: React.FC<IProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticatedStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const isCustomerAuthed = GoogleSignInInstance.isCustomerAuthed;
      if (isCustomerAuthed) {
        await GoogleSignInInstance.setUpGoogleServices();
        setAuthenticatedStatus(isCustomerAuthed);
      }
      setIsLoading(false);
    })();
  }, []);

  const authenticate = useCallback(async () => {
    try {
      await GoogleSignInInstance.authorizeWithGoogle();
      setAuthenticatedStatus(true);
    } catch (err) {
      console.log("err authenticate google sign in provider", err.message);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <GoogleSignInContext.Provider
      value={{ isAuthenticated, signIn: authenticate, isLoading }}>
      {children}
    </GoogleSignInContext.Provider>
  );
};

export default React.memo(GoogleSignInProvider);
