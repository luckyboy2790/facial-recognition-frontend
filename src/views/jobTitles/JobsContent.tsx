import { AdaptiveCard, Container } from '@/components/shared'
import JobsActionTools from './components/JobsActionTools'
import AddJobsSection from './components/AddJobsSection'
import JobsListSection from './components/JobsListSection'
import CompanyListSelected from './components/JobsListSelected'
import JobsListTableTools from './components/JobsListTableTools'

const CompanyContent = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Add Job Title</h3>
                        <JobsActionTools />
                    </div>
                    <AdaptiveCard>
                        <AddJobsSection />
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <JobsListTableTools />
                        <JobsListSection />
                    </AdaptiveCard>
                </div>
            </Container>
            <CompanyListSelected />
        </>
    )
}

export default CompanyContent
