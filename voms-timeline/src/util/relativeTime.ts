export enum Until {
    'seconds' = 0,
    'minutes' = 1,
    'hours' = 2,
    'days' = 3,
    'weeks' = 4,
    'months' = 5,
    'years' = 6
}

const MIN = 60
const HOUR = MIN * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 31
const YEAR = DAY * 365

export function getRelativeTimeInString(
    target: Date,
    until: Until = Until.years,
    base: Date = new Date()
): string {
    const suffix = target.getTime() < base.getTime() ? '前' : '後'
    const diffSeconds = Math.abs(Math.floor((target.getTime() - base.getTime()) / 1000))

    if (diffSeconds < MIN && until >= Until.seconds) {
        return diffSeconds + '秒' + suffix
    }
    if (diffSeconds < HOUR && until >= Until.minutes) {
        return Math.floor(diffSeconds / MIN) + '分' + suffix
    }
    if (diffSeconds < DAY && until >= Until.hours) {
        return Math.floor(diffSeconds / HOUR) + '時間' + suffix
    }
    if (diffSeconds < WEEK && until >= Until.days) {
        return Math.floor(diffSeconds / DAY) + '日' + suffix
    }
    if (diffSeconds < MONTH && until >= Until.weeks) {
        return Math.floor(diffSeconds / WEEK) + '週間' + suffix
    }
    if (diffSeconds < YEAR && until >= Until.months) {
        return Math.floor(diffSeconds / MONTH) + 'ヶ月' + suffix
    }
    if (until >= Until.years) {
        return Math.floor(diffSeconds / YEAR) + '年' + suffix
    }

    const yearStr = target.getFullYear()
    const monthStr = ('0' + (target.getMonth() + 1)).slice(-2)
    const dayStr = ('0' + target.getDate()).slice(-2)
    const hourStr = ('0' + target.getHours()).slice(-2)
    const minuteStr = ('0' + target.getMinutes()).slice(-2)
    return `${yearStr}/${monthStr}/${dayStr} ${hourStr}:${minuteStr}`
}
