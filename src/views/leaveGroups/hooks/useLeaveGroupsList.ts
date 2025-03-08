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

    const {
        data: leaveTypes,
        error: leaveTypesError,
        isLoading: isLeaveTypesLoading,
        mutate: mutateLeaveType,
    } = useSWR(
        ['/api/leaveTypes', { ...tableData }],
        ([_, params]) =>
            apiTotalLeaveTypesList<GetLeaveTypesListResponse, TableQueries>(),
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

    const deleteLeaveGroups = async (leaveTypeIds: string[]) => {
        await apiDeleteLeaveGroups<string[], LeaveTypeData>({
            leaveTypeIds,
        })
        mutateLeaveGroup()
        setSelectAllLeaveGroup([])
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
