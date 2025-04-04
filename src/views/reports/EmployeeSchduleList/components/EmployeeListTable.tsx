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
                header: 'Employee Name',
                accessorKey: 'employee_data.full_name',
            },
            {
                header: 'Start Time',
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
                header: 'Off Time',
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
                header: 'Start Date',
                accessorKey: 'formattedFromDate',
            },
            {
                header: 'End Date',
                accessorKey: 'formattedToDate',
            },
            {
                header: 'Hours',
                accessorKey: 'total_hours',
            },
            {
                header: 'Rest Days',
                accessorKey: 'rest_days',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">
                                    {row.status === 'Present'
                                        ? 'Present Schedule'
                                        : 'Past Schedule'}
                                </span>
                            </Tag>
                        </div>
                    )
                },
            },
        ],
        [],
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
