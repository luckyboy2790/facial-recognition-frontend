import { AdaptiveCard, Container } from '@/components/shared'
import LeaveTypesActionTools from './components/LeaveTypesActionTools'
import AddLeaveTypesSection from './components/AddLeaveTypesSection'
import LeaveTypesListSection from './components/LeaveTypesListSection'
import LeaveTypesListSelected from './components/LeaveTypesListSelected'
import LeaveTypesListTableTools from './components/LeaveTypesListTableTools'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { FaLock } from 'react-icons/fa'
import useTranslation from '@/utils/hooks/useTranslation'

const CompanyContent = () => {
    const { user } = useAuth()

    const { t } = useTranslation()

    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>
                            {t(
                                'page.leave_type.add_leave_type',
                                'Add Leave Types',
                            )}
                        </h3>
                        <LeaveTypesActionTools />
                    </div>
                    {permissionChecker(user, 'leaveType', 'create') === false &&
                    user.account_type === 'Admin' ? (
                        <div className="w-full h-full min-h-64 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <FaLock className="text-6xl" />
                                <p className="text-sm">
                                    {t(
                                        'page.leave_type.permission_create_denide',
                                        "You don't have permission to access to create leave type.",
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <AdaptiveCard>
                            <AddLeaveTypesSection />
                        </AdaptiveCard>
                    )}
                    <AdaptiveCard>
                        <LeaveTypesListTableTools />
                        <LeaveTypesListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <LeaveTypesListSelected />
        </>
    )
}

export default CompanyContent
