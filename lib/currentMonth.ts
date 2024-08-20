export const currentMonth = () => {
  const monthsOfYear = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const currentMonth = monthsOfYear[date.getMonth()];
  return currentMonth;
}
