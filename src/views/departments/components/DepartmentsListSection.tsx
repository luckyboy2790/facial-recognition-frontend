import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import useDepartmentList from '../hooks/useDepartmentsList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Department } from '../types'
import type { TableQueries } from '@/@types/common'

const DepartmentListTable = () => {
    const {
        departmentList,
        departmentListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllDepartment,
        setSelectedDepartment,
        selectedDepartment,
    } = useDepartmentList()

    const columns: ColumnDef<Department>[] = useMemo(
        () => [
            {
                header: 'Department',
                accessorKey: 'department_name',
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedDepartment.length > 0) {
            setSelectAllDepartment([])
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

    const handleRowSelect = (checked: boolean, row: Department) => {
        setSelectedDepartment(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Department>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllDepartment(originalRows)
        } else {
            setSelectAllDepartment([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={departmentList}
            noData={!isLoading && departmentList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: departmentListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedDepartment.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default DepartmentListTable
