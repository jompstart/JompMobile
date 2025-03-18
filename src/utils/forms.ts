export const isAnyFieldEmpty = (object: Record<any, any>) => {
  // Check if the object has any keys and ensure all values are non-empty
  return (
    Object.keys(object).length === 0 || // Check if the object is empty
    Object.values(object).some((value) => !value || value.trim() === '')
  );
};
