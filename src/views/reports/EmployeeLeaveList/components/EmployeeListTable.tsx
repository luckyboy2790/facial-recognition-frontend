import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import useLeaveList from '../hooks/useEmployeeList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Leave } from '../types'
import type { TableQueries } from '@/@types/common'
import ReportDataTable from '@/components/shared/ReportDataTable'

const statusColor: Record<string, string> = {
    Approved:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Declined: 'bg-red-500 dark:bg-red-500 text-black dark:text-black',
    Pending: 'bg-red-300 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const LeaveListTable = () => {
    const {
        LeaveList,
        LeaveListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllLeave,
        selectedLeave,
    } = useLeaveList()

    const columns: ColumnDef<Leave>[] = useMemo(
        () => [
            {
                header: 'Employee Name',
                id: 'employeeName',
                cell: (props) => (
                    <span>{props.row.original.employeeData.full_name}</span>
                ),
            },
            {
                header: 'Type',
                id: 'leaveType',
                cell: (props) => (
                    <span>{props.row.original.leaveTypeData.leave_name}</span>
                ),
            },
            {
                header: 'Leave From',
                id: 'leaveFrom',
                cell: (props) => <span>{props.row.original.leaveFrom}</span>,
            },
            {
                header: 'Leave To',
                id: 'leaveTo',
                cell: (props) => <span>{props.row.original.leaveTo}</span>,
            },
            {
                header: 'Reason',
                id: 'reason',
                cell: (props) => <span>{props.row.original.reason}</span>,
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
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedLeave.length > 0) {
            setSelectAllLeave([])
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
            data={LeaveList}
            noData={!isLoading && LeaveList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: LeaveListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedLeave.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default LeaveListTable
