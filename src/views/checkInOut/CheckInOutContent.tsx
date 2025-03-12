import { AdaptiveCard, Container } from '@/components/shared'
import Clock from './components/Clock'
import ClockButton from './components/ClockButton'
import { FaBusinessTime } from 'react-icons/fa'
import { LuAlarmClockPlus, LuAlarmClockCheck } from 'react-icons/lu'

const btns = [
    {
        title: 'Check In',
        description: 'Check-in for your attendance',
        icon: <FaBusinessTime />,
    },
    {
        title: 'Check Out',
        description: 'Check out for your attendance',
        icon: <FaBusinessTime />,
    },
    {
        title: 'Break In',
        description: 'Break-in for your attendance',
        icon: <LuAlarmClockPlus />,
    },
    {
        title: 'Break Out',
        description: 'Break-out for your attendance',
        icon: <LuAlarmClockCheck />,
    },
]

const CheckInOutContent = () => {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-6">
                    <AdaptiveCard>
                        <Clock timezone="America/Iqaluit" />
                    </AdaptiveCard>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                        {btns.map((item, index) => (
                            <ClockButton
                                key={index}
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                timezone="America/Iqaluit"
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default CheckInOutContent
