import React, { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { FaRegUserCircle, FaRegClock, FaHome } from 'react-icons/fa'
import EmployeeList from './EmployeeList'
import { useToken } from '@/store/authStore'

const domain = import.meta.env.VITE_BACKEND_ENDPOINT

interface tabData {
    id: number
    tabTitle: string
    label1: string
    value1: number | string
    label2: string
    value2: number | string
    icon: React.ReactNode
}

const DashboardContent = () => {
    const [tabList, setTabList] = useState<tabData[]>([
        {
            id: 1,
            tabTitle: 'Attendance (Current Month)',
            label1: 'Late Arrivals',
            value1: 0,
            label2: 'Early Departures',
            value2: 0,
            icon: <FaRegClock />,
        },
        {
            id: 2,
            tabTitle: 'Present Schedule',
            label1: 'Time',
            value1: '',
            label2: 'Rest Days',
            value2: '',
            icon: <FaRegUserCircle />,
        },
        {
            id: 3,
            tabTitle: 'leaves of absence',
            label1: 'Approved',
            value1: 0,
            label2: 'Pending',
            value2: 0,
            icon: <FaHome />,
        },
    ])

    const { token } = useToken()

    const changeTimeFormat = (time: string): string => {
        const currentDate = new Date()

        const currentYear = currentDate.getFullYear()

        const date = new Date(`${currentYear}-01-01T${time}`)

        if (isNaN(date.getTime())) {
            return 'Invalid Time'
        }

        let hours = date.getUTCHours()
        let minutes = date.getUTCMinutes()

        const period = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`

        return `${hours}:${minutesString} ${period}`
    }

    useEffect(() => {
        const fetchData = async () => {
            const repsonse = await fetch(
                `${domain}/api/dashboard/personal/get_card_data`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                },
            )

            const result = await repsonse.json()

            console.log(result)

            setTabList([
                {
                    id: 1,
                    tabTitle: 'Attendance (Current Month)',
                    label1: 'Late Arrivals',
                    value1: result.lateArrivals,
                    label2: 'Early Departures',
                    value2: result.earlyDepartures,
                    icon: <FaRegClock />,
                },
                {
                    id: 2,
                    tabTitle: 'Present Schedule',
                    label1: 'Time',
                    value1: `${changeTimeFormat(result.recentSchedule.start_time)} - ${changeTimeFormat(result.recentSchedule.off_time)}`,
                    label2: 'Rest Days	',
                    value2: result.recentSchedule.rest_days.map(
                        (item: string) => <span>{`${item}, `}</span>,
                    ),
                    icon: <FaRegUserCircle />,
                },
                {
                    id: 3,
                    tabTitle: 'leaves of absence',
                    label1: 'Approved',
                    value1: result.approvedLeave,
                    label2: 'Pending',
                    value2: result.pendingLeave,
                    icon: <FaHome />,
                },
            ])
        }

        fetchData()
    }, [])
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
