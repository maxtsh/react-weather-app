const time = new Date();

export const weekDays = {
  English: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  Persian: [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ],
};

export function getWeekDays(lang) {
  return weekDays[lang];
}

export default function getDaily(lang) {
  const next7Days = [];

  // If today is 5 day of the week according to time.getDay()
  //we get rest of the days after it
  for (let i = time.getDay() + 1; i < 7; i++) {
    next7Days.push(weekDays[lang][i]);
  }
  // If today is 5 day of the week according to time.getDay()
  //we get the rest of the days before it
  for (let x = 0; x <= time.getDay(); x++) {
    next7Days.push(weekDays[lang][x]);
  }

  return next7Days;
}
