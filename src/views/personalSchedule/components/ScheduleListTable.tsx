import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/PersonalDataTable'
import useScheduleList from '../hooks/useScheduleList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import { IoArchiveOutline } from 'react-icons/io5'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Schedule } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiArchiveSchedule } from '@/services/ScheduleService'
import { useAuth } from '@/auth'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation'
import useLocale from '@/utils/hooks/useLocale'

const statusColor: Record<string, string> = {
    Previous:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Present: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

type ArchiveResponse = {
    schedule: Schedule
}

const ScheduleListTable = () => {
    const { t } = useTranslation()

    const {
        scheduleList,
        scheduleListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllSchedule,
        selectedSchedule,
        mutate,
    } = useScheduleList()

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

    const { locale } = useLocale()

    function formatDate(dateStr: string, language: string = 'es'): string {
        const date = new Date(dateStr)

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }

        const formatter = new Intl.DateTimeFormat(
            language === 'en' ? 'en-US' : 'es-ES',
            options,
        )
        const formattedDate = formatter.format(date)

        return `${formattedDate}`
    }

    const columns: ColumnDef<Schedule>[] = useMemo(
        () => [
            {
                header: t('page.schedule.employee', 'Employee'),
                accessorKey: 'employee_name',
            },
            {
                header: t('page.schedule.time', 'Time (Start-Off)'),
                accessorKey: 'formattedTime',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original?.start_time,
                            setting.timeFormat,
                        )}
                        {' - '}
                        {formatTime(
                            props.row.original?.off_time,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.schedule.hours', 'Hours'),
                accessorKey: 'total_hours',
            },
            {
                header: t('page.schedule.rest_days', 'Rest Days'),
                accessorKey: 'rest_days',
                cell: (props) => (
                    <div>
                        {props.row.original?.rest_days?.map((item, index) => (
                            <div key={index}>
                                {(() => {
                                    switch (item) {
                                        case 'Monday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.monday',
                                                        'Monday',
                                                    )}
                                                </span>
                                            )
                                        case 'Tuesday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.tuesday',
                                                        'Tuesday',
                                                    )}
                                                </span>
                                            )
                                        case 'Wednesday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.wednesday',
                                                        'Wednesday',
                                                    )}
                                                </span>
                                            )
                                        case 'Thursday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.thursday',
                                                        'Thursday',
                                                    )}
                                                </span>
                                            )
                                        case 'Friday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.friday',
                                                        'Friday',
                                                    )}
                                                </span>
                                            )
                                        case 'Saturday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.saturday',
                                                        'Saturday',
                                                    )}
                                                </span>
                                            )
                                        case 'Sunday':
                                            return (
                                                <span>
                                                    {t(
                                                        'page.schedule.sunday',
                                                        'Sunday',
                                                    )}
                                                </span>
                                            )
                                        default:
                                            return <span>{item}</span>
                                    }
                                })()}
                            </div>
                        ))}
                    </div>
                ),
            },
            {
                header: t('page.schedule.from', 'From (Date)'),
                accessorKey: 'formattedFromDate',
                cell: (props) => (
                    <div>{formatDate(props.row.original?.from, locale)}</div>
                ),
            },
            {
                header: t('page.schedule.to', 'To (Date)'),
                accessorKey: 'formattedToDate',
                cell: (props) => (
                    <div>{formatDate(props.row.original?.to, locale)}</div>
                ),
            },
            {
                header: t('page.schedule.status', 'Status'),
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">
                                    {row.status === 'Present'
                                        ? t('page.schedule.present', 'Present')
                                        : t(
                                              'page.schedule.previous',
                                              'Previous',
                                          )}
                                </span>
                            </Tag>
                        </div>
                    )
                },
            },
        ],
        [t, locale],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedSchedule.length > 0) {
            setSelectAllSchedule([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Schedule>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllSchedule(originalRows)
        } else {
            setSelectAllSchedule([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={scheduleList}
            noData={!isLoading && scheduleList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: scheduleListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedSchedule.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ScheduleListTable
