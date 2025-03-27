import {
    apiDeleteJobTitles,
    apiJobTitlesList,
} from '@/services/JobTitleService'
import { apiDepartmentsList } from '@/services/DepartmentService'
import useSWR from 'swr'
import { useJobTitleListStore } from '../store/jobsListStore'
import type { GetJobTitleListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { GetDepartmentsListResponse } from '@/views/departments/types'
import { User } from '@/@types/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { useNavigate } from 'react-router-dom'

type DepartmentCreateData = {
    jobTitles: string[]
}

export default function useJobTitleList() {
    const {
        tableData,
        setTableData,
        selectedJobTitle,
        setSelectedJobTitle,
        setSelectAllJobTitle,
    } = useJobTitleListStore((state) => state)

    const navigate = useNavigate()

    const {
        data: departmentsData,
        error: departmentsError,
        isLoading: isDepartmentsLoading,
        mutate: mutateDepartment,
    } = useSWR(
        ['/api/departments', { ...tableData }],
        ([_, params]) =>
            apiDepartmentsList<GetDepartmentsListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const {
        data: jobTitlesData,
        error: jobTitlesError,
        isLoading: isJobTitlesLoading,
        mutate: mutateJobTitles,
    } = useSWR(
        ['/api/jobTitles', { ...tableData }],
        ([_, params]) =>
            apiJobTitlesList<GetJobTitleListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteJobTitles = async (jobTitles: string[], user: User) => {
        if (
            permissionChecker(user, 'jobTitles', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            await apiDeleteJobTitles<string[], DepartmentCreateData>({
                jobTitles,
            })
            mutateJobTitles()
            setSelectAllJobTitle([])
        }
    }

    return {
        departmentList: departmentsData?.list || [],
        departmentListTotal: departmentsData?.total || 0,
        jobTitlesList: jobTitlesData?.list || [],
        jobTitlesTotal: jobTitlesData?.total || 0,
        error: departmentsError || jobTitlesError,
        isLoading: isDepartmentsLoading || isJobTitlesLoading,
        tableData,
        deleteJobTitles,
        mutateDepartment,
        mutateJobTitles,
        setTableData,
        selectedJobTitle,
        setSelectedJobTitle,
        setSelectAllJobTitle,
    }
}
