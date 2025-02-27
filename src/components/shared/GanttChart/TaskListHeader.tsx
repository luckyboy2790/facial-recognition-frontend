import { ReactNode } from 'react'

export type ExtraHeader = string | ReactNode

type TaskListHeaderProps = {
    headerHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
    extraHeaders?: ExtraHeader[]
}

const TaskListHeader = ({
    headerHeight,
    rowWidth,
    extraHeaders = [],
}: TaskListHeaderProps) => {
    return (
        <div className="table">
            <div
                className="table-row list-none bg-gray-100/50 bg:fill-gray-700/40"
                style={{
                    height: headerHeight,
                }}
            >
                <div
                    className="table-cell align-middle px-3 "
                    style={{
                        minWidth: rowWidth,
                    }}
                >
                    &nbsp;Name
                </div>
                <div
                    className="border-r border-gray-200 dark:border-gray-700 -ml-1"
                    style={{
                        height: headerHeight,
                    }}
                />
            </div>
            {extraHeaders.map((headers, index) => (
                <div
                    key={`${headers}-${index}`}
                    className="table-row list-none bg-gray-100/50 bg:fill-gray-700/40"
                    style={{
                        height: headerHeight,
                    }}
                >
                    <div
                        className="table-cell align-middle px-3"
                        style={{
                            minWidth: rowWidth,
                        }}
                    >
                        &nbsp;{headers}
                    </div>
                    <div
                        className="border-r border-gray-200 dark:border-gray-700 -ml-1"
                        style={{
                            height: headerHeight,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default TaskListHeader
