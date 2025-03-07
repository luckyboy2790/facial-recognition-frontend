import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { LeaveType, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type LeaveTypesListState = {
    tableData: TableQueries
    selectedLeaveType: Partial<LeaveType>[]
}

type LeaveTypesListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedLeaveType: (checked: boolean, leaveType: LeaveType) => void
    setSelectAllLeaveType: (leaveType: LeaveType[]) => void
}

const initialState: LeaveTypesListState = {
    tableData: initialTableData,
    selectedLeaveType: [],
}

export const useLeaveTypeListStore = create<
    LeaveTypesListState & LeaveTypesListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedLeaveType: (checked, row) =>
        set((state) => {
            const prevData = state.selectedLeaveType
            if (checked) {
                return { selectedLeaveType: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevLeaveType) => row._id === prevLeaveType._id,
                    )
                ) {
                    return {
                        selectedLeaveType: prevData.filter(
                            (prevLeaveType) => prevLeaveType._id !== row._id,
                        ),
                    }
                }
                return { selectedLeaveType: prevData }
            }
        }),
    setSelectAllLeaveType: (row) => set(() => ({ selectedLeaveType: row })),
}))
