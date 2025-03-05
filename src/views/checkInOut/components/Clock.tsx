import React, { useEffect, useState, useRef } from 'react'
import { Word } from './Word'
import { Number } from './Number'

interface LocationDisplayProps {
    timezone: string
}

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Clock: React.FC<LocationDisplayProps> = ({ timezone }) => {
    const startTime = new Date(Date.now()).toLocaleTimeString('en-US', {
        timeZone: timezone,
    })

    const [time, setTime] = useState<string>(startTime)
    const [day, setDay] = useState<number>(0)
    const [pm, setPm] = useState(false)
    const [timezoneAbbreviation, setTimezoneAbbreviation] = useState<string>('')

    const n = useRef<NodeJS.Timeout | null>(null)
    const t = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const timeOffset = 1000 - new Date(Date.now()).getMilliseconds()
        n.current = setTimeout(() => {
            t.current = setInterval(() => {
                const currentTime = new Date(Date.now())
                setTime(
                    currentTime.toLocaleTimeString('en-US', {
                        timeZone: timezone,
                    }),
                )

                // const timeZoneAbbreviation = new Intl.DateTimeFormat('en-US', {
                //     timeZoneName: 'longOffset',
                //     timeZone: timezone,
                // }).format(currentTime)

                const offset = currentTime.getTimezoneOffset() / 60
                const formattedOffset =
                    offset > 0 ? `UTC-${offset}` : `UTC+${-offset}`

                setTimezoneAbbreviation(formattedOffset)

                const currentDayIndex = currentTime.getDay()
                setDay(currentDayIndex)

                setPm(currentTime.getHours() >= 12)
            })
        }, timeOffset)

        return () => {
            if (n.current) clearTimeout(n.current)
            if (t.current) clearInterval(t.current)
        }
    }, [timezone])

    const [timeDig] = time.split(' ')
    const [hours, minutes, seconds] = timeDig.split(':')

    return (
        <div className="clock">
            <div className="calendar">
                {days.map((value, index) => (
                    <Word key={value} value={value} hidden={index != day} />
                ))}
            </div>
            <div className="row">
                <div className="text-3xl pb-2 max-md:text-lg">
                    <Word value={timezoneAbbreviation} hidden={false} />
                </div>
                <div className="hour">
                    <Number value={parseInt(hours, 10)} />
                    <Word value={':'} hidden={false} />
                    <Number value={parseInt(minutes, 10)} />
                    <Word value={':'} hidden={false} />
                    <Number value={parseInt(seconds, 10)} />
                </div>
                <div className="ampm">
                    <Word value={'AM'} hidden={pm} />
                    <Word value={'PM'} hidden={!pm} />
                </div>
            </div>
        </div>
    )
}

export default Clock
