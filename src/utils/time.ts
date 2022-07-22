export const formatTime = (time: number): string => {
  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  const secPrecision = sec.toFixed(0).padStart(2, "0");
  return `${min}:${secPrecision}`;
};

export const formatDateRelative = (date: Date | null): string => {
  if (!(date instanceof Date && !isNaN(date.getTime()))) return "";

  const diffMillis = new Date().valueOf() - date.valueOf();
  // We can't be sure it's an integer due to daylight saving.
  const diffDays = Math.round(diffMillis / (1000 * 3600 * 24));
  const pDiff = Math.abs(diffDays);

  if (diffDays <= -547) return `in ${Math.round(diffDays / 365)} year`;
  if (diffDays <= -547) return "in a year";
  if (diffDays <= -319) return `in ${Math.round(diffDays / 30)} months`;
  if (diffDays <= -45) return "in a month";
  if (diffDays <= -25) return `in ${pDiff} days`;
  if (diffDays === -2) return "day after tomorrow";
  if (diffDays === -1) return "tomorrow";
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  // These threshold are taken from moment.js' fromNow() method.
  if (diffDays <= 25) return `${diffDays} days ago`;
  if (diffDays <= 45) return "a month ago";
  if (diffDays <= 319) return `${Math.round(diffDays / 30)} months ago`;
  if (diffDays <= 547) return "a year ago";
  return `${Math.round(diffDays / 365)} years ago`;
};
