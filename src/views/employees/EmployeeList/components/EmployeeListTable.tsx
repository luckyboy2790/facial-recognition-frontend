import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useCustomerList from '../hooks/useEmployeeList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye, TbArchiveFilled } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Employee } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiArchiveEmployee } from '@/services/employeeService'

const statusColor: Record<string, string> = {
    Active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Archive: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

type ArchiveResponse = {
    employee: Employee
}

const NameColumn = ({ row }: { row: Employee }) => {
    return (
        <div className="flex items-center">
            <Avatar
                size={40}
                shape="circle"
                src={`http://localhost:5000${row.img}`}
            />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/employee-details/${row._id}`}
            >
                {row.full_name}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
    detail,
    handleArchiveEmployee,
}: {
    onEdit: () => void
    onViewDetail: () => void
    detail: Employee
    handleArchiveEmployee: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Archive">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={handleArchiveEmployee}
                >
                    <TbArchiveFilled />
                </div>
            </Tooltip>
        </div>
    )
}

const CustomerListTable = () => {
    const navigate = useNavigate()

    const {
        customerList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
        mutate,
    } = useCustomerList()

    const handleEdit = (customer: Employee) => {
        navigate(`/employee-edit/${customer._id}`)
    }

    const handleViewDetails = (customer: Employee) => {
        navigate(`/employee-details/${customer._id}`)
    }

    const handleArchiveEmployee = async (employeeId: string) => {
        try {
            console.log(employeeId)
            const employee: ArchiveResponse = await apiArchiveEmployee({
                employeeId,
            })

            if (employee.employee) {
                mutate()
            }
        } catch (error) {
            console.error('Error archiving employee:', error)
        }
    }

    const columns: ColumnDef<Employee>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'full_name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Company',
                accessorKey: 'company.company_name',
            },
            {
                header: 'Department',
                accessorKey: 'department.department_name',
            },
            {
                header: 'Position',
                accessorKey: 'job_title.job_title',
            },
            {
                header: 'Leave Privileges',
                accessorKey: 'leave_group.group_name',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.employee_status]}>
                                <span className="capitalize">
                                    {row.employee_status}
                                </span>
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
                        detail={props.row.original}
                        handleArchiveEmployee={() =>
                            handleArchiveEmployee(props.row.original._id)
                        }
                    />
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

    const handleRowSelect = (checked: boolean, row: Employee) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Employee>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
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
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
