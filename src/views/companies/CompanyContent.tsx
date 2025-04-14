import { AdaptiveCard, Container } from '@/components/shared'
import CompanyActionTools from './components/CompanyActionTools'
import AddCompanySection from './components/AddCompanySection'
import CompanyListTable from './components/CompanyListSection'
import CompanyListSelected from './components/CompanyListSelected'
import CompanyListTableTools from './components/CompanyListTableTools'
import useTranslation from '@/utils/hooks/useTranslation'

const CompanyContent = () => {
    const { t } = useTranslation()
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>{t('page.company.add_company', 'Add Company')}</h3>
                        <CompanyActionTools />
                    </div>
                    <AdaptiveCard>
                        <AddCompanySection />
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <CompanyListTableTools />
                        <CompanyListTable />
                    </AdaptiveCard>
                </div>
            </Container>
            <CompanyListSelected />
        </>
    )
}

export default CompanyContent
