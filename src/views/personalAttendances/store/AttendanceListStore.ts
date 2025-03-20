import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Attendance, Filter } from '../types'

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

export type AttendancesListState = {
    tableData: TableQueries
    filterData: Filter
    selectedAttendance: Partial<Attendance>[]
}

type AttendancesListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedAttendance: (checked: boolean, attendance: Attendance) => void
    setSelectAllAttendance: (attendance: Attendance[]) => void
}

const initialState: AttendancesListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedAttendance: [],
}

export const useAttendanceListStore = create<
    AttendancesListState & AttendancesListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedAttendance: (checked, row) =>
        set((state) => {
            const prevData = state.selectedAttendance
            if (checked) {
                return { selectedAttendance: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevAttendance) => row._id === prevAttendance._id,
                    )
                ) {
                    return {
                        selectedAttendance: prevData.filter(
                            (prevAttendance) => prevAttendance._id !== row._id,
                        ),
                    }
                }
                return { selectedAttendance: prevData }
            }
        }),
    setSelectAllAttendance: (row) => set(() => ({ selectedAttendance: row })),
}))
