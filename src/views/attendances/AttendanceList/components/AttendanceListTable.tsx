import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useAttendanceList from '../hooks/useAttendanceList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Attendance } from '../types'
import type { TableQueries } from '@/@types/common'

const ActionColumn = ({ onEdit }: { onEdit: () => void }) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
        </div>
    )
}

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

    const handleEdit = (attendance: Attendance) => {
        navigate(`/attendance-edit/${attendance._id}`)
    }

    const columns: ColumnDef<Attendance>[] = useMemo(
        () => [
            {
                header: 'Date',
                accessorKey: 'date',
            },
            {
                header: 'Employee',
                accessorKey: 'employeeData.full_name',
            },
            {
                header: 'Time In',
                accessorKey: 'time_in',
            },
            {
                header: 'Time Out',
                accessorKey: 'time_out',
            },
            {
                header: 'Total Hours',
                accessorKey: 'total_hours',
            },
            {
                header: 'Status (In/Out)',
                id: 'status',
                cell: (props) => (
                    <div>
                        {props.row.original.status_timein} /{' '}
                        {props.row.original.status_timeout}
                    </div>
                ),
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                    />
                ),
            },
        ],
        [],
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
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default AttendanceListTable
