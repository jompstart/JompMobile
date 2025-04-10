export const calculateSavingsPerPeriod = (
  targetAmount: number,
  startDate: string, // ISO string
  endDate: string, // ISO string
  frequency: 'monthly' | 'weekly' | 'daily'
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid date(s):', { startDate, endDate });
    return 0;
  }

  if (end <= start) {
    throw new Error('End date must be after start date');
  }

  const diffInMs = end.getTime() - start.getTime();
  const msInDay = 1000 * 60 * 60 * 24;

  let totalPeriods = 0;

  switch (frequency) {
    case 'daily': {
      totalPeriods = diffInMs / msInDay;
      break;
    }
    case 'weekly': {
      totalPeriods = diffInMs / (msInDay * 7);
      break;
    }
    case 'monthly': {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      totalPeriods = (endYear - startYear) * 12 + (endMonth - startMonth);

      // Adjust for partial months
      const sameDay = end.getDate() >= start.getDate();
      if (sameDay) totalPeriods += 1;
      else {
        // If it's less than full month but still spans two months, add fractional part
        const daysInStartMonth = new Date(
          startYear,
          startMonth + 1,
          0
        ).getDate();
        const remainingDays =
          daysInStartMonth - start.getDate() + end.getDate();
        totalPeriods += remainingDays / daysInStartMonth;
      }
      break;
    }
    default:
      console.log('Invalid frequency:', frequency);
      return 0;
  }

  // Round periods to a reasonable precision to avoid tiny floating errors
  const periodCount = parseFloat(totalPeriods.toFixed(4));

  return parseFloat((targetAmount / periodCount).toFixed(2));
};

export const generateSuggestions = (baseAmount: number): number[] => {
  return [
    Math.ceil(baseAmount * 0.5), // 50% of the base amount
    Math.ceil(baseAmount), // 100% of the base amount
    Math.ceil(baseAmount * 1.5), // 150% of the base amount
    Math.ceil(baseAmount * 2), // 200% of the base amount
  ];
};
