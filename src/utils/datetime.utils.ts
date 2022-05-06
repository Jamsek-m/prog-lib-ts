/**
 * Extracts day of a week so that 0 means monday and 6 sunday
 * (opposed to standard 0 sunday)
 * @param date from where to extract day of week
 * @returns day of week, starting with monday as 0
 * @throws {ReferenceError} if date is null
 */
export function getDayOfWeek(date: Date): number {
    if (!date) {
        throw new ReferenceError("date must not be null!");
    }
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        return 6;
    }
    return dayOfWeek - 1;
}

/**
 * Returns new {@link Date}, that is days from given date
 * @param date starting date
 * @param daysFrom number of days from starting date
 * @returns new {@link Date} instance, that is <code>daysFrom</code> days from given date
 * @throws {ReferenceError} if date is null
 */
export function getDateDaysAfter(date: Date, daysFrom: number): Date {
    if (!date) {
        throw new ReferenceError("date must not be null!");
    }
    
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysFrom);
    return newDate;
}

/**
 * Returns new {@link Date}, that is days before given date
 * @param date starting date
 * @param diff number of days before starting date
 * @returns new {@link Date} instance, that is <code>diff</code> days before given date
 * @throws {ReferenceError} if date is null
 */
export function getDateDaysBefore(date: Date, diff: number): Date {
    return getDateDaysAfter(date, -diff);
}

/**
 * Returns new {@link Date} with trimmed time part.
 * @deprecated A {@link truncateTime} should be used instead as a drop-in replacement. This function will be removed in the 0.4.0 version.
 * @param date to trim time from
 * @returns new {@link Date} instance with all time parts set to 0
 * @throws {ReferenceError} if date is null
 */
export function resetTime(date: Date): Date {
    if (!date) {
        throw new ReferenceError("date must not be null!");
    }
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

/**
 * Returns new {@link Date} with truncated time part
 * @param date to truncate time from
 * @returns new {@link Date} instance with all time parts set to 0
 * @throws {ReferenceError} if date is null
 */
export function truncateTime(date: Date | number | string): Date {
    if (!date) {
        throw new ReferenceError("date must not be null!");
    }
    return resetTime(new Date(date));
}

/**
 * Calculates the difference between two dates.
 * @param date1 older date
 * @param date2 newer date
 * @returns difference in days, between the two given dates
 * @throws {ReferenceError} if any date is null
 */
export function daysDiffBetweenDates(date1: Date, date2: Date): number {
    if (!date1 || !date2) {
        throw new ReferenceError("date must not be null!");
    }
    const diff = date2.getTime() - date1.getTime();
    return Math.round(diff / 1000 / 60 / 60 / 24);
}
