import { AdaptiveCard, Container } from '@/components/shared'
import AddLeaveGroupsSection from './components/AddLeaveGroupsSection'
import LeaveGroupsListSection from './components/LeaveGroupsListSection'
import LeaveGroupsListSelected from './components/LeaveGroupsListSelected'
import LeaveGroupsListTableTools from './components/LeaveGroupsListTableTools'

const CompanyContent = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Add Leave Groups</h3>
                    </div>
                    <AdaptiveCard>
                        <AddLeaveGroupsSection />
                    </AdaptiveCard>
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
