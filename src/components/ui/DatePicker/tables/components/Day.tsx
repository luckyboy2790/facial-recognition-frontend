import classNames from 'classnames'
import type { ComponentPropsWithRef, ReactNode, MouseEvent, Ref } from 'react'
import type { CommonProps } from '../../../@types/common'

export interface DayProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'button'>, 'value' | 'onMouseEnter'> {
    value: Date
    selected: boolean
    weekend: boolean
    outOfMonth: boolean
    onMouseEnter: (date: Date, event: MouseEvent<HTMLButtonElement>) => void
    hasValue: boolean
    inRange: boolean
    firstInRange: boolean
    lastInRange: boolean
    isToday: boolean
    fullWidth: boolean
    firstInMonth: boolean
    focusable: boolean
    hideOutOfMonthDates?: boolean
    ref?: Ref<HTMLButtonElement>
    renderDay?: (date: Date) => ReactNode
    disabled: boolean
}

function getDayTabIndex({
    focusable,
    hasValue,
    selected,
    firstInMonth,
}: {
    focusable: boolean
    hasValue: boolean
    selected: boolean
    firstInMonth: boolean
}) {
    if (!focusable) {
        return -1
    }

    if (hasValue) {
        return selected ? 0 : -1
    }

    return firstInMonth ? 0 : -1
}

const Day = (props: DayProps) => {
    const {
        className,
        value,
        selected,
        weekend,
        outOfMonth,
        onMouseEnter,
        hasValue,
        firstInRange,
        lastInRange,
        inRange,
        isToday,
        firstInMonth,
        focusable,
        hideOutOfMonthDates,
        ref,
        renderDay,
        disabled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fullWidth,
        ...others
    } = props

    return (
        <button
            {...others}
            ref={ref}
            type="button"
            disabled={disabled}
            tabIndex={getDayTabIndex({
                focusable,
                hasValue,
                selected,
                firstInMonth,
            })}
            className={classNames(
                'date-picker-cell-content',
                disabled && 'date-picker-cell-disabled',
                isToday && `ring-1 ring-inset ring-primary`,
                weekend && !disabled && 'date-picker-cell-weekend',
                outOfMonth && !disabled && 'date-picker-other-month',
                outOfMonth && hideOutOfMonthDates && 'd-none',
                !outOfMonth &&
                    !disabled &&
                    !selected &&
                    'date-picker-cell-current-month',
                !disabled &&
                    !selected &&
                    !inRange &&
                    'date-picker-cell-hoverable',
                selected &&
                    !disabled &&
                    'date-picker-cell-selected bg-primary text-neutral',
                inRange &&
                    !disabled &&
                    !firstInRange &&
                    !lastInRange &&
                    !selected &&
                    'bg-primary-subtle',
                !inRange && !firstInRange && !lastInRange && 'rounded-full',
                inRange && isToday && 'date-picker-cell-inrange-today',
                firstInRange && !disabled && 'date-picker-cell-selected-start',
                lastInRange && !disabled && 'date-picker-cell-selected-end',
                className,
            )}
            onMouseEnter={(event) => onMouseEnter(value, event)}
        >
            {typeof renderDay === 'function'
                ? renderDay(value)
                : value?.getDate()}
        </button>
    )
}

export default Day
