import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useEmployeeList from '../hooks/useScheduleList'
import { CSVLink } from 'react-csv'

const ScheduleListActionTools = () => {
    const navigate = useNavigate()

    const { scheduleList } = useEmployeeList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="scheduleList.csv"
                data={scheduleList}
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
                onClick={() => navigate('/schedule-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default ScheduleListActionTools
