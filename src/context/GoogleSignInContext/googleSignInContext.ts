import { createContext, useContext } from "react";

interface IGoogleSignInContextProps {
  signIn: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const googleSignInContext = createContext<IGoogleSignInContextProps>({
  signIn: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export default googleSignInContext;

export const useGoogleSignIn = (): IGoogleSignInContextProps =>
  useContext<IGoogleSignInContextProps>(googleSignInContext);
