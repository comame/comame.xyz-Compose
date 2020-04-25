export type DateString = string

export function asDate(dateString: DateString): Date {
    return new Date(dateString)
}
