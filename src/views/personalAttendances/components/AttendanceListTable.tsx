import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/PersonalDataTable'
import useAttendanceList from '../hooks/useAttendanceList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Attendance } from '../types'
import type { TableQueries } from '@/@types/common'
import { useAuth } from '@/auth'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation'

const AttendanceListTable = () => {
    const navigate = useNavigate()

    const {
        attendanceList,
        attendanceListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllAttendance,
        setSelectedAttendance,
        selectedAttendance,
    } = useAttendanceList()

    const { setting } = useAuth()

    const { t } = useTranslation()

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

    const columns: ColumnDef<Attendance>[] = useMemo(
        () => [
            {
                header: t('page.attendance.date', 'Date'),
                accessorKey: 'date',
            },
            {
                header: t('page.attendance.employee', 'Employee'),
                accessorKey: 'employeeData.full_name',
            },
            {
                header: t('page.attendance.time_in', 'Time In'),
                accessorKey: 'time_in',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original?.time_in,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.attendance.time_out', 'Time Out'),
                accessorKey: 'time_out',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original?.time_out,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.attendance.break_in', 'Break In'),
                accessorKey: 'break_in',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original?.break_in,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.attendance.break_out', 'Break Out'),
                accessorKey: 'break_out',
                cell: (props) => (
                    <div>
                        {formatTime(
                            props.row.original?.break_out,
                            setting.timeFormat,
                        )}
                    </div>
                ),
            },
            {
                header: t('page.attendance.total_hours', 'Total Hours'),
                accessorKey: 'total_hours',
            },
            {
                header: t('page.attendance.status', 'Status (In/Out)'),
                id: 'status',
                cell: (props) => (
                    <div>
                        {props.row.original?.status_timein === 'Late In'
                            ? t('page.attendance.late_in', 'Late In')
                            : props.row.original?.status_timein === ''
                              ? ''
                              : t('page.attendance.in_time', 'Time In')}
                        /{' '}
                        {props.row.original?.status_timeout === 'Early Out'
                            ? t('page.attendance.early_out', 'Early Out')
                            : props.row.original?.status_timeout === ''
                              ? ''
                              : t('page.attendance.out_time', 'Time Out')}
                    </div>
                ),
            },
        ],
        [t],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedAttendance.length > 0) {
            setSelectAllAttendance([])
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

    const handleRowSelect = (checked: boolean, row: Attendance) => {
        setSelectedAttendance(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Attendance>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllAttendance(originalRows)
        } else {
            setSelectAllAttendance([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={attendanceList}
            noData={!isLoading && attendanceList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: attendanceListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedAttendance.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default AttendanceListTable
