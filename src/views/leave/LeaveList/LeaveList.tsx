import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import LeaveListTable from './components/LeaveListTable'
import CustomersListTableTools from './components/LeaveListTableTools'
import LeaveListSelected from './components/LeaveListSelected'
import useTranslation from '@/utils/hooks/useTranslation'

const LeaveList = () => {
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
                        </div>
                        <CustomersListTableTools />
                        <LeaveListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <LeaveListSelected />
        </>
    )
}

export default LeaveList
