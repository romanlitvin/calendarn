export default (url: string): void => {
  const win = window.open(url, "_blank");
  win?.focus();
};
