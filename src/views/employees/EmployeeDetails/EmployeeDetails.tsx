import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import BillingSection from './PersonalDataSection'
import { apiGetCustomer } from '@/services/employeeService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Employee } from '../EmployeeList/types'
import DesignationSection from './DesignationSection'

const { TabNav, TabList, TabContent } = Tabs

type ProfileSectionProps = {
    data: Employee
}

const CustomerDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/customers', { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCustomer<ProfileSectionProps, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data.data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="personal">
                            <TabList>
                                <TabNav value="personal">
                                    Personal Information
                                </TabNav>
                                <TabNav value="designation">Designation</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="personal">
                                    <BillingSection data={data.data} />
                                </TabContent>
                                <TabContent value="designation">
                                    <DesignationSection data={data.data} />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default CustomerDetails
