import classNames from '@/utils/classNames'
import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
import type { ReactNode, Ref } from 'react'
import utc from 'dayjs/plugin/utc'
import { useAuth } from '@/auth'
dayjs.extend(utc)

type TaskItemProps = Partial<{
    progress: string
    name: string
    checked: boolean
    dueDate: string | null
    type: string
    showDragger: boolean
    dragger: ReactNode
    showAssignee: boolean
    position: string
    startDate: string | null
    itemType: string | null
    recentAbsenceDate: string | null
}> & {
    taskId: string
    ref?: Ref<HTMLTableRowElement>
}

const { Td, Tr } = Table

const TaskItem = (props: TaskItemProps) => {
    const {
        taskId,
        progress,
        checked,
        name,
        position,
        startDate,
        recentAbsenceDate,
        dueDate,
        dragger,
        showDragger = true,
        showAssignee = true,
        ref,
        type,
        itemType,
        ...rest
    } = props

    const { setting } = useAuth()

    const formatTime = (time: string | undefined, formatType: string) => {
        if (!time) return ''

        const trimmedTime = time.trim()

        let parsedTime: Date | null = null

        if (
            trimmedTime.toLowerCase().includes('am') ||
            trimmedTime.toLowerCase().includes('pm')
        ) {
            const [timePart, period] = trimmedTime.split(' ')
            const [hours, minutes, seconds] = timePart.split(':')
            const formattedTimeString = `01/01/2000 ${hours}:${minutes}:${seconds} ${period}`

            parsedTime = new Date(formattedTimeString)
        } else {
            parsedTime = new Date(`01/01/2000 ${trimmedTime}`)
        }

        if (isNaN(parsedTime.getTime())) {
            return 'No registrado'
        }

        if (formatType === '1') {
            return new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            }).format(parsedTime)
        } else if (formatType === '2') {
            return new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
            }).format(parsedTime)
        }

        return trimmedTime
    }

    return (
        <Tr ref={ref} {...rest}>
            {showDragger && <Td className="w-[40px] text-lg">{dragger}</Td>}
            <Td className={classNames('w-[500px]')}>
                <span className={classNames('heading-text font-bold')}>
                    {name}
                </span>
            </Td>

            {/* --------------------------------------------- */}

            <Td
                className={classNames(
                    'w-[500px]',
                    type !== 'Newest Employees' && 'hidden',
                )}
            >
                <span className={classNames('heading-text font-semibold')}>
                    {position}
                </span>
            </Td>
            <Td
                className={classNames(
                    'w-[500px]',
                    type !== 'Newest Employees' && 'hidden',
                )}
            >
                <span className={classNames('heading-text font-semibold')}>
                    {startDate ? dayjs(startDate).format('MMMM DD, YYYY') : '-'}
                </span>
            </Td>

            {/* --------------------------------------------- */}

            <Td
                className={classNames(
                    'w-[500px]',
                    type !== 'Recent Attendances' && 'hidden',
                )}
            >
                <span className={classNames('heading-text font-semibold')}>
                    {itemType}
                </span>
            </Td>
            <Td
                className={classNames(
                    'w-[500px]',
                    type !== 'Recent Attendances' && 'hidden',
                )}
            >
                <span className={classNames('heading-text font-semibold')}>
                    {recentAbsenceDate
                        ? formatTime(recentAbsenceDate, setting.timeFormat)
                        : '-'}
                </span>
            </Td>

            {/* --------------------------------------------- */}

            <Td
                className={classNames(
                    'w-[500px]',
                    type !== 'Recent Leaves of Absence' && 'hidden',
                )}
            >
                <span className="heading-text font-semibold">
                    {dueDate ? dayjs(dueDate).format('MMMM DD, YYYY') : '-'}
                </span>
            </Td>
        </Tr>
    )
}

export default TaskItem
