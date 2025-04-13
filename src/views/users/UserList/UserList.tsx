import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/UsersListTable'
import EmployeeListActionTools from './components/UsersListActionTools'
import CustomersListTableTools from './components/UsersListTableTools'
import EmployeeListSelected from './components/UsersListSelected'
import RolesPermissionsGroups from './components/RolesPermissionsGroups'
import useRolePermissonsRoles from './hooks/useRolePermissonsRoles'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { FaLock } from 'react-icons/fa'
import useTranslation from '@/utils/hooks/useTranslation'

const EmployeeList = () => {
    const { roleList, mutate: roleMutate } = useRolePermissonsRoles()

    const { user } = useAuth()

    const { t } = useTranslation()

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>{t('page.user.user', 'Users')}</h3>
                            <EmployeeListActionTools />
                        </div>
                        <div className="mb-10">
                            {permissionChecker(user, 'role', 'read') ===
                                false && user.account_type === 'Admin' ? (
                                <div className="w-full h-full min-h-72 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                                    <div className="flex flex-col gap-4 justify-center items-center">
                                        <FaLock className="text-6xl" />
                                        <p className="text-sm">
                                            {t(
                                                'page.user.user_role_access_denide',
                                                "You don't have permission to access to user role table.",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <RolesPermissionsGroups
                                    roleList={roleList}
                                    mutate={roleMutate}
                                />
                            )}
                        </div>
                        <>
                            {permissionChecker(user, 'user', 'read') ===
                                false && user.account_type === 'Admin' ? (
                                <div className="w-full h-full min-h-96 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                                    <div className="flex flex-col gap-4 justify-center items-center">
                                        <FaLock className="text-8xl" />
                                        <p className="text-xl">
                                            {t(
                                                'page.user.permission_access_denide',
                                                "You don't have permission to access to user table.",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <CustomersListTableTools />
                                    <EmployeeListTable />
                                </>
                            )}
                        </>
                    </div>
                </AdaptiveCard>
            </Container>
            <EmployeeListSelected />
        </>
    )
}

export default EmployeeList
