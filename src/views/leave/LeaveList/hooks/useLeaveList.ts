import useSWR from 'swr'
import { useLeaveListStore } from '../store/leaveListStore'
import type { GetLeavesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiDeleteLeaves, apiLeaveList } from '@/services/LeaveService'
import { User } from '@/@types/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { useNavigate } from 'react-router-dom'

type LeaveData = {
    leaveIds: string[]
}

export default function useLeaveList() {
    const {
        tableData,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
    } = useLeaveListStore((state) => state)

    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/leaves', { ...tableData }],
        ([_, params]) =>
            apiLeaveList<GetLeavesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteLeave = async (leaveIds: string[], user: User) => {
        if (
            permissionChecker(user, 'leave', 'delete') === false &&
            user.account_type === 'Admin'
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
        mutate,
        deleteLeave,
        setTableData,
        selectedLeave,
        setSelectedLeave,
        setSelectAllLeave,
    }
}
