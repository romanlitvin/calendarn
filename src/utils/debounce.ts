export default <T>(func: (...args: T[]) => any, timeout = 5000) => {
  let timeoutID: NodeJS.Timeout;
  return (...args: T[]): any => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
