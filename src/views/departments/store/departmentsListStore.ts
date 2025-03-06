import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Department, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type DepartmentsListState = {
    tableData: TableQueries
    selectedDepartment: Partial<Department>[]
}

type DepartmentsListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedDepartment: (checked: boolean, customer: Department) => void
    setSelectAllDepartment: (customer: Department[]) => void
}

const initialState: DepartmentsListState = {
    tableData: initialTableData,
    selectedDepartment: [],
}

export const useDepartmentListStore = create<
    DepartmentsListState & DepartmentsListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedDepartment: (checked, row) =>
        set((state) => {
            const prevData = state.selectedDepartment
            if (checked) {
                return { selectedDepartment: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevDepartment) => row._id === prevDepartment._id,
                    )
                ) {
                    return {
                        selectedDepartment: prevData.filter(
                            (prevDepartment) => prevDepartment._id !== row._id,
                        ),
                    }
                }
                return { selectedDepartment: prevData }
            }
        }),
    setSelectAllDepartment: (row) => set(() => ({ selectedDepartment: row })),
}))
