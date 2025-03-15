import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/EmployeeListTable'
import EmployeeListActionTools from './components/EmployeeListActionTools'
import EmployeesListTableTools from './components/EmployeeListTableTools'

const EmployeeList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Employee List Report</h3>
                            <EmployeeListActionTools />
                        </div>
                        <EmployeesListTableTools />
                        <EmployeeListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default EmployeeList
