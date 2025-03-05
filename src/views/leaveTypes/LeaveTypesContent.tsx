import { AdaptiveCard, Container } from '@/components/shared'
import LeaveTypesActionTools from './components/LeaveTypesActionTools'
import AddLeaveTypesSection from './components/AddLeaveTypesSection'
import LeaveTypesListSection from './components/LeaveTypesListSection'
import LeaveTypesListSelected from './components/LeaveTypesListSelected'
import LeaveTypesListTableTools from './components/LeaveTypesListTableTools'

const CompanyContent = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Add Leave Types</h3>
                        <LeaveTypesActionTools />
                    </div>
                    <AdaptiveCard>
                        <AddLeaveTypesSection />
                    </AdaptiveCard>
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
