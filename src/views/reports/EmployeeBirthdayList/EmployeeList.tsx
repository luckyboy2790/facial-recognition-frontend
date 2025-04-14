import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/EmployeeListTable'
import EmployeeListActionTools from './components/EmployeeListActionTools'
import useTranslation from '@/utils/hooks/useTranslation'

const EmployeeList = () => {
    const { t } = useTranslation()
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>
                                {t(
                                    'page.report.employee_birthday',
                                    'Employee Birthdays',
                                )}
                            </h3>
                            <EmployeeListActionTools />
                        </div>
                        <EmployeeListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default EmployeeList
