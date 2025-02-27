import Progress from '@/components/ui/Progress'
import { TbClock } from 'react-icons/tb'
import dayjs from 'dayjs'
import type { Task } from 'gantt-task-react'

type TooltipContentProps = {
    task: Task
}

const progressBarStatusClass = (progression: number) => {
    if (progression > 70) {
        return 'bg-success'
    }

    if (progression < 40) {
        return 'bg-error'
    }

    return
}

const TooltipContent = (props: TooltipContentProps) => {
    const { task } = props

    return (
        <div className="p-3 rounded-lg shadow bg-gray-800 dark:bg-black  flex justify-between items-center min-w-[200px] z-10">
            <div className="flex flex-col w-full">
                <div className="text-white font-bold mb-1">{task.name}</div>
                <div className="flex items-center gap-1 text-gray-300">
                    <TbClock className="text-lg" />
                    <span>
                        {dayjs(task.start).format('DD')} ~{' '}
                        {dayjs(task.end).format('DD MMM')}
                    </span>
                </div>
                <div>
                    {!!task.progress && (
                        <Progress
                            customColorClass={progressBarStatusClass(
                                task.progress,
                            )}
                            className="text-white"
                            percent={task.progress}
                            trailClass="bg-gray-500"
                            customInfo={
                                <div className="text-white font-bold">
                                    {task.progress}%
                                </div>
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TooltipContent
