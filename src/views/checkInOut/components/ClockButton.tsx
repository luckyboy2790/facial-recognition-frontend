import Card from '@/components/ui/Card'
import { ReactElement } from 'react'
import { FaBusinessTime } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface BoardCardProps {
    title: String
    description: String
    icon: ReactElement
}

const ClockButton = (props: BoardCardProps) => {
    const { title, description, icon } = props
    return (
        <Card
            clickable
            className="w-full flex gap-4 justify-between rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-5 min-h-20 2xl:min-h-20 cursor-pointer"
            bodyClass="p-4 w-full flex gap-8 justify-between"
        >
            <div className="text-6xl">{icon}</div>
            <div className="grow flex flex-col justify-evenly">
                <h3>{title}</h3>
                <p className="text-md">{description}</p>
            </div>
        </Card>
    )
}

export default ClockButton
