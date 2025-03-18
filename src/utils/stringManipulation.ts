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
