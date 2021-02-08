import { DependencyList, useEffect, useRef } from "react";

export default (callback: () => void, deps: DependencyList) => {
  const shouldRenderOnMount = useRef<boolean>(false);

  useEffect(() => {
    if (shouldRenderOnMount.current) {
      callback();
    } else {
      shouldRenderOnMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
};
