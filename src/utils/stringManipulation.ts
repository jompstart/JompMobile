/**
 * Obfuscates the local part of an email address by replacing the second half with asterisks.
 *
 * @param {string} email - The email address to obfuscate.
 * @returns {string} The obfuscated email address. If the input email is empty, returns an empty string.
 */
export const obfuscateEmail = (email: string) => {
  if (!email) return '';

  const [localPart, domain] = email.split('@');
  const halfLength = Math.ceil(localPart.length / 2);
  const firstHalf = localPart.slice(0, halfLength);
  const secondHalf = localPart.slice(halfLength);

  return `${firstHalf}*****${secondHalf}@${domain}`;
};
