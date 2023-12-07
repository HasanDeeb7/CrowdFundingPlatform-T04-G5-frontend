export function getPercentage(currentValue, goalValue) {
  const result = Math.floor((currentValue / goalValue) * 100);
  return result >= 100 ? 100 : result;
}
