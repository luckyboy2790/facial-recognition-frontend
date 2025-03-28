import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { JobTitle, JobTitleCreateResponse } from '../types'
import useJobTitleList from '../hooks/useJobsList'
import { useEffect, useState } from 'react'
import { apiGetAllData } from '@/services/employeeService'
import Papa from 'papaparse'
import { apiCreateJobTitle } from '@/services/JobTitleService'

type JobTitleCreateData = {
    departmentId: string | null
    jobTitle: string
    company: string | null
}

type responseType = {
    jobTitle: JobTitle[]
}

const CompanyActionTools = () => {
    const { mutateJobTitles } = useJobTitleList()

    const [jobTitleList, setJobTitleList] = useState<JobTitle[]>([])

    const handleExport = async () => {
        const data: responseType = await apiGetAllData()

        setJobTitleList(data.jobTitle)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                complete: async (result: any) => {
                    if (result.data?.length > 0) {
                        for (let jobTitle of result.data) {
                            if (jobTitle._id || jobTitle._id !== '') {
                                apiCreateJobTitle<
                                    JobTitleCreateResponse,
                                    JobTitleCreateData
                                >({
                                    company: jobTitle?.company,
                                    departmentId: jobTitle?.department_id,
                                    jobTitle: jobTitle?.job_title,
                                })
                            }
                        }
                    }
                    mutateJobTitles()
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
                filename="jobTitleList.csv"
                data={jobTitleList}
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
