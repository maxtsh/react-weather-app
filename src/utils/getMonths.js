export const months = {
  English: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  Persian: [
    "ژانویه",
    "فوریه",
    "مارس",
    "آپریل",
    "می",
    "ژوئن",
    "جولای",
    "آگوست",
    "سپتامبر",
    "اوکتبر",
    "نوامبر",
    "دسامبر",
  ],
};

export default function getMonths(lang) {
  return months[lang];
}
