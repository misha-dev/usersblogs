const dateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric"
};
export const dateFormat = new Intl.DateTimeFormat(navigator.language, dateOptions);
