import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Leave, Filter } from '../types'

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

export type LeavesListState = {
    tableData: TableQueries
    filterData: Filter
    selectedLeave: Partial<Leave>[]
}

type LeavesListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedLeave: (checked: boolean, leave: Leave) => void
    setSelectAllLeave: (leave: Leave[]) => void
}

const initialState: LeavesListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedLeave: [],
}

export const useLeaveListStore = create<LeavesListState & LeavesListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setSelectedLeave: (checked, row) =>
            set((state) => {
                const prevData = state.selectedLeave
                if (checked) {
                    return { selectedLeave: [...prevData, ...[row]] }
                } else {
                    if (
                        prevData.some((prevLeave) => row._id === prevLeave._id)
                    ) {
                        return {
                            selectedLeave: prevData.filter(
                                (prevLeave) => prevLeave._id !== row._id,
                            ),
                        }
                    }
                    return { selectedLeave: prevData }
                }
            }),
        setSelectAllLeave: (row) => set(() => ({ selectedLeave: row })),
    }),
)
