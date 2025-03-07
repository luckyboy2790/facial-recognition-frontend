import {
    apiDeleteDepartments,
    apiDepartmentsList,
} from '@/services/DepartmentService'
import useSWR from 'swr'
import { useDepartmentListStore } from '../store/departmentsListStore'
import type { GetDepartmentsListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

type DepartmentCreateData = {
    companies: string[]
}

export default function useDepartmentList() {
    const {
        tableData,
        setTableData,
        selectedDepartment,
        setSelectedDepartment,
        setSelectAllDepartment,
    } = useDepartmentListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/departments', { ...tableData }],
        ([_, params]) =>
            apiDepartmentsList<GetDepartmentsListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteDepartments = async (companies: string[]) => {
        await apiDeleteDepartments<string[], DepartmentCreateData>({
            companies,
        })
        mutate()
        setSelectAllDepartment([])
    }

    const departmentList = data?.list || []

    const departmentListTotal = data?.total || 0

    return {
        departmentList,
        departmentListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        deleteDepartments,
        selectedDepartment,
        setSelectedDepartment,
        setSelectAllDepartment,
    }
}
