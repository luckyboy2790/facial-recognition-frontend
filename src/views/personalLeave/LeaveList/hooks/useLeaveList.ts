import useSWR from 'swr'
import { useLeaveListStore } from '../store/LeaveListStore'
import type { GetLeavesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiLeaveList, apiDeleteLeaves } from '@/services/LeaveService'

type LeaveData = {
    leaveIds: string[]
}

export default function useLeaveList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
        setFilterData,
    } = useLeaveListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/personal/leave', { ...tableData }],
        ([_, params]) =>
            apiLeaveList<GetLeavesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteLeaves = async (leaveIds: string[]) => {
        await apiDeleteLeaves<string[], LeaveData>({
            leaveIds,
        })
        mutate()
        setSelectAllLeave([])
    }

    const leaveList = data?.list || []

    const leaveListTotal = data?.total || 0

    return {
        leaveList,
        leaveListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        deleteLeaves,
        mutate,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
        setFilterData,
    }
}
