import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import useJobTitlesList from '../hooks/useJobsList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { JobTitle } from '../types'
import type { TableQueries } from '@/@types/common'

const CompanyListTable = () => {
    const {
        jobTitlesList,
        jobTitlesTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllJobTitle,
        setSelectedJobTitle,
        selectedJobTitle,
    } = useJobTitlesList()

    const columns: ColumnDef<JobTitle>[] = useMemo(
        () => [
            {
                header: 'Job title',
                accessorKey: 'job_title',
            },
            {
                header: 'Department Name',
                accessorKey: 'department_name',
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedJobTitle.length > 0) {
            setSelectAllJobTitle([])
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

    const handleRowSelect = (checked: boolean, row: JobTitle) => {
        setSelectedJobTitle(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<JobTitle>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllJobTitle(originalRows)
        } else {
            setSelectAllJobTitle([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={jobTitlesList}
            noData={!isLoading && jobTitlesList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: jobTitlesTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedJobTitle.some((selected) => selected._id === row._id)
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
