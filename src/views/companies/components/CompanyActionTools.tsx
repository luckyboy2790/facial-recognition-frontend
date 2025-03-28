import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { CSVLink } from 'react-csv'
import { useEffect, useState } from 'react'
import { Company, CompanyCreateResponse } from '../types'
import { apiCreateCompany, apiTotalCompanies } from '@/services/CompanyService'
import Papa from 'papaparse'
import useCompanyList from '../hooks/useCompanyList'

type ResponseType = {
    list: Company[]
    message: string
    total: number
}

type CompanyCreateData = {
    companyName: string
}

const CompanyActionTools = () => {
    const { mutate } = useCompanyList()

    const [companyList, setCompanyList] = useState<Company[]>([])

    const handleExport = async () => {
        const employee: ResponseType = await apiTotalCompanies()

        setCompanyList(employee.list)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                complete: async (result: any) => {
                    if (result.data?.length > 0) {
                        for (let company of result.data) {
                            if (company._id || company._id !== '') {
                                apiCreateCompany<
                                    CompanyCreateResponse,
                                    CompanyCreateData
                                >({
                                    companyName: company?.company_name,
                                })
                            }
                        }
                    }
                    mutate()
                },
                header: true,
            })
        }
    }

    useEffect(() => {
        handleExport()
    }, [])

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="companyList.csv"
                data={companyList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <div className="w-full">
                <Button
                    variant="solid"
                    icon={<TbCloudUpload className="text-xl" />}
                >
                    <label htmlFor="file-upload" className="cursor-pointer">
                        Import CSV
                    </label>
                </Button>
                <input
                    type="file"
                    id="file-upload"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export default CompanyActionTools
