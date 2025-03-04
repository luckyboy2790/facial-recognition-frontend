import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/UsersListTable'
import EmployeeListActionTools from './components/UsersListActionTools'
import CustomersListTableTools from './components/UsersListTableTools'
import EmployeeListSelected from './components/UsersListSelected'
import RolesPermissionsGroups from './components/RolesPermissionsGroups'
import useRolePermissonsRoles from './hooks/useRolePermissonsRoles'

const EmployeeList = () => {
    const { roleList, mutate: roleMutate } = useRolePermissonsRoles()

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Users</h3>
                            <EmployeeListActionTools />
                        </div>
                        <div className="mb-10">
                            <RolesPermissionsGroups roleList={roleList} />
                        </div>
                        <CustomersListTableTools />
                        <EmployeeListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <EmployeeListSelected />
        </>
    )
}

export default EmployeeList
