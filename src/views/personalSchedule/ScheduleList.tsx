import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ScheduleListTable from './components/ScheduleListTable'
import ScheduleListActionTools from './components/ScheduleListActionTools'
import CustomersListTableTools from './components/ScheduleListTableTools'
import ScheduleListSelected from './components/ScheduleListSelected'

const ScheduleList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Schedules</h3>
                            <ScheduleListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <ScheduleListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <ScheduleListSelected />
        </>
    )
}

export default ScheduleList
