import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import LeaveListTable from './components/LeaveListTable'
import LeaveListActionTools from './components/LeaveListActionTools'
import CustomersListTableTools from './components/LeaveListTableTools'
import LeaveListSelected from './components/LeaveListSelected'

const LeaveList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Leaves of Absence</h3>
                            {/* <LeaveListActionTools /> */}
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
