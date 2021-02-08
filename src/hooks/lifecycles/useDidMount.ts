import { useEffect, useRef } from "react";

export default (callback: () => void) => {
  const shouldCallOnMount = useRef<boolean>(true);
  useEffect(() => {
    if (shouldCallOnMount) {
      callback();
    }
    shouldCallOnMount.current = false;
  }, []);
};
