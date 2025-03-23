import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import useCustomerList from '../hooks/useEmployeeList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { User } from '../types'
import type { TableQueries } from '@/@types/common'
import ReportDataTable from '@/components/shared/ReportDataTable'

const statusColor: Record<string, string> = {
    Enabled:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Disabled: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const CustomerListTable = () => {
    const {
        customerList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        selectedCustomer,
    } = useCustomerList()

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'Employee Name',
                id: 'employeeName',
                cell: (props) => (
                    <span>{props.row.original.employeeData.full_name}</span>
                ),
            },
            {
                header: 'Email',
                id: 'email',
                cell: (props) => <span>{props.row.original.email}</span>,
            },
            {
                header: 'Account Type',
                id: 'accountType',
                cell: (props) => <span>{props.row.original.account_type}</span>,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
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
            data={customerList}
            noData={!isLoading && customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: customerListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default CustomerListTable
