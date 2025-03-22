import useSWR from 'swr'
import { useLeaveListStore } from '../store/employeeListStore'
import type { GetLeavesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiLeaveList } from '@/services/LeaveService'

export default function useLeaveList() {
    const {
        tableData,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
    } = useLeaveListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/Leaves', { ...tableData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiLeaveList<GetLeavesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const LeaveList = data?.list || []

    const LeaveListTotal = data?.total || 0

    return {
        LeaveList,
        LeaveListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
    }
}
