/**
 * Obfuscates an email address by masking part of the local part.
 *
 * The function ensures that the first three characters and the last two characters
 * of the local part of the email are visible, while the middle part is replaced with asterisks.
 * If the local part is 3 characters or less, only the first character is shown followed by asterisks.
 *
 * @param email - The email address to be obfuscated.
 * @returns The obfuscated email address. If the input is not a valid email, it returns the original input.
 */
export const obfuscateEmail = (email: string): string => {
  if (!email) return '';

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email; // Ensure valid email format

  // Always show the first and last character, obfuscate the middle part
  if (localPart.length <= 3) {
    return `${localPart[0]}*****@${domain}`;
  }

  const firstPart = localPart.slice(0, 3); // Show first 3 characters
  const lastPart = localPart.slice(-2); // Show last 2 characters

  return `${firstPart}*****${lastPart}@${domain}`;
};

export const searchArray = <T>(
  array: T[],
  key: keyof T,
  searchTerm: string
): T[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return array.filter((item) => {
    const value = item[key];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(lowerCaseSearchTerm);
    }
    return false; // Skip non-string values
  });
};
export const obfuscateString = (str: string): string => {
  if (!str) return '';
  if (str.length === 10) {
    return str.slice(0, 3) + '*****' + str.slice(-2);
  } else return str.slice(0, 3) + '*****' + str.slice(-3);
};

export const getTimeDifference = (targetDate: string): string => {
  const now = new Date();
  const futureDate = new Date(targetDate);

  if (isNaN(futureDate.getTime())) {
    return 'Invalid date';
  }

  const diffInMs = futureDate.getTime() - now.getTime();
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInWeeks > 0) {
    return `${diffInWeeks} Week${diffInWeeks > 1 ? 's' : ''}`;
  } else if (diffInWeeks < 0) {
    return `${Math.abs(diffInWeeks)} Week${
      Math.abs(diffInWeeks) > 1 ? 's' : ''
    } ago`;
  } else {
    if (diffInDays > 0) {
      return `${diffInDays} Day${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInDays < 0) {
      return `${Math.abs(diffInDays)} Day${
        Math.abs(diffInDays) > 1 ? 's' : ''
      } ago`;
    } else {
      return 'Today';
    }
  }
};

export const formatToAmount = (value: string | number): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(number)) {
    return '0.00'; // Handle invalid input
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
