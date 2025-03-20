import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import useLeaveTypeList from '../hooks/useLeaveTypesList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { LeaveType } from '../types'
import type { TableQueries } from '@/@types/common'

const CompanyListTable = () => {
    const {
        leaveTypeList,
        leaveTypeListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllLeaveType,
        setSelectedLeaveType,
        selectedLeaveType,
    } = useLeaveTypeList()

    const columns: ColumnDef<LeaveType>[] = useMemo(
        () => [
            {
                header: 'Description',
                accessorKey: 'leave_name',
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedLeaveType.length > 0) {
            setSelectAllLeaveType([])
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

    const handleRowSelect = (checked: boolean, row: LeaveType) => {
        setSelectedLeaveType(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<LeaveType>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLeaveType(originalRows)
        } else {
            setSelectAllLeaveType([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={leaveTypeList}
            noData={!isLoading && leaveTypeList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: leaveTypeListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedLeaveType.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CompanyListTable
