import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Schedule, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    purchasedProducts: '',
    purchaseChannel: [
        'Retail Stores',
        'Online Retailers',
        'Resellers',
        'Mobile Apps',
        'Direct Sales',
    ],
}

export type SchedulesListState = {
    tableData: TableQueries
    selectedSchedule: Partial<Schedule>[]
}

type SchedulesListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedSchedule: (checked: boolean, schedule: Schedule) => void
    setSelectAllSchedule: (schedule: Schedule[]) => void
}

const initialState: SchedulesListState = {
    tableData: initialTableData,
    selectedSchedule: [],
}

export const useScheduleListStore = create<
    SchedulesListState & SchedulesListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedSchedule: (checked, row) =>
        set((state) => {
            const prevData = state.selectedSchedule
            if (checked) {
                return { selectedSchedule: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevSchedule) => row._id === prevSchedule._id,
                    )
                ) {
                    return {
                        selectedSchedule: prevData.filter(
                            (prevSchedule) => prevSchedule._id !== row._id,
                        ),
                    }
                }
                return { selectedSchedule: prevData }
            }
        }),
    setSelectAllSchedule: (row) => set(() => ({ selectedSchedule: row })),
}))
