import classNames from '@/utils/classNames'
import Table from '@/components/ui/Table'
import dayjs from 'dayjs'
import type { ReactNode, Ref } from 'react'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

type TaskItemProps = Partial<{
    progress: string
    name: string
    checked: boolean
    dueDate: number
    type: string
    showDragger: boolean
    dragger: ReactNode
    showAssignee: boolean
    position: string
    startDate: number
    itemType: string
    recentAbsenceDate: number
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
                    {startDate
                        ? dayjs(recentAbsenceDate)
                              .utcOffset(0)
                              .utc()
                              .format('hh:mm:ss A')
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
                    {dueDate ? dayjs(dueDate).format('MMMM DD') : '-'} 111
                </span>
            </Td>
        </Tr>
    )
}

export default TaskItem
