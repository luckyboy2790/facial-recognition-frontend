import { useState } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListActionTools from './components/EmployeeListActionTools'
import CompanyPopulation from './components/CompanyPopulationChart'
import DepartmentPopulation from './components/DepartmentPopulationChart'
import GenderDemographics from './components/GenderDemographicsChart'
import AgeDemographics from './components/AgeDemographicsChart'
import CivilStatusDemographics from './components/CivilStatusDemographicsChart'
import EmployeesHiredByYear from './components/EmployeesHiredByYearChart'
import classNames from 'classnames'

const EmployeeList = () => {
    const [isViewed, setIsViewed] = useState<boolean>(false)

    const handleChange = (isViewed: boolean) => {
        console.log(isViewed)

        setIsViewed(!isViewed)
    }

    return (
        <>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Organizational Profile</h3>
                        <EmployeeListActionTools
                            isViewed={isViewed}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        className={classNames(
                            isViewed === true
                                ? 'grid grid-cols-1 gap-5'
                                : 'grid grid-cols-1 gap-5 xl:grid-cols-2',
                        )}
                    >
                        <AdaptiveCard>
                            <CompanyPopulation />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <DepartmentPopulation />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <GenderDemographics />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <AgeDemographics />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <CivilStatusDemographics />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <EmployeesHiredByYear />
                        </AdaptiveCard>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EmployeeList
