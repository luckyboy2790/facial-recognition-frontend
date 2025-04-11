import useSWR from 'swr'
import { useLeaveListStore } from '../store/LeaveListStore'
import type { GetLeavesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiDeleteLeaves, apiPersonalLeaveList } from '@/services/LeaveService'
import { User } from '@/@types/auth'
import { useNavigate } from 'react-router-dom'
import { permissionChecker } from '@/services/PermissionChecker'

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

    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/personal/leave', { ...tableData }],
        ([_, params]) =>
            apiPersonalLeaveList<GetLeavesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteLeaves = async (leaveIds: string[], user: User) => {
        if (
            permissionChecker(user, 'leave', 'delete') === false &&
            user.account_type === 'Employee'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteLeaves<string[], LeaveData>({
                leaveIds,
            })
            mutate()
            setSelectAllLeave([])
        }
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
