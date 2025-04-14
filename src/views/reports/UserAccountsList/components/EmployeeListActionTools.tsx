import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import useEmployeeList from '../hooks/useEmployeeList'
import { CSVLink } from 'react-csv'
import { TbCloudDownload } from 'react-icons/tb'
import useTranslation from '@/utils/hooks/useTranslation'

const CustomerListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useEmployeeList()

    const { t } = useTranslation()

    const filteredUserList = customerList.map((user) => ({
        'Employee Name': user.employeeData?.full_name,
        Email: user.email,
        'Account Type': user.account_type,
        Status: user.status,
    }))

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="default"
                icon={<GiReturnArrow className="text-xl" />}
                onClick={() => navigate('/reports')}
            >
                {t('page.return', 'Return')}
            </Button>
            <CSVLink
                className="w-full"
                filename="userList.csv"
                data={filteredUserList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    {t('page.download', 'Download')}
                </Button>
            </CSVLink>
        </div>
    )
}

export default CustomerListActionTools
