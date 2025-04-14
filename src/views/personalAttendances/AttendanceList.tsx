import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import AttendanceTable from './components/AttendanceListTable'
import AttendanceListTableTools from './components/AttendanceListTableTools'
import useTranslation from '@/utils/hooks/useTranslation'

const Attendance = () => {
    const { t } = useTranslation()
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3>
                                {t('page.attendance.attendance', 'Attendances')}
                            </h3>
                        </div>
                        <AttendanceListTableTools />
                        <AttendanceTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default Attendance
