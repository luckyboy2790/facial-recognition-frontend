import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import AttendanceTable from './components/AttendanceListTable'
import AttendanceActionTools from './components/AttendanceListActionTools'
import AttendanceListTableTools from './components/AttendanceListTableTools'
import AttendanceSelected from './components/AttendanceListSelected'
import useTranslation from '@/utils/hooks/useTranslation'

const Attendance = () => {
    const { t } = useTranslation()
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>
                                {t('page.attendance.attendance', 'Attendances')}
                            </h3>
                            <AttendanceActionTools />
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
