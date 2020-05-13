const time = new Date();
const nextHours = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];

// Todo => Time Zone Issue

export default function getHours() {
  const next24Hours = nextHours.map((hour) => {
    // If Current Hour + the next X hour is less than 24 means
    //we can return it without change if it is less or greater than 12
    if (hour + time.getHours() <= 24) {
      return `${hour + time.getHours()}:00`;
      // If current Hour + the next X hour is greater than 24 means
      //it is going to next day so we must reduce 24 hours from it
      //to get the real time inside a 24 hour standard
    } else {
      return `${hour + time.getHours() - 24}:00`;
    }
  });

  return next24Hours;
}
