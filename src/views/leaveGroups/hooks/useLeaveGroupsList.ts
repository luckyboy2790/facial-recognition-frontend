import { apiTotalLeaveTypesList } from '@/services/leaveTypeService'
import useSWR from 'swr'
import { useLeaveGroupListStore } from '../store/leaveGroupsListStore'
import type { GetLeaveGroupsListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { GetLeaveTypesListResponse } from '@/views/leaveTypes/types'
import {
    apiDeleteLeaveGroups,
    apiLeaveGroupsList,
} from '@/services/leaveGroupService'
import { User } from '@/@types/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { useNavigate } from 'react-router-dom'

type LeaveTypeData = {
    leaveTypeIds: string[]
}

export default function useLeaveTypeList() {
    const {
        tableData,
        setTableData,
        selectedLeaveGroup,
        setSelectedLeaveGroup,
        setSelectAllLeaveGroup,
    } = useLeaveGroupListStore((state) => state)

    const navigate = useNavigate()

    const {
        data: leaveTypes,
        error: leaveTypesError,
        isLoading: isLeaveTypesLoading,
        mutate: mutateLeaveType,
    } = useSWR(
        ['/api/leaveTypes', { ...tableData }],
        ([_, params]) => apiTotalLeaveTypesList<GetLeaveTypesListResponse>(),
        {
            revalidateOnFocus: false,
        },
    )

    const {
        data: leaveGroupData,
        error: leaveGroupError,
        isLoading: isLeaveGroupLoading,
        mutate: mutateLeaveGroup,
    } = useSWR(
        ['/api/leaveGroups', { ...tableData }],
        ([_, params]) =>
            apiLeaveGroupsList<GetLeaveGroupsListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteLeaveGroups = async (leaveTypeIds: string[], user: User) => {
        if (
            permissionChecker(user, 'leaveGroup', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteLeaveGroups<string[], LeaveTypeData>({
                leaveTypeIds,
            })
            mutateLeaveGroup()
            setSelectAllLeaveGroup([])
        }
    }

    const leaveGroupsList = leaveGroupData?.list || []

    const leaveGroupsListTotal = leaveGroupData?.total || 0

    return {
        leaveTypesList: leaveTypes?.list || [],
        leaveTypesError: leaveTypesError,
        isLeaveTypesLoading,
        mutateLeaveType,
        leaveGroupsList,
        leaveGroupsListTotal,
        leaveGroupError,
        isLeaveGroupLoading,
        tableData,
        deleteLeaveGroups,
        mutateLeaveGroup,
        setTableData,
        selectedLeaveGroup,
        setSelectedLeaveGroup,
        setSelectAllLeaveGroup,
    }
}
