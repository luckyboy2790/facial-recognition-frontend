import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ScheduleListTable from './components/ScheduleListTable'
import CustomersListTableTools from './components/ScheduleListTableTools'
import useTranslation from '@/utils/hooks/useTranslation'

const ScheduleList = () => {
    const { t } = useTranslation()

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3>{t('page.schedule.schedule', 'Schedules')}</h3>
                        </div>
                        <CustomersListTableTools />
                        <ScheduleListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default ScheduleList
