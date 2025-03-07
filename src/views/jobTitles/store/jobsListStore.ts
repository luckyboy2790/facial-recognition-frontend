import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { JobTitle, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type JobTitlesListState = {
    tableData: TableQueries
    selectedJobTitle: Partial<JobTitle>[]
}

type JobTitlesListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedJobTitle: (checked: boolean, jobTitle: JobTitle) => void
    setSelectAllJobTitle: (jobTitle: JobTitle[]) => void
}

const initialState: JobTitlesListState = {
    tableData: initialTableData,
    selectedJobTitle: [],
}

export const useJobTitleListStore = create<
    JobTitlesListState & JobTitlesListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedJobTitle: (checked, row) =>
        set((state) => {
            const prevData = state.selectedJobTitle
            if (checked) {
                return { selectedJobTitle: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevJobTitle) => row._id === prevJobTitle._id,
                    )
                ) {
                    return {
                        selectedJobTitle: prevData.filter(
                            (prevJobTitle) => prevJobTitle._id !== row._id,
                        ),
                    }
                }
                return { selectedJobTitle: prevData }
            }
        }),
    setSelectAllJobTitle: (row) => set(() => ({ selectedJobTitle: row })),
}))
