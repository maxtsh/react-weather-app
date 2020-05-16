const time = new Date();

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function getDaily() {
  const next7Days = [];

  // If today is 5 day of the week according to time.getDay()
  //we get rest of the days after it
  for (let i = time.getDay() + 1; i < 7; i++) {
    next7Days.push(weekDays[i]);
  }
  // If today is 5 day of the week according to time.getDay()
  //we get the rest of the days before it
  for (let x = 0; x <= time.getDay(); x++) {
    next7Days.push(weekDays[x]);
  }

  return next7Days;
}
