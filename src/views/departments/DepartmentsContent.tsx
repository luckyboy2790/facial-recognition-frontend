import { AdaptiveCard, Container } from '@/components/shared'
import DepartmentsActionTools from './components/DepartmentsActionTools'
import AddDepartmentsSection from './components/AddDepartmentsSection'
import DepartmentsListSection from './components/DepartmentsListSection'
import DepartmentsListSelected from './components/DepartmentsListSelected'
import DepartmentsListTableTools from './components/DepartmentsListTableTools'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { FaLock } from 'react-icons/fa'

const CompanyContent = () => {
    const { user } = useAuth()
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Add Department</h3>
                        <DepartmentsActionTools />
                    </div>
                    {permissionChecker(user, 'department', 'create') ===
                        false && user.account_type === 'Admin' ? (
                        <div className="w-full h-full min-h-64 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <FaLock className="text-6xl" />
                                <p className="text-sm">
                                    You don't have permission to access to
                                    create department.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <AdaptiveCard>
                            <AddDepartmentsSection />
                        </AdaptiveCard>
                    )}
                    <AdaptiveCard>
                        <DepartmentsListTableTools />
                        <DepartmentsListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <DepartmentsListSelected />
        </>
    )
}

export default CompanyContent
