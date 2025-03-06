import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import useCompanyList from '../hooks/useCompanyList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Company } from '../types'
import type { TableQueries } from '@/@types/common'

const CompanyListTable = () => {
    const {
        companyList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCompany,
        setSelectedCompany,
        selectedCompany,
    } = useCompanyList()

    const columns: ColumnDef<Company>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'company_name',
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCompany.length > 0) {
            setSelectAllCompany([])
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

    const handleRowSelect = (checked: boolean, row: Company) => {
        setSelectedCompany(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Company>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCompany(originalRows)
        } else {
            setSelectAllCompany([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={companyList}
            noData={!isLoading && companyList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: customerListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCompany.some((selected) => selected._id === row._id)
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
