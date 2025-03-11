import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/EmployeeListTable'
import EmployeeListActionTools from './components/EmployeeListActionTools'
import CustomersListTableTools from './components/EmployeeListTableTools'
import EmployeeListSelected from './components/EmployeeListSelected'

const EmployeeList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Employees</h3>
                            <EmployeeListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <EmployeeListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <EmployeeListSelected />
        </>
    )
}

export default EmployeeList
