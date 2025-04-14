import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import useCustomerList from '../hooks/useEmployeeList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Employee } from '../types'
import type { TableQueries } from '@/@types/common'
import ReportDataTable from '@/components/shared/ReportDataTable'
import useTranslation from '@/utils/hooks/useTranslation'

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

    const { t } = useTranslation()

    const columns: ColumnDef<Employee>[] = useMemo(
        () => [
            {
                header: t('page.report.employee_name', 'Employee Name'),
                accessorKey: 'full_name',
            },
            {
                header: t('page.employee.age', 'Age'),
                accessorKey: 'age',
            },
            {
                header: t('page.employee.gender', 'Gender'),
                accessorKey: 'gender',
            },
            {
                header: t('page.employee.civil_status', 'Civil Status'),
                accessorKey: 'civil_status',
            },
            {
                header: t('page.report.contact_number', 'Contact Number'),
                id: 'contactNumber',
                cell: (props) => (
                    <div>
                        {props.row.original.dial_code}{' '}
                        {props.row.original.phone_number}
                    </div>
                ),
            },
            {
                header: t('page.employee.email', 'Email'),
                accessorKey: 'email',
            },
            {
                header: t('page.employee.type', 'Type'),
                accessorKey: 'employee_type',
                cell: (props) => (
                    <div>
                        {props.row.original.employee_type === 'Regular'
                            ? t('page.employee.regular', 'Regular')
                            : t('page.employee.trainee', 'Trainee')}
                    </div>
                ),
            },
            {
                header: t('page.employee.status', 'Status'),
                accessorKey: 'employee_status',
                cell: (props) => (
                    <div>
                        {props.row.original.employee_status === 'Active'
                            ? t('page.employee.active', 'Active')
                            : t('page.employee.archived', 'Archived')}
                    </div>
                ),
            },
        ],
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
