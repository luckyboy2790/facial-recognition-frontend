import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { CSVLink } from 'react-csv'
import useDepartmentList from '../hooks/useDepartmentsList'
import { Department, DepartmentCreateResponse } from '../types'
import { useEffect, useState } from 'react'
import { apiGetAllData } from '@/services/employeeService'
import Papa from 'papaparse'
import { apiCreateDepartment } from '@/services/DepartmentService'

type DepartmentCreateData = {
    departmentName: string
    company: string
}

type responseType = {
    department: Department[]
}

const DepartmentctionTools = () => {
    const { mutate } = useDepartmentList()

    const [departmentList, setDepartmentList] = useState<Department[]>([])

    const handleExport = async () => {
        const employee: responseType = await apiGetAllData()

        setDepartmentList(employee.department)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                complete: async (result: any) => {
                    if (result.data?.length > 0) {
                        for (let department of result.data) {
                            if (department._id || department._id !== '') {
                                apiCreateDepartment<
                                    DepartmentCreateResponse,
                                    DepartmentCreateData
                                >({
                                    departmentName: department?.department_name,
                                    company: department?.company,
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
                filename="departmentList.csv"
                data={departmentList}
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

export default DepartmentctionTools
