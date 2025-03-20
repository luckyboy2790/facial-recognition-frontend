import useSWR from 'swr'
import { useAttendanceListStore } from '../store/AttendanceListStore'
import type { GetAttendancesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import {
    apiDeleteAttendances,
    apiPersonalAttendanceList,
} from '@/services/AttendanceService'

type AttendanceData = {
    attendanceIds: string[]
}

export default function useAttendanceList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedAttendance,
        setSelectedAttendance,
        setSelectAllAttendance,
        setFilterData,
    } = useAttendanceListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/attendance', { ...tableData }],
        ([_, params]) =>
            apiPersonalAttendanceList<GetAttendancesListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteAttendances = async (attendanceIds: string[]) => {
        await apiDeleteAttendances<string[], AttendanceData>({
            attendanceIds,
        })
        mutate()
        setSelectAllAttendance([])
    }

    const attendanceList = data?.list || []

    const attendanceListTotal = data?.total || 0

    return {
        attendanceList,
        attendanceListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        deleteAttendances,
        mutate,
        setTableData,
        selectedAttendance,
        setSelectedAttendance,
        setSelectAllAttendance,
        setFilterData,
    }
}
