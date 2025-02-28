import React from 'react'
import Card from '@/components/ui/Card'
import { FaRegUserCircle, FaRegClock, FaHome } from 'react-icons/fa'
import EmployeeList from './EmployeeList'

interface tabData {
    id: number
    tabTitle: string
    label1: string
    value1: number
    label2: string
    value2: number
    icon: React.ReactNode
}

const tabList: tabData[] = [
    {
        id: 1,
        tabTitle: 'employees',
        label1: 'Regular',
        value1: 7,
        label2: 'Trainee',
        value2: 2,
        icon: <FaRegUserCircle />,
    },
    {
        id: 2,
        tabTitle: 'attendances',
        label1: 'Online',
        value1: 0,
        label2: 'Offline',
        value2: 21,
        icon: <FaRegClock />,
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
]

const DashboardContent = () => {
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
