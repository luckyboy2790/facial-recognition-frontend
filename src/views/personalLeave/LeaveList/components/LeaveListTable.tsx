import { useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useLeaveList from '../hooks/useLeaveList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Leave } from '../types'
import type { TableQueries } from '@/@types/common'

const ActionColumn = ({ onEdit }: { onEdit: () => void }) => {
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
        navigate(`/personal/leave-edit/${leave._id}`)
    }

    const columns: ColumnDef<Leave>[] = useMemo(
        () => [
            {
                header: 'Leave Type',
                accessorKey: 'leaveType.leave_name',
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
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <>
                        {props.row.original.status === 'Pending' && (
                            <ActionColumn
                                onEdit={() => handleEdit(props.row.original)}
                            />
                        )}
                    </>
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
