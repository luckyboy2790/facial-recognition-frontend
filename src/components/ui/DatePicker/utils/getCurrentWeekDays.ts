import { getStartOfWeek } from './getStartOfWeek'
import { getEndOfWeek } from './getEndOfWeek'
import type { FirstDayOfWeek } from '../../@types/date'

export function getCurrentWeekDays(
    month: Date,
    firstDayOfWeek: FirstDayOfWeek = 'monday',
): Date[] {
    const currentMonth = month.getMonth()
    const startOfMonth = new Date(month.getFullYear(), currentMonth, 1)
    const today = new Date()
    const isCurrentMonth =
        today.getMonth() === currentMonth &&
        today.getFullYear() === month.getFullYear()

    let date: Date
    if (isCurrentMonth) {
        date = getStartOfWeek(today, firstDayOfWeek)
    } else {
        date = getStartOfWeek(startOfMonth, firstDayOfWeek)
    }

    const endDate = getEndOfWeek(date, firstDayOfWeek)
    const days: Date[] = []

    while (date <= endDate) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }

    return days
}
