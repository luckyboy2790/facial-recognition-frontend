import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import LeaveTable from './components/LeaveListTable'
import LeaveActionTools from './components/LeaveListActionTools'
import LeaveListTableTools from './components/LeaveListTableTools'
import LeaveSelected from './components/LeaveListSelected'
import useTranslation from '@/utils/hooks/useTranslation'

const Leave = () => {
    const { t } = useTranslation()
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3>
                                {t(
                                    'page.leave.leave_of_absence',
                                    'Leaves of Absence',
                                )}
                            </h3>
                            <LeaveActionTools />
                        </div>
                        <LeaveListTableTools />
                        <LeaveTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <LeaveSelected />
        </>
    )
}

export default Leave
