import { AdaptiveCard, Container } from '@/components/shared'
import AddLeaveGroupsSection from './components/AddLeaveGroupsSection'
import LeaveGroupsListSection from './components/LeaveGroupsListSection'
import LeaveGroupsListSelected from './components/LeaveGroupsListSelected'
import LeaveGroupsListTableTools from './components/LeaveGroupsListTableTools'
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
                        <h3>Add Leave Groups</h3>
                    </div>
                    {permissionChecker(user, 'leaveGroup', 'create') ===
                        false && user.account_type === 'Admin' ? (
                        <div className="w-full h-full min-h-64 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <FaLock className="text-6xl" />
                                <p className="text-sm">
                                    You don't have permission to access to
                                    create leave groups.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <AdaptiveCard>
                            <AddLeaveGroupsSection />
                        </AdaptiveCard>
                    )}
                    <AdaptiveCard>
                        <LeaveGroupsListTableTools />
                        <LeaveGroupsListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <LeaveGroupsListSelected />
        </>
    )
}

export default CompanyContent
