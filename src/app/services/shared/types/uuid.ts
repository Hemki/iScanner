type uuid = string & {
    __value__: never
};

// Custom error types
export class StringOfLengthError extends Error { }
export class NotStringError extends Error { }
export class InvalidCharacterError extends Error { }

// Type guard function
const isStringOfLength = (str: string, min: number, max: number): str is uuid =>
    str.length >= min && str.length <= max;

const isValidHexadecimal = (str: string): boolean => /^[0-9A-Fa-f]+$/.test(str);

// type constructor function
export const Uuid = (input: unknown): uuid => {
    const min = 32;
    const max = 32;
    if (typeof input !== "string") {
        throw new NotStringError("invalid input");
    }

    if (typeof min !== "number" || typeof max !== "number") {
        throw new Error("Invalid min or max: min and max must be valid numbers");
    }

    if (min < 0 || max < 0 || min > max) {
        throw new Error("Invalid range: min and max must be positive and min should be less than or equal to max");
    }

    if (!isStringOfLength(input, min, max)) {
        throw new StringOfLengthError(`UUID must be ${max} hexadecimal digits`);
    }

    if (!isValidHexadecimal(input)) {
        throw new InvalidCharacterError("Invalid character: UUID can only contain hexadecimal digits (0-9, A-F)");
    }

    return input as uuid;
};