export const nextweek = (date, newModule) => {
  const today = new Date(date);
  const nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7,
    newModule.getHours(),
    newModule.getMinutes(),
  );
  return nextweek;
};
export const nextMonth = (date, newModule) => {
  var dy = date.getDay();
  date.setMonth(date.getMonth() + 1 * 1);
  date.setDate(date.getDate() - (date.getDay() - dy));
  date.setHours(new Date(newModule).getHours());
  date.setMinutes(new Date(newModule).getHours());
  return date;
};
