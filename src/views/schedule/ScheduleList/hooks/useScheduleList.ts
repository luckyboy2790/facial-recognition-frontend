import useSWR from 'swr'
import { useScheduleListStore } from '../store/employeeListStore'
import type { GetSchedulesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiDeleteSchedules, apiScheduleList } from '@/services/ScheduleService'
import { User } from '@/@types/auth'
import { useNavigate } from 'react-router-dom'
import { permissionChecker } from '@/services/PermissionChecker'

type ScheduleData = {
    scheduleIds: string[]
}

export default function useScheduleList() {
    const {
        tableData,
        setTableData,
        selectedSchedule,
        setSelectedSchedule,
        setSelectAllSchedule,
    } = useScheduleListStore((state) => state)

    const navigate = useNavigate()

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/schedules', { ...tableData }],
        ([_, params]) =>
            apiScheduleList<GetSchedulesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteSchedules = async (scheduleIds: string[], user: User) => {
        if (
            permissionChecker(user, 'schedule', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteSchedules<string[], ScheduleData>({
                scheduleIds,
            })
            mutate()
            setSelectAllSchedule([])
        }
    }

    const scheduleList = data?.list || []

    const scheduleListTotal = data?.total || 0

    return {
        scheduleList,
        scheduleListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        deleteSchedules,
        selectedSchedule,
        setSelectedSchedule,
        setSelectAllSchedule,
    }
}
