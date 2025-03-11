import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useScheduleList from '../hooks/useScheduleList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import { IoArchiveOutline } from 'react-icons/io5'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Schedule } from '../types'
import type { TableQueries } from '@/@types/common'
import { Notification, toast } from '@/components/ui'

const statusColor: Record<string, string> = {
    Previous:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Present: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
    row,
}: {
    onEdit: () => void
    onViewDetail: () => void
    row: Schedule
}) => {
    return (
        <div className="flex items-center gap-3">
            {row.status === 'Present' && (
                <>
                    <Tooltip title="Edit">
                        <div
                            className={`text-xl cursor-pointer select-none font-semibold`}
                            role="button"
                            onClick={onEdit}
                        >
                            <TbPencil />
                        </div>
                    </Tooltip>
                    <Tooltip title="Archive">
                        <div
                            className={`text-xl cursor-pointer select-none font-semibold`}
                            role="button"
                            onClick={onViewDetail}
                        >
                            <IoArchiveOutline />
                        </div>
                    </Tooltip>
                </>
            )}
        </div>
    )
}

const ScheduleListTable = () => {
    const navigate = useNavigate()

    const {
        scheduleList,
        scheduleListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllSchedule,
        setSelectedSchedule,
        selectedSchedule,
    } = useScheduleList()

    console.log(scheduleList)

    const handleEdit = (schedule: Schedule) => {
        navigate(`/schedule-edit/${schedule._id}`)
    }

    const handleViewDetails = (
        type: 'success' | 'warning' | 'danger' | 'info',
    ) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                User archived successfully
            </Notification>,
        )
    }

    const columns: ColumnDef<Schedule>[] = useMemo(
        () => [
            {
                header: 'Employee',
                accessorKey: 'employee_name',
            },
            {
                header: 'Time (Start-Off)',
                accessorKey: 'formattedTime',
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
                header: 'From (Date)',
                accessorKey: 'formattedFromDate',
            },
            {
                header: 'To (Date)',
                accessorKey: 'formattedToDate',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() => handleViewDetails('success')}
                        row={props.row.original}
                    />
                ),
            },
        ],
        [],
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

    const handleRowSelect = (checked: boolean, row: Schedule) => {
        setSelectedSchedule(checked, row)
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
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ScheduleListTable
