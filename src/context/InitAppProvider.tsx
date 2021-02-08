import React, { useEffect, useState } from "react";

import { GoogleApi } from "../config/GoogleApi";
import { useGoogleSignIn } from "./GoogleSignInContext/googleSignInContext";

interface IProps {
  children: any;
}

const InitAppProvider: React.FC<IProps> = ({ children, ...props }) => {
  const [isGoogleApiSetUp, setGoogleApiSetUp] = useState<boolean>(false);
  const { isLoading } = useGoogleSignIn();

  useEffect(() => {
    (async () => {
      const GoogleAPIClient = new GoogleApi();
      await GoogleAPIClient.init();
      setGoogleApiSetUp(true);
    })();
  }, []);

  if (!isGoogleApiSetUp && isLoading) {
    return null;
  }

  return children;
};

export default React.memo(InitAppProvider);
