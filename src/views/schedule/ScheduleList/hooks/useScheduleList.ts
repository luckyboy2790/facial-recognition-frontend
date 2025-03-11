import useSWR from 'swr'
import { useScheduleListStore } from '../store/employeeListStore'
import type { GetSchedulesListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiScheduleList } from '@/services/ScheduleService'

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
            apiScheduleList<GetSchedulesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

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
        selectedSchedule,
        setSelectedSchedule,
        setSelectAllSchedule,
    }
}
