import { AdaptiveCard, Container } from '@/components/shared'
import JobsActionTools from './components/JobsActionTools'
import AddJobsSection from './components/AddJobsSection'
import JobsListSection from './components/JobsListSection'
import CompanyListSelected from './components/JobsListSelected'
import JobsListTableTools from './components/JobsListTableTools'
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
                            {t('page.job_title.add_job_title', 'Add Job Title')}
                        </h3>
                        <JobsActionTools />
                    </div>
                    {permissionChecker(user, 'jobTitles', 'create') === false &&
                    user.account_type === 'Admin' ? (
                        <div className="w-full h-full min-h-64 dark:bg-zinc-900 bg-zinc-200 rounded-md flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <FaLock className="text-6xl" />
                                <p className="text-sm">
                                    {t(
                                        'page.job_title.permission_create_denide',
                                        "You don't have permission to access to create job titles.",
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <AdaptiveCard>
                            <AddJobsSection />
                        </AdaptiveCard>
                    )}
                    <AdaptiveCard>
                        <JobsListTableTools />
                        <JobsListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <CompanyListSelected />
        </>
    )
}

export default CompanyContent
