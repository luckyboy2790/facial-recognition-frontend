import { apiGetCustomersList } from '@/services/employeeService'
import useSWR from 'swr'
import { useCustomerListStore } from '../store/employeeListStore'
import type { GetCustomersListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

export default function useCustomerList() {
    const {
        tableData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
    } = useCustomerListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/customers', { ...tableData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCustomersList<GetCustomersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    // const customerList = data?.list || []

    // const customerListTotal = data?.total || 0

    const customerList: any[] = []

    const customerListTotal: any = 0

    return {
        customerList,
        customerListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
    }
}
