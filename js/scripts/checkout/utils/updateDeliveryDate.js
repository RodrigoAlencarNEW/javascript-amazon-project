export function updateDeliveryDate(optionId) {
  let date = "";

  return (date = dayjs().add(optionId.days, "day").format("dddd, MMMM D"));
}
