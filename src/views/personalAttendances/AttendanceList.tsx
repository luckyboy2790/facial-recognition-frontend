import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import AttendanceTable from './components/AttendanceListTable'
import AttendanceListTableTools from './components/AttendanceListTableTools'
import AttendanceSelected from './components/AttendanceListSelected'

const Attendance = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3>Attendances</h3>
                        </div>
                        <AttendanceListTableTools />
                        <AttendanceTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <AttendanceSelected />
        </>
    )
}

export default Attendance
