import {range} from "../misc/collections";

/**
 * Full ISO 8601 Date Time including timezone.
 * e.g. 2017-12-29T12:30:00+00:00 (UTC)
 */
export type DateTimeString = string;

/**
 * ISO 8601 Date (yyyy-MM-dd)
 * e.g. 2017-12-29
 */
export type DateString = string;

/**
 * String denoting a time in the form HH:mm (HH = hours, mm = minutes), e.g. 12:00 or 22:30.
 * The seconds are implicitly assumed to be 00 and must not be part of the actual string.
 */
export type TimeString = string;

export function getDateYmd(datetime: DateTimeString): DateString {
    return datetime.substr(0, 10)
}

export function getTimeString(datetime: DateTimeString): TimeString {
    return datetime.substr(11, 2) + ":00"
}

export function getDateAndHour(datetime: DateTimeString): DateTimeString {
    return datetime.substr(0, 13)
}

export function getHour(datetime: DateTimeString): number {
    return parseInt(datetime.substr(11, 2), 10)
}

/**
 * Gets the timezone offset string, e.g. +02:00 (UTC+2) or -06:00 (UTC-6).
 * @param datetime
 * @returns {string}
 */
export function getTimezoneOffsetString(datetime: DateTimeString): string {
    return datetime.substr(19)
}

export function twoDigits(num: number): string {
    if (num < 10) return "0" + num
    else return num + ""
}

/**
 * Formats the JavaScript Date as a DateTimeString
 * @param date JavaScript Date instance
 */
export function formatDateTime(date: Date): DateTimeString {
    const yyyy = date.getFullYear()
    const MM = twoDigits(date.getMonth() + 1)
    const dd = twoDigits(date.getDate())

    const HH = twoDigits(date.getHours())
    const mm = twoDigits(date.getMinutes())
    const ss = twoDigits(date.getSeconds())

    const tz = -date.getTimezoneOffset()
    const tzHH = twoDigits(Math.floor(tz / 60))
    const tzmm = twoDigits(tz - Math.floor(tz / 60) * 60)
    const sign = tz < 0 ? "-" : "+"

    return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}${sign}${tzHH}:${tzmm}`
}

/**
 * Formats the JavaScript Date as a DateString
 * @param date JavaScript date instance
 */
export function formatDate(date: Date): DateString {
    const yyyy = date.getFullYear()
    const MM = twoDigits(date.getMonth() + 1)
    const dd = twoDigits(date.getDate())

    return `${yyyy}-${MM}-${dd}`
}

export function now(): Date {
    return new Date()
}

export function addDays(date: Date, days: number) {
    const result = new Date()

    // TODO: Fix this code (isn't technically correct, ignores leap time units)
    result.setTime(date.getTime() + days * 1000 * 3600 * 24)

    return result
}

export function addHours(date: Date, hours: number) {
    const result = new Date()
    result.setTime(date.getTime() + hours * 1000 * 3600)
    return result
}

/**
 * Groups items by date (yyyy-MM-dd)
 * @param items flat list of items to group
 * @param getDate get the date to group by
 * @returns mapping of dates (yyyy-MM-dd) to items
 */
export function groupByDay<T>(items: T[], getDate: (item: T) => DateTimeString): { [date: string]: T[] } {
    const result: { [date: string]: T[] } = {}

    for (let claim of items) {
        const date = getDateYmd(getDate(claim))

        if (result[date]) {
            result[date].push(claim)
        } else {
            result[date] = [claim]
        }
    }

    return result
}

export function dateStringToDate(dateString: DateString): Date {
    return new Date(Date.parse(dateString))
}

export function dateToHumanReadable(date: DateString): string {
    const actualDate = dateStringToDate(date)
    const today = formatDate(now())
    const tomorrow = formatDate(addDays(now(), 1))

    if (date === today) {
        return "Today"
    } else if (date === tomorrow) {
        return "Tomorrow"
    } else if (actualDate.getTime() - now().getTime() < 1000 * 3600 * 24 * 7) {
        const weekday = dateStringToDate(date).getDay()

        return {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        }[weekday]
    } else {
        return date
    }
}

export function getHours(date: DateString): number[] {
    const isToday = (date === formatDate(now()))
    const hours = isToday ? range(now().getHours(), 24) : range(0, 24)

    return hours
}

export const TIMEZONE_OFFSET_STRING = getTimezoneOffsetString(formatDateTime(now()))

export function makeDateTimeString(date: DateString, time: TimeString): DateTimeString {
    return date + "T" + time + ":00" + TIMEZONE_OFFSET_STRING
}