import useSWR from 'swr'
import { useScheduleListStore } from '../store/employeeListStore'
import type { GetSchedulesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import {
    apiDeleteSchedules,
    apiPersonalScheduleList,
} from '@/services/ScheduleService'

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

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/schedules', { ...tableData }],
        ([_, params]) =>
            apiPersonalScheduleList<GetSchedulesListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteSchedules = async (scheduleIds: string[]) => {
        await apiDeleteSchedules<string[], ScheduleData>({
            scheduleIds,
        })
        mutate()
        setSelectAllSchedule([])
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
