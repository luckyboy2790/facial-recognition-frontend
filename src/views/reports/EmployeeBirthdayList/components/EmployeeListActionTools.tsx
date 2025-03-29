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
        full_name: employee.full_name,
        department_name: employee.department?.department_name,
        job_title: employee.job_title?.job_title,
        birthday: employee.birthday,
        contact_number: `${employee.dial_code} ${employee.phone_number}`,
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
                filename="employeeList.csv"
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
