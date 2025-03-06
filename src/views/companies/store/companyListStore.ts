import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Company } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type CompaniesListState = {
    tableData: TableQueries
    selectedCompany: Partial<Company>[]
}

type CompaniesListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedCompany: (checked: boolean, company: Company) => void
    setSelectAllCompany: (company: Company[]) => void
}

const initialState: CompaniesListState = {
    tableData: initialTableData,
    selectedCompany: [],
}

export const useCompanyListStore = create<
    CompaniesListState & CompaniesListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedCompany: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCompany
            if (checked) {
                return { selectedCompany: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevCompany) => row._id === prevCompany._id)
                ) {
                    return {
                        selectedCompany: prevData.filter(
                            (prevCompany) => prevCompany._id !== row._id,
                        ),
                    }
                }
                return { selectedCompany: prevData }
            }
        }),
    setSelectAllCompany: (row) => set(() => ({ selectedCompany: row })),
}))
