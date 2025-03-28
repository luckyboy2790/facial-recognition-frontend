import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import {
    GetLeaveTypesListResponse,
    LeaveType,
    LeaveTypeCreateResponse,
} from '../types'
import { useEffect, useState } from 'react'
import {
    apiCreateLeaveType,
    apiTotalLeaveTypesList,
} from '@/services/leaveTypeService'
import Papa from 'papaparse'
import useLeaveTypeList from '../hooks/useLeaveTypesList'

type LeaveTypeCreateData = {
    leaveName: string
    company: string | null
}

const CompanyActionTools = () => {
    const navigate = useNavigate()

    const { mutate } = useLeaveTypeList()

    const [leaveTypeList, setLeaveTypeList] = useState<LeaveType[]>([])

    const handleExport = async () => {
        const employee =
            await apiTotalLeaveTypesList<GetLeaveTypesListResponse>()

        setLeaveTypeList(employee.list)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                complete: async (result: any) => {
                    if (result.data?.length > 0) {
                        for (let leaveType of result.data) {
                            if (leaveType._id || leaveType._id !== '') {
                                apiCreateLeaveType<
                                    LeaveTypeCreateResponse,
                                    LeaveTypeCreateData
                                >({
                                    leaveName: leaveType?.leave_name,
                                    company: leaveType?.company,
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
                filename="leaveTypeList.csv"
                data={leaveTypeList}
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
            <Button
                variant="solid"
                icon={<FaPlus className="text-xl" />}
                onClick={() => navigate('/leavegroup')}
            >
                Add leave group
            </Button>
        </div>
    )
}

export default CompanyActionTools
