import { ChangeEvent, useCallback, useState } from "react";

type TUseInputChange<T> = [string, (event: T) => void];
type TUseInputChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export default <T extends TUseInputChangeEvent>(): TUseInputChange<T> => {
  const [value, setValue] = useState<string>("");

  const onInputChange = useCallback(
    (event: T) => setValue(event.target.value),
    [],
  );

  return [value, onInputChange];
};
