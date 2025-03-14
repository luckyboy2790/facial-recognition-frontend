import { apiGetCustomersList } from '@/services/employeeService'
import useSWR from 'swr'
import { useCustomerListStore } from '../store/employeeListStore'
import type { TableQueries } from '@/@types/common'
import { GetAttendancesListResponse } from '@/views/attendances/AttendanceList/types'
import { apiAttendanceList } from '@/services/AttendanceService'

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
            apiAttendanceList<GetAttendancesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

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
        setSelectedCustomer,
        setSelectAllCustomer,
    }
}
