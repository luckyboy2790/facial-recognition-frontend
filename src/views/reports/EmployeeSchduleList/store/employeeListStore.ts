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

export type CustomersListState = {
    tableData: TableQueries
    selectedCustomer: Partial<Schedule>[]
}

type CustomersListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedCustomer: (checked: boolean, customer: Schedule) => void
    setSelectAllCustomer: (customer: Schedule[]) => void
}

const initialState: CustomersListState = {
    tableData: initialTableData,
    selectedCustomer: [],
}

export const useCustomerListStore = create<
    CustomersListState & CustomersListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedCustomer: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCustomer
            if (checked) {
                return { selectedCustomer: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevCustomer) => row._id === prevCustomer._id,
                    )
                ) {
                    return {
                        selectedCustomer: prevData.filter(
                            (prevCustomer) => prevCustomer._id !== row._id,
                        ),
                    }
                }
                return { selectedCustomer: prevData }
            }
        }),
    setSelectAllCustomer: (row) => set(() => ({ selectedCustomer: row })),
}))
