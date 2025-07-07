import { ServicesCategories } from '../services/providers/provider.dto';

export const getServiceMonths = (
  category: string,
  servicategories: ServicesCategories[]
) => {
  const matchedCategory = servicategories?.find((cat) => {
    return cat.name === category;
  });

  if (matchedCategory) {
    const durationString = matchedCategory?.duration;
    if (typeof durationString === 'string') {
      const durationInMonths =
        parseInt(durationString.replace(/\D/g, ''), 10) || 0;

      const monthsArray = Array.from(
        { length: durationInMonths },
        (_, i) => `Month ${i + 1}`
      );

      return monthsArray;
    } else return [];
  } else {
    return [];
  }
};

export const getOrdinal = (num: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const remainder = num % 100;

  // Handle special cases for 11, 12, 13
  if (remainder >= 11 && remainder <= 13) {
    return `${num}th`;
  }

  // Use suffix based on the last digit
  const lastDigit = num % 10;
  const suffix = suffixes[lastDigit] || 'th';

  return `${num}${suffix}`;
};
