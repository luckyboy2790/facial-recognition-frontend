import useSWR from 'swr'
import { useAttendanceListStore } from '../store/AttendanceListStore'
import type { GetAttendancesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import {
    apiAttendanceList,
    apiDeleteAttendances,
} from '@/services/AttendanceService'
import { User } from '@/@types/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/attendance', { ...tableData }],
        ([_, params]) =>
            apiAttendanceList<GetAttendancesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteAttendances = async (attendanceIds: string[], user: User) => {
        if (
            permissionChecker(user, 'attendance', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteAttendances<string[], AttendanceData>({
                attendanceIds,
            })
            mutate()
            setSelectAllAttendance([])
        }
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
