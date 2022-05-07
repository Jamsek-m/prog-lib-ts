/**
 * Checks whether given number is integer
 * @param value number to be checked
 * @returns <code>true</code> if variable contains integer, <code>false</code> otherwise
 */
export function isInteger(value: unknown): boolean {
    if (isNumber(value)) {
        return Number.isInteger(parseFloat(value as string));
    }
    return false;
}

/**
 * Checks whether given number is decimal
 * @param value number to be checked
 * @returns <code>true</code> if variable contains decimal number, <code>false</code> otherwise
 */
export function isFloat(value: unknown): boolean {
    if (isNumber(value)) {
        return !isInteger(value);
    }
    return false;
}

/**
 * Checks whether given string is integer.
 * @deprecated Use {@link isInteger} instead. This function will be removed in 0.4.0
 * @param str string to be checked
 * @returns <code>true</code> if variable contains integer, <code>false</code> otherwise
 */
export function stringIsInteger(str: string): boolean {
    if (str && str.length > 0) {
        const n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n > 0;
    }
    return false;
}

/**
 * Checks whether given value is a number or not
 * @param value value to be checked
 * @returns <code>true</code> if given value is number (integer or float), <code>false/<code> otherwise
 */
export function isNumber(value: unknown): boolean {
    if (typeof value === "boolean") {
        return false;
    }
    if (typeof value === "string" && value.trim().length === 0) {
        return false;
    }
    if (typeof value === "object") {
        return false;
    }
    return !isNaN(Number(value));
}
