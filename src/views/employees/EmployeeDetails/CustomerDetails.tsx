import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import BillingSection from './BillingSection'
import ActivitySection from './ActivitySection'
import { apiGetCustomer } from '@/services/CustomersService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Customer } from '../CustomerList/types'

const { TabNav, TabList, TabContent } = Tabs

const CustomerDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/customers', { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetCustomer<Customer, { id: string }>(params),
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
                        <ProfileSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="billing">
                            <TabList>
                                <TabNav value="billing">Billing</TabNav>
                                <TabNav value="activity">Activity</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="billing">
                                    <BillingSection data={data} />
                                </TabContent>
                                <TabContent value="activity">
                                    <ActivitySection
                                        customerName={data.name}
                                        id={id as string}
                                    />
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
