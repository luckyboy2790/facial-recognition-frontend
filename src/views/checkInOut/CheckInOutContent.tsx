import { AdaptiveCard, Container } from '@/components/shared'
import Clock from './components/Clock'
import ClockButton from './components/ClockButton'
import { FaBusinessTime } from 'react-icons/fa'
import { LuAlarmClockPlus, LuAlarmClockCheck } from 'react-icons/lu'
import { useAuth } from '@/auth'
import { useEffect, useState } from 'react'
import { useSessionUser } from '@/store/authStore'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type Setting = {
    country: string
    timezone: string
    timeFormat: string
    rfidClock: boolean
    ipRestriction: string
}

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
    const setSetting = useSessionUser((state) => state.setSetting)

    const [settingData, setSettingData] = useState<Setting>({
        country: 'UK',
        timezone: 'Europe/Lisbon',
        timeFormat: '1',
        rfidClock: false,
        ipRestriction: '',
    })

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await fetch(`${domain}/api/setting/get_setting`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()

            setSetting(data.settingData)

            setSettingData(data.settingData)
        }

        fetchSettings()
    }, [])

    return (
        <>
            <Container>
                <div className="flex flex-col gap-6">
                    <AdaptiveCard>
                        <Clock
                            timezone={
                                settingData.timezone !== ''
                                    ? settingData.timezone
                                    : 'Europe/Lisbon'
                            }
                            settingData={settingData}
                        />
                    </AdaptiveCard>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                        {btns.map((item, index) => (
                            <ClockButton
                                key={index}
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                timezone={
                                    settingData.timezone !== ''
                                        ? settingData.timezone
                                        : 'Europe/Lisbon'
                                }
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default CheckInOutContent
