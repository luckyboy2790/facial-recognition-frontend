import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { LeaveGroup, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type LeaveGroupsListState = {
    tableData: TableQueries
    selectedLeaveGroup: Partial<LeaveGroup>[]
}

type LeaveGroupsListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedLeaveGroup: (checked: boolean, LeaveGroup: LeaveGroup) => void
    setSelectAllLeaveGroup: (LeaveGroup: LeaveGroup[]) => void
}

const initialState: LeaveGroupsListState = {
    tableData: initialTableData,
    selectedLeaveGroup: [],
}

export const useLeaveGroupListStore = create<
    LeaveGroupsListState & LeaveGroupsListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedLeaveGroup: (checked, row) =>
        set((state) => {
            const prevData = state.selectedLeaveGroup
            if (checked) {
                return { selectedLeaveGroup: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevLeaveGroup) => row._id === prevLeaveGroup._id,
                    )
                ) {
                    return {
                        selectedLeaveGroup: prevData.filter(
                            (prevLeaveGroup) => prevLeaveGroup._id !== row._id,
                        ),
                    }
                }
                return { selectedLeaveGroup: prevData }
            }
        }),
    setSelectAllLeaveGroup: (row) => set(() => ({ selectedLeaveGroup: row })),
}))
