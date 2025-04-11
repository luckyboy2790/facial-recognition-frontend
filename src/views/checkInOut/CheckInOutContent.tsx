import { AdaptiveCard, Container } from '@/components/shared'
import Clock from './components/Clock'
import ClockButton from './components/ClockButton'
import { FaBusinessTime } from 'react-icons/fa'
import { LuAlarmClockPlus, LuAlarmClockCheck } from 'react-icons/lu'
import { useAuth } from '@/auth'
import { useEffect, useRef, useState } from 'react'
import { useSessionUser } from '@/store/authStore'
import SpaceSignBoard from '@/assets/svg/SpaceSignBoard'
import { Spinner } from '@/components/ui'
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

    const [isAccess, setIsAccess] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const hasFetched = useRef(false)

    const [settingData, setSettingData] = useState<Setting>({
        country: 'UK',
        timezone: 'Europe/Lisbon',
        timeFormat: '1',
        rfidClock: false,
        ipRestriction: '',
    })

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const fetchSettings = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(
                    `${domain}/api/setting/get_setting`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
                const data = await response.json()

                const ipRes = await fetch('https://api.ipify.org?format=json')
                const ipData = await ipRes.json()

                const ips = data.settingData?.ipRestriction || ''
                const ipList = ips
                    .split(',')
                    .map((ip: string) => ip.trim())
                    .filter(Boolean)

                const accessGranted =
                    ipList.length === 0 || ipList.includes(ipData.ip)

                setIsAccess(accessGranted)
                setSetting(data.settingData)
                setSettingData(data.settingData)
                setIsLoading(false)
            } catch (err) {
                console.error('Failed to fetch settings:', err)
                setIsAccess(false)
                setIsLoading(false)
            }
        }

        fetchSettings()
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Spinner className="mr-4" size="40px" />
                </div>
            ) : isAccess ? (
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
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <SpaceSignBoard height={300} width={300} />
                    <div className="mt-10 text-center">
                        <h3 className="mb-2">Access Denied!</h3>
                        <p className="text-base">
                            You have no permission to visit this page
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default CheckInOutContent
