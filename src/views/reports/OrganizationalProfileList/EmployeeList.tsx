import { useEffect, useState } from 'react'
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
import { Employee } from '@/views/employees/EmployeeList/types'
import { apiGetTotalEmployeeList } from '@/services/employeeService'

type EmployeeListResponse = {
    employeeData: Employee[]
}

const EmployeeList = () => {
    const [isViewed, setIsViewed] = useState<boolean>(false)

    const [employeeList, setEmployeeList] = useState<Employee[]>([])

    const handleChange = (isViewed: boolean) => {
        console.log(isViewed)

        setIsViewed(!isViewed)
    }

    const [companyChartData, setCompanyChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })
    const [departmentChartData, setDepartmentChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })
    const [genderChartData, setGenderChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })
    const [civilStatusChartData, setCivilStatusChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })
    const [ageChartData, setAgeChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })
    const [hiredByYearChartData, setHiredByYearChartData] = useState({
        labels: [] as string[],
        series: [] as number[],
    })

    const groupByField = (data: Employee[], fieldPath: string) => {
        const fieldMap = new Map<string, number>()

        for (let employee of data) {
            const fieldValue: string =
                fieldPath
                    .split('.')
                    .reduce<any>((obj, key) => obj?.[key], employee) ||
                'Unknown'

            fieldMap.set(fieldValue, (fieldMap.get(fieldValue) || 0) + 1)
        }

        return {
            labels: Array.from(fieldMap.keys()),
            series: Array.from(fieldMap.values()),
        }
    }

    const groupByAgeCategory = (data: Employee[]) => {
        const ageRanges = {
            '18-24': 0,
            '25-31': 0,
            '32-38': 0,
            '39-45': 0,
            '46-100+': 0,
        }

        for (let employee of data) {
            const age = parseInt(employee.age, 10)
            if (age >= 18 && age <= 24) ageRanges['18-24']++
            else if (age >= 25 && age <= 31) ageRanges['25-31']++
            else if (age >= 32 && age <= 38) ageRanges['32-38']++
            else if (age >= 39 && age <= 45) ageRanges['39-45']++
            else ageRanges['46-100+']++
        }

        return {
            labels: Object.keys(ageRanges),
            series: Object.values(ageRanges),
        }
    }

    const groupByYear = (data: Employee[]) => {
        const yearMap = new Map<string, number>()

        for (let employee of data) {
            const year = new Date(employee.official_start_date)
                .getFullYear()
                .toString()
            yearMap.set(year, (yearMap.get(year) || 0) + 1)
        }

        return {
            labels: Array.from(yearMap.keys()),
            series: Array.from(yearMap.values()),
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employee_data: EmployeeListResponse =
                    await apiGetTotalEmployeeList()

                if (!employee_data || !employee_data.employeeData) {
                    console.error('Invalid data structure:', employee_data)
                    return
                }

                console.log(employee_data)

                const formattedCompanyData = groupByField(
                    employee_data.employeeData,
                    'company.company_name',
                )

                const formattedDepartmentData = groupByField(
                    employee_data.employeeData,
                    'department.department_name',
                )

                const formattedGenderData = groupByField(
                    employee_data.employeeData,
                    'gender',
                )

                const formattedCivilStatusData = groupByField(
                    employee_data.employeeData,
                    'civil_status',
                )

                const formattedAgeData = groupByAgeCategory(
                    employee_data.employeeData,
                )

                const formattedHireData = groupByYear(
                    employee_data.employeeData,
                )

                setCompanyChartData(formattedCompanyData)

                setDepartmentChartData(formattedDepartmentData)

                setGenderChartData(formattedGenderData)

                setCivilStatusChartData(formattedCivilStatusData)

                setAgeChartData(formattedAgeData)

                setHiredByYearChartData(formattedHireData)
            } catch (error) {
                console.error('Error fetching employee data:', error)
            }
        }

        fetchData()
    }, [])

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
                            <CompanyPopulation
                                companyChartData={companyChartData}
                            />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <DepartmentPopulation
                                departmentChartData={departmentChartData}
                            />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <GenderDemographics
                                genderChartData={genderChartData}
                            />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <AgeDemographics ageChartData={ageChartData} />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <CivilStatusDemographics
                                civilStatusChartData={civilStatusChartData}
                            />
                        </AdaptiveCard>
                        <AdaptiveCard>
                            <EmployeesHiredByYear
                                hiredByYearChartData={hiredByYearChartData}
                            />
                        </AdaptiveCard>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EmployeeList
