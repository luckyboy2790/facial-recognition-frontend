import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useLeaveList from '../hooks/useLeaveList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Leave } from '../types'
import type { TableQueries } from '@/@types/common'

const statusColor: Record<string, string> = {
    Approved:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Declined: 'bg-red-500 dark:bg-red-500 text-black dark:text-black',
    Pending: 'bg-red-300 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
}) => {
    return (
        <div className="flex gap-3 items-center">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const LeaveListTable = () => {
    const navigate = useNavigate()

    const {
        leaveList,
        leaveListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllLeave,
        setSelectedLeave,
        selectedLeave,
    } = useLeaveList()

    const handleEdit = (leave: Leave) => {
        navigate(`/leave-edit/${leave._id}`)
    }

    const handleViewDetails = (leave: Leave) => {
        navigate(`/employee-details/${leave._id}`)
    }

    const columns: ColumnDef<Leave>[] = useMemo(
        () => [
            {
                header: 'Leave Type',
                id: 'leaveTypeData.leave_name',
                cell: (props) => (
                    <span>
                        {props.row.original.leaveTypeData?.leave_name || ''}
                    </span>
                ),
            },
            {
                header: 'Leave From',
                accessorKey: 'leaveFrom',
            },
            {
                header: 'Leave To',
                accessorKey: 'leaveTo',
            },
            {
                header: 'Reason',
                accessorKey: 'reason',
            },
            {
                header: 'Return Date',
                accessorKey: 'leaveReturn',
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
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
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

    const handleRowSelect = (checked: boolean, row: Leave) => {
        setSelectedLeave(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Leave>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLeave(originalRows)
        } else {
            setSelectAllLeave([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={leaveList}
            noData={!isLoading && leaveList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: leaveListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedLeave.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default LeaveListTable
