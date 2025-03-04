import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { User, Users, RoleFilter } from '../types'

type Dialog = {
    type: '' | 'edit' | 'new'
    open: boolean
}

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: RoleFilter = {
    status: '',
    role: '',
}

export type RolePermissionsState = {
    tableData: TableQueries
    filterData: RoleFilter
    selectedUser: Users
    selectedRole: string
    roleDialog: Dialog
}

type RolePermissionsAction = {
    setFilterData: (payload: RoleFilter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedUser: (checked: boolean, customer: User) => void
    setSelectAllUser: (payload: Users) => void
    setSelectedRole: (payload: string) => void
    setRoleDialog: (payload: Dialog) => void
}

const initialState: RolePermissionsState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedUser: [],
    selectedRole: '',
    roleDialog: {
        type: '',
        open: false,
    },
}

export const useRolePermissionsStore = create<
    RolePermissionsState & RolePermissionsAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedUser: (checked, row) =>
        set((state) => {
            const prevData = state.selectedUser
            if (checked) {
                return { selectedUser: [...prevData, ...[row]] }
            } else {
                if (prevData.some((prevUser) => row.id === prevUser.id)) {
                    return {
                        selectedUser: prevData.filter(
                            (prevUser) => prevUser.id !== row.id,
                        ),
                    }
                }
                return { selectedUser: prevData }
            }
        }),
    setSelectAllUser: (payload) => set(() => ({ selectedUser: payload })),
    setSelectedRole: (payload) => set(() => ({ selectedRole: payload })),
    setRoleDialog: (payload) => set(() => ({ roleDialog: payload })),
}))
