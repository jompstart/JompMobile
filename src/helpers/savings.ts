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
      totalPeriods = Math.floor(diffInMs / msInDay);
      break;
    }

    case 'weekly': {
      totalPeriods = Math.floor(diffInMs / (msInDay * 7));
      break;
    }

    case 'monthly': {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      let months = (endYear - startYear) * 12 + (endMonth - startMonth);

      // Only count the final month if the end date is after the start day
      if (end.getDate() > start.getDate()) {
        months += 1;
      }

      totalPeriods = months;
      break;
    }

    default:
      return 0;
  }

  if (totalPeriods === 0) {
    return targetAmount; // fallback — could mean a 1-period goal
  }

  return parseFloat((targetAmount / totalPeriods).toFixed(2));
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
  contribution: number,
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
      const yearDiff = end.getFullYear() - start.getFullYear();
      const monthDiff = end.getMonth() - start.getMonth();
      totalPeriods = yearDiff * 12 + monthDiff;

      // Only count the final month if a full period has passed
      if (end.getDate() > start.getDate()) {
        totalPeriods += 1;
      }
      break;
    }

    case 'weekly': {
      const diffInMs = end.getTime() - start.getTime();
      const fullWeeks = diffInMs / (7 * 24 * 60 * 60 * 1000);
      totalPeriods = Math.floor(fullWeeks); // Only count full weeks
      break;
    }

    case 'daily': {
      const diffInMs = end.getTime() - start.getTime();
      const fullDays = diffInMs / (24 * 60 * 60 * 1000);
      totalPeriods = Math.floor(fullDays); // Only count full days
      break;
    }

    default:
      throw new Error('Invalid frequency');
  }

  return contribution * totalPeriods;
};

export const formatDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid start or end date');
    return '';
  }

  const diffInMs = end.getTime() - start.getTime();

  if (diffInMs <= 0) {
    console.error('End date must be after start date');
    return '';
  }

  // Convert the difference to days, weeks, months, and years
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.ceil(diffInDays / 7);
  const diffInMonths = Math.ceil(diffInDays / 30); // Approximate months
  const diffInYears = Math.ceil(diffInDays / 365); // Approximate years

  // Determine the appropriate unit
  if (diffInYears >= 1) {
    return `${diffInYears}year${diffInYears > 1 ? 's' : ''}`;
  } else if (diffInMonths >= 1) {
    return `${diffInMonths}month${diffInMonths > 1 ? 's' : ''}`;
  } else if (diffInWeeks >= 1) {
    return `${diffInWeeks}week${diffInWeeks > 1 ? 's' : ''}`;
  } else {
    return `${diffInDays}day${diffInDays > 1 ? 's' : ''}`;
  }
};

export const formatSavingsDuration = (durationDate: Date): string => {
  const now = new Date();
  const duration = new Date(durationDate);

  if (isNaN(duration.getTime())) {
    console.error('Invalid duration date');
    return '';
  }

  const diffInMs = duration.getTime() - now.getTime();

  if (diffInMs <= 0) {
    console.error('Duration date must be in the future');
    return '';
  }

  // Convert the difference to days, weeks, months, and years
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.ceil(diffInDays / 7);
  const diffInMonths = Math.ceil(diffInDays / 30); // Approximate months
  const diffInYears = Math.ceil(diffInDays / 365); // Approximate years

  // Determine the appropriate unit
  if (diffInYears >= 1) {
    return `${diffInYears}year${diffInYears > 1 ? 's' : ''}`;
  } else if (diffInMonths >= 1) {
    return `${diffInMonths}month${diffInMonths > 1 ? 's' : ''}`;
  } else if (diffInWeeks >= 1) {
    return `${diffInWeeks}week${diffInWeeks > 1 ? 's' : ''}`;
  } else {
    return `${diffInDays}day${diffInDays > 1 ? 's' : ''}`;
  }
};
