import useSWR from 'swr'
import { useAttendanceListStore } from '../store/AttendanceListStore'
import type { GetAttendancesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiAttendanceList } from '@/services/AttendanceService'

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
            apiAttendanceList<GetAttendancesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const attendanceList = data?.list || []

    const attendanceListTotal = data?.total || 0

    return {
        attendanceList,
        attendanceListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedAttendance,
        setSelectedAttendance,
        setSelectAllAttendance,
        setFilterData,
    }
}
