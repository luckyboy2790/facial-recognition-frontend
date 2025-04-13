import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useEmployeeList from '../hooks/useLeaveList'
import { CSVLink } from 'react-csv'
import useTranslation from '@/utils/hooks/useTranslation'

const LeaveListActionTools = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

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
                    {t('page.download', 'Download')}
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/employee-create')}
            >
                {t('page.add_new', 'Add new')}
            </Button>
        </div>
    )
}

export default LeaveListActionTools
