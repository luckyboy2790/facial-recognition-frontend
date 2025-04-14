import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import useCustomerList from '../hooks/useEmployeeList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Schedule } from '../types'
import type { TableQueries } from '@/@types/common'
import ReportDataTable from '@/components/shared/ReportDataTable'
import { useAuth } from '@/auth'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation'

const statusColor: Record<string, string> = {
    Present:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Previous: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const CustomerListTable = () => {
    const {
        customerList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        selectedCustomer,
    } = useCustomerList()

    const { t } = useTranslation()

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

    const columns: ColumnDef<Schedule>[] = useMemo(
        () => [
            {
                header: t('page.report.employee_name', 'Employee Name'),
                accessorKey: 'employee_data.full_name',
            },
            {
                header: t('page.schedule.start_time', 'Start Time'),
                accessorKey: 'start_time',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original.start_time,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.schedule.', 'Off Time'),
                accessorKey: 'off_time',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original.off_time,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.start_date', 'Start Date'),
                accessorKey: 'formattedFromDate',
            },
            {
                header: t('page.end_date', 'End Date'),
                accessorKey: 'formattedToDate',
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
                header: t('page.schedule.status', 'Status'),
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">
                                    {row.status === 'Present'
                                        ? `${t('page.schedule.present', 'Present')} ${t('page.dashboard.schedule', 'Schedule')}`
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
        [t],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
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

    return (
        <ReportDataTable
            selectable
            columns={columns}
            data={customerList}
            noData={!isLoading && customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: customerListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default CustomerListTable
