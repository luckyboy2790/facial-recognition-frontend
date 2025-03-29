import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import useEmployeeList from '../hooks/useEmployeeList'
import { CSVLink } from 'react-csv'
import { TbCloudDownload } from 'react-icons/tb'

const CustomerListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useEmployeeList()

    const filteredCustomerList = customerList.map((employee) => ({
        'Employee Name': employee.full_name,
        Age: employee.age,
        Gender: employee.gender,
        'Civil Status': employee.civil_status,
        'Contact Number': `${employee.dial_code} ${employee.phone_number}`,
        Email: employee.email,
        'Employment Status': employee.employee_status,
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
