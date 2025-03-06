import { apiCompaniesList, apiDeleteCompanies } from '@/services/CompanyService'
import useSWR from 'swr'
import { useCompanyListStore } from '../store/companyListStore'
import type { GetCompanyListResponse } from '../types'
import type { TableQueries } from '@/@types/common'

type CompanyCreateData = {
    companies: string[]
}

export default function useCustomerList() {
    const {
        tableData,
        setTableData,
        selectedCompany,
        setSelectedCompany,
        setSelectAllCompany,
    } = useCompanyListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/company', { ...tableData }],
        ([_, params]) =>
            apiCompaniesList<GetCompanyListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteCompanies = async (companies: string[]) => {
        await apiDeleteCompanies<string[], CompanyCreateData>({
            companies,
        })
        mutate()
        setSelectAllCompany([])
    }

    const companyList = data?.list || []

    const customerListTotal = data?.total || 0

    return {
        companyList,
        customerListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedCompany,
        setSelectedCompany,
        setSelectAllCompany,
        deleteCompanies,
    }
}
