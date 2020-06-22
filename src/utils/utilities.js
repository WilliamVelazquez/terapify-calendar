export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${yyyy}/${mm}/${dd}`;
};

export const getCurrentTime = () => {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const getlastDateAfterDays = (days = 7) => {
  const laterDate = new Date();
  laterDate.setDate(laterDate.getDate() + days);
  laterDate.setHours(23,59,59,999);
  return laterDate
}

export const formatDate = (date = new Date()) => {
  const givenDate = new Date(date)
  let month = '' + (givenDate.getMonth() + 1);
  let day = '' + givenDate.getDate();
  const year = givenDate.getFullYear();

  if (month.length < 2)  month = '0' + month;
  if (day.length < 2)  day = '0' + day;

  return [year, month, day].join('-');
}

export const formatTime = (date = new Date()) => {
  const givenDate = new Date(date)
  let hour = '' + givenDate.getHours();
  let minutes = '' + givenDate.getMinutes();

  if (hour.length < 2) hour = '0' + hour;
  if (minutes.length < 2) minutes = '0' + minutes;

  return [hour, minutes].join(':');
}
