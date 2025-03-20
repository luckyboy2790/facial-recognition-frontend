import useSWR from 'swr'
import { useLeaveListStore } from '../store/leaveListStore'
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
        ['/api/leaves', { ...tableData }],
        ([_, params]) =>
            apiLeaveList<GetLeavesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const leaveList = data?.list || []

    const leaveListTotal = data?.total || 0

    return {
        leaveList,
        leaveListTotal,
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
