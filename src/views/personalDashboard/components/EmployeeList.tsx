import Table from '@/components/ui/Table'
import TaskItem from '@/components/view/PersonalDashboardTable'
import { labelClass } from '../utils'
import reoderArray from '@/utils/reoderArray'
import reorderDragable from '@/utils/reorderDragable'
import { useTasksStore } from '../store/employeesStore'
import { Droppable, DragDropContext, Draggable } from '@hello-pangea/dnd'
import { MdDragIndicator } from 'react-icons/md'
import type { DropResult } from '@hello-pangea/dnd'
import type { Task } from '../types'
import useTranslation from '@/utils/hooks/useTranslation'

const { TBody } = Table

const EmployeeList = () => {
    const { updateOrdered, updateGroups, ordered, groups } = useTasksStore()

    const { t } = useTranslation()

    const onDragEnd = (result: DropResult) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...ordered]
                shallow.splice(result.source.index, 1)
                updateOrdered(shallow)
                return
            }

            const column = groups[result.source.droppableId]
            const withQuoteRemoved = [...column]
            withQuoteRemoved.splice(result.source.index, 1)
            const newColumns = {
                ...groups,
                [result.source.droppableId]: withQuoteRemoved,
            }
            updateGroups(newColumns)
            return
        }

        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        if (result.type === 'COLUMN') {
            const newOrdered = reoderArray(
                ordered,
                source.index,
                destination.index,
            )
            updateOrdered(newOrdered)
            return
        }

        const data = reorderDragable<Record<string, Task[]>>({
            quoteMap: groups,
            source,
            destination,
        })

        updateGroups(data.quoteMap)
    }

    const changeTimeFormat = (time: string): string => {
        const currentDate = new Date()

        const currentYear = currentDate.getFullYear()

        const date = new Date(`${currentYear}-01-01T${time}`)

        if (isNaN(date.getTime())) {
            return 'Invalid Time'
        }

        let hours = date.getUTCHours()
        let minutes = date.getUTCMinutes()

        const period = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`

        return `${hours}:${minutesString} ${period}`
    }

    const changeDateFormat = (fromDate: string, toDate: string) => {
        const from = new Date(fromDate)
        const to = new Date(toDate)

        const fromMonthDay = from.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
        })
        const toMonthDay = to.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
        })

        const year = from.getFullYear()

        return `${fromMonthDay} - ${toMonthDay}, ${year}`
    }

    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="vertical"
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className="flex flex-col gap-10">
                                {ordered.map((key, index) => (
                                    <Draggable
                                        key={key}
                                        draggableId={key}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span
                                                        className="text-lg"
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <MdDragIndicator />
                                                    </span>
                                                    <h4>
                                                        {key ===
                                                        'Recent Attendances'
                                                            ? t(
                                                                  'page.dashboard.recent_leaves',
                                                                  'Recent Attendances',
                                                              )
                                                            : key ===
                                                                'Previous Schedules'
                                                              ? t(
                                                                    'page.dashboard.previous_attendances',
                                                                    'Previous Schedules',
                                                                )
                                                              : t(
                                                                    'page.dashboard.recent_leaves',
                                                                    'Recent Leaves of Absence',
                                                                )}
                                                    </h4>
                                                </div>
                                                <Table className="lg:overflow-hidden">
                                                    <Droppable
                                                        droppableId={key}
                                                        type="CONTENT"
                                                    >
                                                        {(dropProvided) => (
                                                            <TBody
                                                                ref={
                                                                    dropProvided.innerRef
                                                                }
                                                                {...dropProvided.droppableProps}
                                                            >
                                                                {groups[
                                                                    key
                                                                ]?.map(
                                                                    (
                                                                        item,
                                                                        index,
                                                                    ) => (
                                                                        <Draggable
                                                                            key={
                                                                                item._id +
                                                                                index
                                                                            }
                                                                            draggableId={
                                                                                item._id +
                                                                                index
                                                                            }
                                                                            index={
                                                                                index
                                                                            }
                                                                        >
                                                                            {(
                                                                                provided,
                                                                            ) => (
                                                                                <TaskItem
                                                                                    ref={
                                                                                        provided.innerRef
                                                                                    }
                                                                                    type={
                                                                                        key
                                                                                    }
                                                                                    taskId={
                                                                                        item._id
                                                                                    }
                                                                                    checked={
                                                                                        item.checked
                                                                                    }
                                                                                    name={
                                                                                        item.full_name
                                                                                            ? item.full_name
                                                                                            : item
                                                                                                  .employeeData
                                                                                                  ?.full_name
                                                                                    }
                                                                                    time={`${changeTimeFormat(item.start_time)} - ${changeTimeFormat(item.off_time)}`}
                                                                                    dueDate={
                                                                                        item.leaveReturn
                                                                                    }
                                                                                    position={
                                                                                        item
                                                                                            .job_title
                                                                                            ?.job_title
                                                                                    }
                                                                                    startDate={
                                                                                        item?.date
                                                                                    }
                                                                                    recentAbsenceDate={
                                                                                        item.time
                                                                                    }
                                                                                    dragger={
                                                                                        <span
                                                                                            {...provided.dragHandleProps}
                                                                                        >
                                                                                            <MdDragIndicator />
                                                                                        </span>
                                                                                    }
                                                                                    scheduleDate={changeDateFormat(
                                                                                        item.from,
                                                                                        item.to,
                                                                                    )}
                                                                                    description={
                                                                                        item.reason
                                                                                    }
                                                                                    {...provided.draggableProps}
                                                                                />
                                                                            )}
                                                                        </Draggable>
                                                                    ),
                                                                )}
                                                                {
                                                                    dropProvided.placeholder
                                                                }
                                                            </TBody>
                                                        )}
                                                    </Droppable>
                                                </Table>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default EmployeeList
