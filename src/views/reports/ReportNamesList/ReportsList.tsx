import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import AttendanceTable from './components/ReportsListTable'

const Attendance = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Reports</h3>
                        </div>
                        <AttendanceTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default Attendance
