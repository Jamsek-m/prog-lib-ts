/**
 * Validates whether given string is of UUID-like format.
 * @param value value to be checked
 * @returns <code>true</code> if value is in UUID-like format, <code>false</code> otherwise
 */
export function isUUID(value: string): boolean {
    if (!value) {
        return false;
    }
    const REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return REGEX.test(value);
}
