export const PHONE_REGEX = /^01[0125]\d{8}$/;
export const NAME_REGEX = /^[\u0600-\u06FFa-zA-Z ]{1,40}$/;
export const PLATE_REGEX = /^[\u0600-\u06FFA-Za-z0-9 ]{3,12}$/;
export const USERNAME_REGEX = /^[A-Za-z0-9._]{3,20}$/;
export const PART_CODE_REGEX = /^[A-Za-z]{2}-\d{3}$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const INTEGER_REGEX = /^\d+$/;

export const isNonNegative = (value) =>
  value !== "" && !Number.isNaN(Number(value)) && Number(value) >= 0;
export const isPositive = (value) => value !== "" && Number(value) > 0;
