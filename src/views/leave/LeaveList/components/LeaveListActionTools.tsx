import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useEmployeeList from '../hooks/useLeaveList'
import { CSVLink } from 'react-csv'

const LeaveListActionTools = () => {
    const navigate = useNavigate()

    const { leaveList } = useEmployeeList()

    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <CSVLink
                className="w-full"
                filename="leaveList.csv"
                data={leaveList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/employee-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default LeaveListActionTools
