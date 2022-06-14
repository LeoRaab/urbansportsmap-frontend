enum VALIDATOR_TYPE {
    REQUIRE = "REQUIRE",
    MINLENGTH = "MINLENGTH",
    MAXLENGTH = "MAXLENGTH",
    MIN = "MIN",
    MAX = "MAX",
    EMAIL = "EMAIL",
    FILE = "FILE",
}

export interface Validator {
    type: VALIDATOR_TYPE;
    condition?: number;
    isValid: (value: string) => boolean;
}

export const VALIDATOR_REQUIRE = (): Validator => ({
    type: VALIDATOR_TYPE.REQUIRE,
    isValid: (value) => {
        return value.trim().length > 0;
    },
});

export const VALIDATOR_MINLENGTH = (condition: number): Validator => ({
    type: VALIDATOR_TYPE.MINLENGTH,
    condition,
    isValid: (value) => value.trim().length >= condition,
});

export const VALIDATOR_MAXLENGTH = (condition: number): Validator => ({
    type: VALIDATOR_TYPE.MAXLENGTH,
    condition,
    isValid: (value) => value.trim().length <= condition,
});

export const VALIDATOR_MIN = (condition: number): Validator => ({
    type: VALIDATOR_TYPE.MIN,
    condition,
    isValid: (value) => +value! >= condition,
});

export const VALIDATOR_MAX = (condition: number): Validator => ({
    type: VALIDATOR_TYPE.MAX,
    condition,
    isValid: (value) => +value <= condition,
});

export const VALIDATOR_EMAIL = (): Validator => ({
    type: VALIDATOR_TYPE.EMAIL,
    isValid: (value) => /^\S+@\S+\.\S+$/.test(value),
});

export const validate = (value: string, validators: Validator[]) => {
    let isValid = true;
    for (const validator of validators) {
        isValid = isValid && validator.isValid(value);
    }
    return isValid;
};
