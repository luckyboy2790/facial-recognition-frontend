import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { useEffect, useState } from 'react'
import { LeaveGroup, LeaveGroupCreateResponse } from '../types'
import useLeaveTypeList from '../hooks/useLeaveGroupsList'
import { apiGetAllData } from '@/services/employeeService'
import Papa from 'papaparse'
import { apiCreateLeaveGroup } from '@/services/leaveGroupService'

type responseType = {
    leaveGroup: LeaveGroup[]
}

type LeaveGroupCreateData = {
    leaveGroupName: string
    description: string
    company: string | null
    leavePrivilege: string[]
    groupStatus: string
}

const CompanyActionTools = () => {
    const { mutateLeaveGroup } = useLeaveTypeList()

    const [leaveGroupList, setLeaveGroupList] = useState<LeaveGroup[]>([])

    const handleExport = async () => {
        const leaveGroup: responseType = await apiGetAllData()

        setLeaveGroupList(leaveGroup.leaveGroup)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                complete: async (result: any) => {
                    if (result.data?.length > 0) {
                        for (let leaveGroup of result.data) {
                            if (leaveGroup._id || leaveGroup._id !== '') {
                                apiCreateLeaveGroup<
                                    LeaveGroupCreateResponse,
                                    LeaveGroupCreateData
                                >({
                                    leaveGroupName: leaveGroup.group_name,
                                    description: leaveGroup.description,
                                    company: leaveGroup.company,
                                    leavePrivilege: leaveGroup.leavePrivilege,
                                    groupStatus: leaveGroup.status,
                                })
                            }
                        }
                    }
                    mutateLeaveGroup()
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
                filename="leaveGroupList.csv"
                data={leaveGroupList}
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
