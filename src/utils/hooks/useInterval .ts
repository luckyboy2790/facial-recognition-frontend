import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null) => {
    const intervalRef = useRef<number | null>(null)
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay !== null) {
            const tick = () => {
                if (savedCallback.current) {
                    savedCallback.current()
                }
            }
            intervalRef.current = window.setInterval(tick, delay)
            return () => {
                if (intervalRef.current !== null) {
                    window.clearInterval(intervalRef.current)
                }
            }
        }
    }, [delay])

    return intervalRef
}

export default useInterval
