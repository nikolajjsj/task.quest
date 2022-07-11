export const formatTime = (time: number): string => {
  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  const secPrecision = sec.toFixed(0).padStart(2, "0");
  return `${min}:${secPrecision}`;
};
