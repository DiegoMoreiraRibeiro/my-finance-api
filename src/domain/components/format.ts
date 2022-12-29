export function FormatDateInit(date: Date) {
  date = new Date(date);
  const month = date.getMonth() + 1;
  const initDate =
    date.getFullYear() +
    '-' +
    (month <= 9 ? '0' + month : month) +
    '-' +
    date.getDate() +
    ' 00:00:00';

  return initDate;
}

export function FormatDateEnd(date: Date) {
  date = new Date(date);
  const month = date.getMonth() + 1;
  const initDate =
    date.getFullYear() +
    '-' +
    (month <= 9 ? '0' + month : month) +
    '-' +
    date.getDate() +
    ' 23:59:59';
  return initDate;
}
