export interface Validator {
  condition?: number | string;
  isValid: (value: string) => boolean;
}

export const VALIDATOR_REQUIRE = (): Validator => ({
  isValid: (value) => {
    return value.trim().length > 0;
  },
});

export const VALIDATOR_MINLENGTH = (condition: number): Validator => ({
  condition,
  isValid: (value) => value.trim().length >= condition,
});

export const VALIDATOR_MAXLENGTH = (condition: number): Validator => ({
  condition,
  isValid: (value) => value.trim().length <= condition,
});

export const VALIDATOR_MIN = (condition: number): Validator => ({
  condition,
  isValid: (value) => +value! >= condition,
});

export const VALIDATOR_MAX = (condition: number): Validator => ({
  condition,
  isValid: (value) => +value <= condition,
});

export const VALIDATOR_EMAIL = (): Validator => ({
  isValid: (value) => /^\S+@\S+\.\S+$/.test(value),
});

export const VALIDATOR_CONFIRM_PASSWORD = (condition: string): Validator => ({
  condition,
  isValid: (value) => value === condition,
});

export const validate = (value: string, validators: Validator[]) => {
  let isValid = true;
  for (const validator of validators) {
    isValid = isValid && validator.isValid(value);
  }
  return isValid;
};
