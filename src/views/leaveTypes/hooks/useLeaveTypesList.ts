import {
    apiDeleteLeaveTypes,
    apiLeaveTypesList,
} from '@/services/leaveTypeService'
import useSWR from 'swr'
import { useLeaveTypeListStore } from '../store/leaveTypesListStore'
import type { GetLeaveTypesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

type LeaveTypeData = {
    leaveTypeIds: string[]
}

export default function useLeaveTypeList() {
    const {
        tableData,
        setTableData,
        selectedLeaveType,
        setSelectedLeaveType,
        setSelectAllLeaveType,
    } = useLeaveTypeListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/leaveTypes', { ...tableData }],
        ([_, params]) =>
            apiLeaveTypesList<GetLeaveTypesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteLeaveTypes = async (leaveTypeIds: string[]) => {
        await apiDeleteLeaveTypes<string[], LeaveTypeData>({
            leaveTypeIds,
        })
        mutate()
        setSelectAllLeaveType([])
    }

    const leaveTypeList = data?.list || []

    const leaveTypeListTotal = data?.total || 0

    return {
        leaveTypeList,
        leaveTypeListTotal,
        error,
        isLoading,
        tableData,
        deleteLeaveTypes,
        mutate,
        setTableData,
        selectedLeaveType,
        setSelectedLeaveType,
        setSelectAllLeaveType,
    }
}
