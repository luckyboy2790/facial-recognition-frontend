import {
    apiDeleteEmployees,
    apiGetCustomersList,
} from '@/services/employeeService'
import useSWR from 'swr'
import { useCustomerListStore } from '../store/employeeListStore'
import type { GetCustomersListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { permissionChecker } from '@/services/PermissionChecker'
import { useNavigate } from 'react-router-dom'
import { User } from '@/@types/auth'

type LeaveTypeData = {
    employeeIds: string[]
}

export default function useCustomerList() {
    const {
        tableData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
    } = useCustomerListStore((state) => state)

    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/employee', { ...tableData }],
        ([_, params]) =>
            apiGetCustomersList<GetCustomersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteEmployees = async (employeeIds: string[], user: User) => {
        if (
            permissionChecker(user, 'employee', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteEmployees<string[], LeaveTypeData>({
                employeeIds,
            })
            mutate()
            setSelectAllCustomer([])
        }
    }

    const customerList = data?.list || []

    const customerListTotal = data?.total || 0

    return {
        customerList,
        customerListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedCustomer,
        deleteEmployees,
        setSelectedCustomer,
        setSelectAllCustomer,
    }
}
