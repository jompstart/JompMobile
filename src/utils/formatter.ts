export const toDp = (
  value?: number | string,
  decimalPlace: number = 4
): string => {
  if (!value || isNaN(+value)) {
    return (0).toFixed(decimalPlace); // Default to 0 with the specified decimal places
  }
  const factor = 10 ** decimalPlace;
  return (Math.floor(+value * factor) / factor).toFixed(decimalPlace);
};
