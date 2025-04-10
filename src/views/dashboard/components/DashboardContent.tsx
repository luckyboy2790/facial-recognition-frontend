import React, { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { FaRegUserCircle, FaRegClock, FaHome } from 'react-icons/fa'
import EmployeeList from './EmployeeList'
import { useToken } from '@/store/authStore'
import useTranslation from '@/utils/hooks/useTranslation'

const domain = import.meta.env.VITE_BACKEND_ENDPOINT

interface tabData {
    id: number
    tabTitle: string
    label1: string
    value1: number
    label2: string
    value2: number
    icon: React.ReactNode
}

const DashboardContent = () => {
    const { t } = useTranslation()

    const [tabList, setTabList] = useState<tabData[]>([
        {
            id: 1,
            tabTitle: t('page.dashboard.employees', 'employees'),
            label1: t('page.dashboard.regular', 'Regular'),
            value1: 0,
            label2: t('page.dashboard.trainee', 'Trainee'),
            value2: 0,
            icon: <FaRegUserCircle />,
        },
        {
            id: 2,
            tabTitle: t('page.dashboard.attendances', 'attendances'),
            label1: t('page.dashboard.online', 'online'),
            value1: 0,
            label2: t('page.dashboard.offline', 'offline'),
            value2: 0,
            icon: <FaRegClock />,
        },
        {
            id: 3,
            tabTitle: t('page.dashboard.leaves_of_absence', 'leave of absence'),
            label1: t('page.dashboard.approved', 'Approved'),
            value1: 0,
            label2: t('page.dashboard.pending', 'Pending'),
            value2: 0,
            icon: <FaHome />,
        },
    ])

    const { token } = useToken()

    useEffect(() => {
        const fetchData = async () => {
            const repsonse = await fetch(
                `${domain}/api/dashboard/admin/get_card_data`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                },
            )

            const result = await repsonse.json()

            setTabList([
                {
                    id: 1,
                    tabTitle: t('page.dashboard.employees', 'employees'),
                    label1: t('page.dashboard.regular', 'Regular'),
                    value1: result.regularEmployee,
                    label2: t('page.dashboard.trainee', 'Trainee'),
                    value2: result.traineeEmployee,
                    icon: <FaRegUserCircle />,
                },
                {
                    id: 2,
                    tabTitle: t('page.dashboard.attendances', 'attendances'),
                    label1: t('page.dashboard.online', 'online'),
                    value1: result.onlineCount,
                    label2: t('page.dashboard.offline', 'offline'),
                    value2: result.offlineCount,
                    icon: <FaRegClock />,
                },
                {
                    id: 3,
                    tabTitle: t(
                        'page.dashboard.leaves_of_absence',
                        'leave of absence',
                    ),
                    label1: t('page.dashboard.approved', 'Approved'),
                    value1: result.approveCount,
                    label2: t('page.dashboard.pending', 'Pending'),
                    value2: result.pendingCount,
                    icon: <FaHome />,
                },
            ])
        }

        fetchData()
    }, [t])
    return (
        <div>
            <div className="mt-8">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tabList.map((tab) => (
                        <Card key={tab.id} bodyClass="h-full flex gap-8">
                            <div className="flex justify-center items-center text-7xl">
                                {tab.icon}
                            </div>
                            <div className="flex flex-col justify-between h-full grow">
                                <div className="flex justify-between items-center">
                                    <h6 className="font-bold hover:text-primary">
                                        {tab.tabTitle}
                                    </h6>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mt-4">{tab.label1}</p>
                                    <p className="mt-4">{tab.value1}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mt-4">{tab.label2}</p>
                                    <p className="mt-4">{tab.value2}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <EmployeeList />
            </div>
        </div>
    )
}

export default DashboardContent
