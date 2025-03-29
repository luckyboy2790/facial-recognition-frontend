import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import { CSVLink } from 'react-csv'
import { TbCloudDownload } from 'react-icons/tb'
import useEmployeeList from '../hooks/useEmployeeList'

const CustomerListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useEmployeeList()

    const filteredCustomerList = customerList.map((employee) => ({
        'Employee Name': employee.full_name,
        Department: employee.department?.department_name,
        Position: employee.job_title?.job_title,
        Birthday: employee.birthday,
        'Contact Number': `${employee.dial_code} ${employee.phone_number}`,
    }))

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="default"
                icon={<GiReturnArrow className="text-xl" />}
                onClick={() => navigate('/reports')}
            >
                Return
            </Button>
            <CSVLink
                className="w-full"
                filename="employeeBirthdayList.csv"
                data={filteredCustomerList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
        </div>
    )
}

export default CustomerListActionTools
