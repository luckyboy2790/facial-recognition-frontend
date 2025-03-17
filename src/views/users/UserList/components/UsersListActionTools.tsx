import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useEmployeeList from '../hooks/useEmployeeList'
import { CSVLink } from 'react-csv'
import RolesPermissionsGroupsAction from './RolesPermissionsGroupsAction'
import RolesPermissionsAccessDialogComponent from './RolesPermissionsAccessDialog'
import useRolePermissonsRoles from '../hooks/useRolePermissonsRoles'

const CustomerListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useEmployeeList()
    const { roleList, mutate: roleMutate } = useRolePermissonsRoles()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={customerList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <RolesPermissionsGroupsAction />
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/users-create')}
            >
                Add new
            </Button>
            <RolesPermissionsAccessDialogComponent
                roleList={roleList}
                mutate={roleMutate}
            />
        </div>
    )
}

export default CustomerListActionTools
