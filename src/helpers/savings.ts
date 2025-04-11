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
      return 0;
  }

  // Round periods to a reasonable precision to avoid tiny floating errors
  const periodCount = parseFloat(totalPeriods.toFixed(4));

  return parseFloat((targetAmount / periodCount).toFixed(2));
};

export const generateSuggestions = (baseAmount: number): number[] => {
  return [
    parseFloat((baseAmount * 0.5).toFixed(2)), // 50% of the base amount
    parseFloat(baseAmount.toFixed(2)), // 100% of the base amount
    parseFloat((baseAmount * 1.5).toFixed(2)), // 150% of the base amount
    parseFloat((baseAmount * 2).toFixed(2)), // 200% of the base amount
  ];
};

export const calculateGoalAmount = (
  preferredAmount: number,
  startDate: string, // ISO date string
  endDate: string, // ISO date string
  frequency: 'monthly' | 'weekly' | 'daily'
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid start or end date');
  }

  if (end <= start) {
    throw new Error('End date must be after start date');
  }

  let totalPeriods = 0;

  switch (frequency) {
    case 'monthly': {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      totalPeriods = (endYear - startYear) * 12 + (endMonth - startMonth);

      // Include the current month if the end date is later in the month
      if (end.getDate() >= start.getDate()) {
        totalPeriods += 1;
      }
      break;
    }
    case 'weekly': {
      const diffInMs = end.getTime() - start.getTime();
      totalPeriods = Math.ceil(diffInMs / (7 * 24 * 60 * 60 * 1000)); // Weeks
      break;
    }
    case 'daily': {
      const diffInMs = end.getTime() - start.getTime();
      totalPeriods = Math.ceil(diffInMs / (24 * 60 * 60 * 1000)); // Days
      break;
    }
    default:
      throw new Error('Invalid frequency');
  }

  return preferredAmount * totalPeriods;
};
