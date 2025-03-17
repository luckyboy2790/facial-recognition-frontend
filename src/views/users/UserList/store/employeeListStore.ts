import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { User, Filter } from '../types'

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

export type UsersListState = {
    tableData: TableQueries
    selectedUser: Partial<User>[]
}

type UsersListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedUser: (checked: boolean, user: User) => void
    setSelectAllUser: (user: User[]) => void
}

const initialState: UsersListState = {
    tableData: initialTableData,
    selectedUser: [],
}

export const useUserListStore = create<UsersListState & UsersListAction>(
    (set) => ({
        ...initialState,
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setSelectedUser: (checked, row) =>
            set((state) => {
                const prevData = state.selectedUser
                if (checked) {
                    return { selectedUser: [...prevData, ...[row]] }
                } else {
                    if (prevData.some((prevUser) => row._id === prevUser._id)) {
                        return {
                            selectedUser: prevData.filter(
                                (prevUser) => prevUser._id !== row._id,
                            ),
                        }
                    }
                    return { selectedUser: prevData }
                }
            }),
        setSelectAllUser: (row) => set(() => ({ selectedUser: row })),
    }),
)
