export function convertDate(date) {
  let newDate = dayjs(date)
    .format("dddd, MMMM D")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return newDate;
}
