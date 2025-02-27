import { useEffect, useState } from 'react'

function useScrollTop() {
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsSticky(scrollTop > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return {
        isSticky,
    }
}

export default useScrollTop
