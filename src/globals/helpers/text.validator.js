export const isEmpty = (field) => !field.length;

export const isTextValid = (field) => {
  const SPECIAL_CHARS = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return !SPECIAL_CHARS.test(field);
};
