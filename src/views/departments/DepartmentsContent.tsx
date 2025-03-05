import { AdaptiveCard, Container } from '@/components/shared'
import DepartmentsActionTools from './components/DepartmentsActionTools'
import AddDepartmentsSection from './components/AddDepartmentsSection'
import DepartmentsListSection from './components/DepartmentsListSection'
import DepartmentsListSelected from './components/DepartmentsListSelected'
import DepartmentsListTableTools from './components/DepartmentsListTableTools'

const CompanyContent = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Add Department</h3>
                        <DepartmentsActionTools />
                    </div>
                    <AdaptiveCard>
                        <AddDepartmentsSection />
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <DepartmentsListTableTools />
                        <DepartmentsListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <DepartmentsListSelected />
        </>
    )
}

export default CompanyContent
